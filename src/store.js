/* eslint-disable import/no-extraneous-dependencies */
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import authReducer from './redux-toolkit/slices/authSlice';
// import usersReducer from './redux-toolkit/slices/usersSlice';
// import restaurantReducer from './redux-toolkit/slices/restaurant';
// import menuReducer from './redux-toolkit/slices/menu';
// import cartReducer from './redux-toolkit/slices/cart';

// const reducer = combineReducers({
//   authState: authReducer,
//   usersState: usersReducer,
//   restaurantState: restaurantReducer,
//   menuState: menuReducer,
//   cartState: cartReducer
// });

// const store = configureStore({
//   reducer,
//   middleware: [thunk]
// });

// export default store;
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './redux-toolkit/slices/authSlice';
import usersReducer from './redux-toolkit/slices/usersSlice';
import restaurantReducer from './redux-toolkit/slices/restaurant';
import menuReducer from './redux-toolkit/slices/menu';
import cartReducer from './redux-toolkit/slices/cartSlice';

const rootReducer = combineReducers({
  authState: authReducer,
  usersState: usersReducer,
  restaurantState: restaurantReducer,
  menuState: menuReducer,
  cartState: cartReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

export { store };
