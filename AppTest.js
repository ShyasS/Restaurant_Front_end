/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import OrdersHistory from 'pages/admin/OrderHistory';
import UsersList from 'pages/admin/UserList';
import RestaurantTable from 'pages/admin/Restaurant';
import Offers from 'pages/user/Offers';
import UpdateMenu from 'pages/admin/UpdateMenu';
import UpdateRestaurant from 'pages/admin/UpdateRestaurant';
import MenuList from 'pages/admin/MenuList';
import Payment from './pages/payment/Payment';
import Footer from './layout/Footer';
import Header from './layout/Header';
import HomePage from './pages/home/home';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/auth/register';
import LoginPage from './pages/auth/login/login';
import SendLoginOtp from './pages/auth/login/SendLoginOtp';
import LoginWithOtp from './pages/auth/login/loginWithOtp';
// import ProtectedRoute from './routes/protectedRoute';
import DashboardPage from './pages/admin/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MenuDetails from './pages/menu/menuDetails';
import Restaurant from './pages/menu/restaurant';
import Menus from './pages/menu/menus';
import ResetPassword from './pages/auth/resetPassword/resetPassword';
import ForgotPasswordPage from './pages/auth/forgotPassword';
import Cart from './pages/order/cart';
import ConfirmOrder from './pages/order/ConfirmOrder';
import OrderSuccess from './pages/order/OrderSuccess';
import OrderDetails from './pages/order/OrderDetails';
import DeliveryInfo from './pages/order/DeliveryInfo';
import Reviews from './pages/menu/Reviews';
import OrderStatus from './pages/admin/OrderStatus';
import OrdersTable from './pages/admin/ActiveOrderList';
import CreateMenu from './pages/menu/CreateMenu';
import Profile from './pages/user/Profile';
import UserOrderList from './pages/order/UserOrderList';
import ShippingInfo from './pages/order/ShippingInfo';
import { useEffect, useState } from 'react';
import { store } from './store';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { loadUser } from 'redux-toolkit/actions/auth';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    store.dispatch(loadUser);
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container container-fluid">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductDetail />} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/otp" element={<SendLoginOtp />} />
              <Route path="/loginWithOtp" element={<LoginWithOtp />} />
              <Route path="/menuDetails/:id" element={<MenuDetails />} />
              <Route path="/restaurants" element={<Restaurant />} />
              <Route path="/register" element={<Register />} />
              <Route path="/menus" element={<Menus />} />
              <Route path="/password/forgot" element={<ForgotPasswordPage />} />
              <Route path="/cart" element={<Cart />} />
              {stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  }
                />
              )}
              <Route path="/offers" element={<Offers />} />
              <Route path="/userOrderList" element={<UserOrderList />} />
              <Route path="/shippingInfo" element={<ShippingInfo />} />
              <Route
                path="/api/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/order/confirm"
                element={
                  // <ProtectedRoute>
                  <ConfirmOrder />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/order/success"
                element={
                  // <ProtectedRoute>
                  <OrderSuccess />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/order"
                element={
                  // <ProtectedRoute>
                  <OrderDetails />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/deliveryAddress"
                element={
                  // <ProtectedRoute>
                  <DeliveryInfo />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/reviews"
                element={
                  // <ProtectedRoute isAdmin>
                  <Reviews />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/myProfile"
                element={
                  // <ProtectedRoute>
                  <Profile />
                  // </ProtectedRoute>
                }
              />
              {/* 
              <Route
                path="/myprofile/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myprofile/update/password"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />
                       
             
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />
              {stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  }
                /> 
              )} */}
            </Routes>
          </div>
          {/* Admin Routes */}
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                // <ProtectedRoute isAdmin>
                <DashboardPage />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orderHistory"
              element={
                // <ProtectedRoute isAdmin>
                <OrdersHistory />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                // <ProtectedRoute isAdmin>
                <OrdersTable />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/order"
              element={
                // <ProtectedRoute isAdmin>
                <OrderStatus />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/updateMenu"
              element={
                // <ProtectedRoute isAdmin>
                <UpdateMenu />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/updateRestaurant"
              element={
                // <ProtectedRoute>
                <UpdateRestaurant />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                // <ProtectedRoute isAdmin>
                <UsersList />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/menus"
              element={
                // <ProtectedRoute isAdmin>
                <MenuList />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/createMenu"
              element={
                // <ProtectedRoute isAdmin>
                <CreateMenu />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/restaurants"
              element={
                // <ProtectedRoute isAdmin>
                <RestaurantTable />
                // </ProtectedRoute>
              }
            />{' '}
            {/* 
            <Route
              path="/admin/products/create"
              element={
                <ProtectedRoute isAdmin>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/product/:id"
              element={
                <ProtectedRoute isAdmin>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute isAdmin>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/order/:id"
              element={
                <ProtectedRoute isAdmin>
                  <UpdateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute isAdmin>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute isAdmin>
                  <ReviewList />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
