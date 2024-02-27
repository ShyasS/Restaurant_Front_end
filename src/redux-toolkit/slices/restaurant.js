import { createSlice } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    data: [], // Ensure data is initialized as an empty array
    loading: false,
    error: null
  },
  reducers: {
    getRestaurantsRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    getRestaurantsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    },
    getRestaurantsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
  }
});
const { actions, reducer } = restaurantSlice;
export const {
  getRestaurantsRequest,
  getRestaurantsSuccess,
  getRestaurantsFail
} = actions;
export default reducer;
