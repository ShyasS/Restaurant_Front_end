/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    loading: false,
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {}
  },
  reducers: {
    addCartItemRequest(state, action) {
      state.loading = true;
    },
    addCartItemSuccess(state, action) {
      const item = action.payload;

      const isItemExist = state.items.find((i) => i.product === item.product);

      if (isItemExist) {
        state.loading = false;
      } else {
        state.items.push(item);
        state.loading = false;

        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    increaseCartItemQty(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity += 1;
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    decreaseCartItemQty(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity -= 1;
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      const filterItems = state.items.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem('cartItems', JSON.stringify(filterItems));
      state.items = filterItems;
    },
    saveShippingInfo(state, action) {
      localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
      state.shippingInfo = action.payload;
    },
    orderCompleted(state, action) {
      localStorage.removeItem('shippingInfo');
      localStorage.removeItem('cartItems');
      sessionStorage.removeItem('orderInfo');
      state.items = [];
      state.loading = false;
      state.shippingInfo = {};
    }
  }
});

const { actions, reducer } = cartSlice;

export const {
  addCartItemRequest,
  addCartItemSuccess,
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
  saveShippingInfo,
  orderCompleted
} = actions;

export default reducer;
