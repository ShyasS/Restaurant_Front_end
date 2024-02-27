/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { addCartItemRequest, addCartItemSuccess } from '../slices/cartSlice';

export const addCartItem = (id, quantity) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch(
      addCartItemSuccess({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        quantity
      })
    );
  } catch (error) {
    console.log(error);
  }
};
