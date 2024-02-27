/* eslint-disable import/named */
// /* eslint-disable import/no-extraneous-dependencies */
// import axios from 'axios';
// import {
//   addToCartRequest,
//   addToCartSuccess,
//   addToCartFail
//   // setUser
// } from '../slices/cart';

// export const addToCart = (userToken, data) => async (dispatch) => {
//   // userToken, data
//   try {
//     dispatch(addToCartRequest());
//     const response = await axios.post(
//       `http://localhost:8000/api/item/new`,
//       data,
//       { withCredentials: true }
//     );
//     // dispatch(setUser(userToken));
//     dispatch(addToCartSuccess(response.data));
//     console.log(response.data);
//   } catch (error) {
//     dispatch(addToCartFail(error.response));
//   }
// };
import axios from 'axios';
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFail,
  updateCartItem,
  updateCartItemFail,
  getCartItemsRequest,
  getCartItemsFail,
  getCartItemsSuccess
  // setUser
} from '../slices/cart';

export const addToCart = (userToken, itemId, price) => async (dispatch) => {
  try {
    dispatch(addToCartRequest());
    const response = await axios.post(
      `http://localhost:8000/api/cart/create/${itemId}`,
      { price },
      { withCredentials: true }
    );
    // dispatch(setUser(userToken));
    dispatch(addToCartSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(addToCartFail(error.response));
  }
};

export const updateCart = (id, itemId, itemQuantity) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/item/edit/${id}`,
      { itemId, itemQuantity },
      { withCredentials: true }
    );
    dispatch(updateCartItem(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(updateCartItemFail(error.response));
  }
};
export const getCart = (cartId) => async (dispatch) => {
  try {
    dispatch(getCartItemsRequest());
    const response = await axios.get(
      `http://localhost:8000/api/item/${cartId}`,
      {
        withCredentials: true
      }
    );
    // dispatch(setUser(userToken));
    dispatch(getCartItemsSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(getCartItemsFail(error.response));
  }
};
