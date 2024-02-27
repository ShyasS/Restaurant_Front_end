import axios from 'axios';
import { usersFail, usersRequest, usersSuccess } from '../slices/usersSlice';

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(usersRequest());
    const { data } = await axios.get(
      // `https://jsonplaceholder.typicode.com/users`
      'https://dummyjson.com/users'
    );
    dispatch(usersSuccess(data.users));
  } catch (error) {
    dispatch(usersFail(error.response.data.message));
  }
};
