import axios from 'axios';
import {
  loginFail,
  loginRequest,
  loginSuccess,
  registerRequest,
  registerSuccess,
  registerFail,
  clearError,
  sendLoginOtpRequest,
  sendLoginOtpSuccess,
  sendLoginOtpFail,
  loginWithOtpRequest,
  loginWithOtpSuccess,
  loginWithOtpFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  logoutSuccess,
  logoutFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail
} from '../slices/authSlice';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post(`http://localhost:8000/api/login`, {
      email,
      password
    });
    // console.log(response); // Log the entire response object for debugging purposes
    dispatch(loginSuccess(response.data));
    window.localStorage.setItem('user', JSON.stringify(response.data.user));
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
    window.localStorage.setItem('isloggedIn', true);
    window.sessionStorage.setItem('isloggedIn', true);
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    };

    const { data } = await axios.post(`/api/register`, userData, config);
    dispatch(registerSuccess(data));
    window.localStorage.setItem('user', data);
    window.localStorage.setItem('isloggedIn', true);
    window.sessionStorage.setItem('user', data);
    window.sessionStorage.setItem('isloggedIn', true);
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};
export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};
export const sendLoginOtp = (email) => async (dispatch) => {
  try {
    dispatch(sendLoginOtpRequest());
    const data = await axios.post(`http://localhost:8000/api/login/otp`, {
      email
    });
    console.log(login);
    dispatch(sendLoginOtpSuccess(data));
  } catch (error) {
    dispatch(sendLoginOtpFail(error.response.data.message));
  }
};

export const loginOtp = (email, otp) => async (dispatch) => {
  try {
    dispatch(loginWithOtpRequest());
    const data = await axios.post(`http://localhost:8000/api/login`, {
      otp,
      email
    });
    console.log(loginOtp);
    dispatch(loginWithOtpSuccess(data.data.user));
  } catch (error) {
    dispatch(loginWithOtpFail(error.response.data.message));
  }
};

export const resetPassword = (formData, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    const { data } = await axios.put(
      `http://localhost:8000/api/password/reset/${token}`,
      formData,
      config
    );
    dispatch(resetPasswordSuccess(data.data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    const { data } = await axios.post(
      `http://localhost:8000/api/password/forgot`,
      formData,
      config
    );
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

export const logout = async (dispatch) => {
  try {
    await axios.post(`http://localhost:8000/api/logout`);
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error));
  }
};
export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`/api/myprofile`);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};
