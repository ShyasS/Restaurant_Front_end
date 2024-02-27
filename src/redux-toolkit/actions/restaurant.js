// restaurantActions.js
import axios from 'axios';
import {
  getRestaurantsRequest,
  getRestaurantsSuccess,
  getRestaurantsFail
} from '../slices/restaurant.js';

export const fetchRestaurants = () => async (dispatch) => {
  try {
    dispatch(getRestaurantsRequest());
    const response = await axios.get(
      `http://localhost:8000/api/restaurant/get`
    );
    console.log(response);
    dispatch(getRestaurantsSuccess(response));
  } catch (error) {
    dispatch(getRestaurantsFail(error.response.data.message));
  }
};
