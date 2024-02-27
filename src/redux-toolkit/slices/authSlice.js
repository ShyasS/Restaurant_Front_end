import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isAuthenticated: false,
    error: null,
    user: null,
    role: null
  },
  reducers: {
    loginRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    loginSuccess(state, action) {
      const { user, token } = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      document.cookie = `token=${token}; path=/;`;
      window.localStorage.setItem('isloggedIn', true);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user,
        role: user.role
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    registerRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    registerSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user
      };
    },
    registerFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    clearError(state) {
      return {
        ...state,
        error: null
      };
    },
    sendLoginOtpRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    sendLoginOtpSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload,
        email: action.payload
      };
    },
    sendLoginOtpFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    loginWithOtpRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    loginWithOtpSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        email: action.payload
      };
    },
    loginWithOtpFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    resetPasswordRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    resetPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };
    },
    resetPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    forgotPasswordRequest(state) {
      return {
        ...state,
        loading: true,
        message: null
      };
    },
    forgotPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    },
    forgotPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    logoutSuccess(state) {
      window.localStorage.setItem('isloggedIn', false);
      function deleteCookie(name) {
        const expires = 'Thu, 01 Jan 1970 00:00:00 UTC';
        document.cookie = `${name}=; expires=${expires}; path=/;`;
      }
      deleteCookie('token');
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    },
    logoutFail(state, action) {
      return {
        ...state,
        error: action.payload
      };
    },
    loadUserRequest(state) {
      return {
        ...state,
        isAuthenticated: false,
        loading: true
      };
    },
    loadUserSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user
      };
    },
    loadUserFail(state) {
      return {
        ...state,
        loading: false
      };
    }
  }
});

const { actions, reducer } = authSlice;
export const {
  loginRequest,
  loginSuccess,
  loginFail,
  registerRequest,
  registerSuccess,
  registerFail,
  clearError,
  logoutSuccess,
  logoutFail,
  forgotPasswordFail,
  forgotPasswordSuccess,
  forgotPasswordRequest,
  sendLoginOtpRequest,
  sendLoginOtpSuccess,
  sendLoginOtpFail,
  loginWithOtpRequest,
  loginWithOtpSuccess,
  loginWithOtpFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  loadUserRequest,
  loadUserFail,
  loadUserSuccess
} = actions;
export default reducer;
