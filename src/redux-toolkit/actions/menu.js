/* eslint-disable import/named */
import axios from 'axios';
import {
  menuRequest,
  menuSuccess,
  menuFail,
  productsFail,
  productsSuccess,
  productsRequest
} from '../slices/menu';

export const getmenu = () => async (dispatch) => {
  try {
    dispatch(menuRequest());
    const { data } = await axios.get(`http://localhost:8000/api/product`);
    dispatch(menuSuccess(data));
  } catch (error) {
    dispatch(menuFail(error.response.menu.message));
  }
};
export const getProducts =
  (keyword, dietaryPreferenceCategory, mealTypeCategory, currentPage) =>
  async (dispatch) => {
    try {
      dispatch(productsRequest());
      let link = `/api/products?page=${currentPage}`;

      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (mealTypeCategory) {
        link += `&mealTypeCategory=${mealTypeCategory}`;
      }
      if (dietaryPreferenceCategory) {
        link += `&dietaryPreferenceCategory=${dietaryPreferenceCategory}`;
      }
      const { data } = await axios.get(link);
      dispatch(productsSuccess(data));
    } catch (error) {
      // handle error
      dispatch(productsFail(error.response.data.message));
    }
  };
