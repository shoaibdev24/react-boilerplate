import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPost } from "../../api/apiWrapper";
// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiPost("/users/signin", {
        ...credentials,
        grant_type: "password",
        access_token: "string",
      });
      console.log("RESPONSE:", response);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error || "Login failed");
    }
  }
);
// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (refreshToken, { rejectWithValue }) => {
    try {
      console.log("REFRESH TOKEN THUNK:", refreshToken);
      const logoutResult = await apiPost("/users/logout", {
        refresh_token: refreshToken,
      });
      console.log("LOGOUT RESULT:", logoutResult);
      return logoutResult;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error?.data?.message || "Logout failed");
    }
  }
);
// Async thunk for refreshing token
export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const refreshTokenResult = await apiPost("/users/refresh-token", {
        refresh_token: refreshToken,
      });
      console.log("REFRESH TOKEN RESULT:", refreshTokenResult);
      return refreshTokenResult;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error?.data?.message || "Token refresh failed");
    }
  }
);
export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiPost("/users/signup", {
        ...userData,
      });
      return response; // Return the response data to be handled in extraReducers
    } catch (error) {
      return rejectWithValue(error || "Signup failed");
    } 
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await apiPost("/auth/forgot-password", { email });
      return response; // Return the response data to be handled in extraReducers
    } catch (error) {
      console.error("Forgot Password API Error:", error);
      return rejectWithValue(error?.data?.message || "Forgot password failed");
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await apiPost("/auth/reset-password", passwordData);
      return response; // Return the response data to be handled in extraReducers
    } catch (error) {
      console.error("Reset Password API Error:", error);
      return rejectWithValue(error?.data?.message || "Reset password failed");
    }
  }
);

export const resetPasswordValidateToken = createAsyncThunk(
  "/auth/validate-reset-password",
  async (token, { rejectWithValue }) => {
    try {
      const response = await apiPost("/auth/validate-reset-password", {token:token});
      return response; // Return the response data to be handled in extraReducers
    } catch (error) {
      console.error("Reset Password API Error:", error);
      return rejectWithValue(error?.data?.message || "Reset password failed");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {}, // User information
    auth: {}, // Access and refresh tokens
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateProfileCompleted: (state, action) => {
      state.user.profile_completed = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.auth = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.auth = action.payload.data.auth;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Handle refresh token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.auth.access_token = action.payload.data.access_token;
        state.auth.refresh_token = action.payload.data.refresh_token;
        state.loading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Handle logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {};
        state.auth = {};
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = {};
        state.auth = {};
        state.loading = false;
        state.error = null;
      });
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Handle reset password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = {};
        state.auth = {};
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { updateProfileCompleted, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;
