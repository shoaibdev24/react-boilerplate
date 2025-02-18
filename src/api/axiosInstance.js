import axios from "axios";
import { refreshToken } from "../redux/slices/userSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false; // Flag to track if the refresh token request is in progress
let refreshSubscribers = []; // Queue to hold requests waiting for a new token

// Function to notify all waiting subscribers when the token is refreshed
export const onRrefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

// Function to add subscribers to the queue
export const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

export const setupAxiosInterceptors = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const accessToken = state?.user?.auth?.access_token;
      // console.log("INTERVEPTOR ACCESS TOKEN :", accessToken);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    async (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config;
      const state = store.getState();
      const refreshTokenValue = state.user?.auth?.refresh_token;
      if (error.response?.status === 401 && originalRequest.url.includes('refresh-token')) {
        console.log("REFRESH TOKEN API CALL FAILED WITH 401 STATUS - LOGGING OUT");
        store.dispatch({ type: "user/logout" });
        return Promise.reject(error);
      }
      if (error.response?.status === 401 && !originalRequest._retry) {
        
        if (window.location.pathname.includes('login')) {
          return Promise.reject(error);
        }
        console.log("CALLING REFRESH TOKEN API");
        
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            // Dispatch the refreshToken thunk
            if (refreshTokenValue) {
              const resultAction = await store.dispatch(refreshToken(refreshTokenValue));

              if (refreshToken.fulfilled.match(resultAction)) {
                const newAccessToken = resultAction.payload.data.access_token;

                // Update all subscribers with the new token
                onRrefreshed(newAccessToken);

                isRefreshing = false;

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
              } else {
                throw resultAction.payload || "Token refresh failed";
              }
            }
          } catch (refreshError) {
            console.error("Token refresh error:", refreshError);

            // Notify subscribers of the failure
            onRrefreshed(null);
            isRefreshing = false;

            store.dispatch({ type: "user/logout" });
            return Promise.reject(refreshError);
          }
        } else {
          // Add the current request to the queue and wait for the refresh to complete
          return new Promise((resolve, reject) => {
            addRefreshSubscriber((newAccessToken) => {
              if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                resolve(axiosInstance(originalRequest));
              } else {
                reject("Token refresh failed");
              }
            });
          });
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
