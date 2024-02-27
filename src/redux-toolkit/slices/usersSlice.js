import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    users: []
  },
  reducers: {
    usersRequest() {
      return {
        loading: true
      };
    },
    usersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        users: action.payload
        // usersCount: action.payload.count,
        // resPerPage: action.payload.resPerPage
      };
    },
    usersFail(state, action) {
      return {
        loading: false,
        error: action.payload
      };
    }
  }
});

const { actions, reducer } = usersSlice;

export const { usersRequest, usersSuccess, usersFail } = actions;

export default reducer;
