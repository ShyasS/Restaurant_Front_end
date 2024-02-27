/* eslint-disable no-undef */
/* eslint-disable no-var */
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    authentication: true,
    loading: false,
    cart: [],
    user: {}
  },
  reducers: {
    addToCartRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    setUser(state, action) {
      return {
        ...state,
        user: action.payload
      };
    },
    addToCartSuccess(state, action) {
      return {
        ...state,
        authentication: true,
        loading: false,
        cart: action.payload
      };
    },
    addToCartFail(state, action) {
      return {
        loading: false,
        error: action.payload
      };
    },
    getCartItemsRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    getCartItemsSuccess(state, action) {
      return {
        ...state,
        authentication: true,
        loading: false,
        cart: action.payload
      };
    },
    getCartItemsFail(state, action) {
      return {
        loading: false,
        error: action.payload
      };
    },
    updateCartItem(state, action) {
      const updatedCart = action.payload.cartItems.item;

      // Assuming the structure of updatedCart is like { cartItems: [...] }
      // const { cartItems } = updatedCart;
      console.log(updatedCart);

      // Implement basic logic for increase and decrease here
      const updatedCartItems = cartItems.map((cartItem) => {
        const updatedItems = cartItem.items.map((item) => {
          // Example: Increase quantity by 1
          const updatedQuantity = item.itemQuantity + 1;

          return {
            ...item,
            itemQuantity: updatedQuantity
          };
        });

        return {
          ...cartItem,
          items: updatedItems
        };
      });

      return {
        ...state,
        authentication: true,
        loading: false,
        cart: {
          cartItems: updatedCartItems
        }
      };
    },

    updateCartItemFail(state, action) {
      return {
        loading: false,
        error: action.payload
      };
    }
  }
});

const { actions, reducer } = cartSlice;

export const {
  addToCartRequest,
  addToCartSuccess,
  addToCartFail,
  setUser,
  updateCartItem,
  updateCartItemFail,
  getCartItemsRequest,
  getCartItemsFail,
  getCartItemsSuccess
} = actions;

export default reducer;
// export var selectCart = (state) => state.cartState.cart;
