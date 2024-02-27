import { axiosInstance } from './utilities';
import { EXIST_LOCAL_STORAGE } from './constants';

// eslint-disable-next-line consistent-return
const getMicroServiceURL = (baseURL) => {
  switch (baseURL) {
    case 'normal':
      return 'https://api/login';
    default:
      break;
  }
};

export const apiServiceURL = (baseURL = 'normal') => {
  return getMicroServiceURL(baseURL);
};

const statusHelper = (status, data) => {
  if (status) {
    return {
      status: data.status,
      ...data.data
    };
  }
  return data?.data ? data?.data : data;
};

export const api = async (payload) => {
  const {
    method = 'get',
    // eslint-disable-next-line no-shadow
    api,
    isFormData = false,
    prefixUrl,
    body,
    status = false,
    // eslint-disable-next-line no-unused-vars
    token = '',
    baseURL = 'normal',
    // eslint-disable-next-line no-unused-vars
    email = ''
  } = payload;
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common.Authorization =
      localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN) || '';

    axiosInstance.defaults.headers['Content-Type'] = isFormData
      ? 'multipart/form-data'
      : 'application/json';

    const url = getMicroServiceURL(baseURL) + api + (prefixUrl || '');

    axiosInstance[method](url, body || '')
      .then((response) => {
        resolve(statusHelper(status, response));
      })
      .catch((error) => {
        console.log('error------------>', error);

        try {
          if (error.response) {
            reject(statusHelper(status, error.response));
          } else {
            reject(error);
          }
        } catch (err) {
          console.log('error------------>', err);
          reject(err);
        }
      });
  });
};
