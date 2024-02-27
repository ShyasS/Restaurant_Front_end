import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    loading: false
  },
  reducers: {
    productsRequest() {
      return {
        loading: true
      };
    },
    productsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.Menus,
        productsCount: action.payload.Count,
        resPerPage: action.payload.resPerPage
      };
    },
    productsFail(state, action) {
      return {
        loading: false,
        error: action.payload
      };
    },
    menuRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    menuSuccess(state, action) {
      return {
        ...state,
        loading: false,
        menu: action.payload.menu
      };
    },
    menuFail(state, action) {
      return {
        loading: false,
        error: action.payload
      };
    }
  }
});

const { actions, reducer } = menuSlice;

export const {
  menuRequest,
  menuSuccess,
  menuFail,
  productsRequest,
  productsSuccess,
  productsFail
} = actions;

export default reducer;
