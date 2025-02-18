import axiosInstance from './axiosInstance'; // Assuming axiosInstance is set up with base URL

// General API wrapper for GET requests
export const apiGet = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || error.message; // If error occurs, throw it
  }
};

// General API wrapper for POST requests
export const apiPost = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response; // If error occurs, throw it
  }
};

// General API wrapper for PUT requests
export const apiPut = async (url, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || error.message; // If error occurs, throw it
  }
};

// General API wrapper for DELETE requests
export const apiDelete = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || error.message; // If error occurs, throw it
  }
};
