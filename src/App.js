/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
// import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import OrdersHistory from 'pages/admin/OrderHistory';
import UsersList from 'pages/admin/UserList';
import RestaurantTable from 'pages/admin/Restaurant';
// import UpdateMenu from 'pages/admin/UpdateMenu';
import UpdateMenu from 'pages/admin/UpdateSingleMenu';
import MenuList from 'pages/admin/MenuList';
import Payment from './pages/payment/Payment';
import Footer from './layout/Footer';
import Header from './layout/Header';
import HomePage from './pages/home/home';
import 'react-toastify/dist/ReactToastify.css';
// import Register from './pages/auth/register';
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
import ConfirmOrder from './pages/order/ConfirmOrder';
import OrderSuccess from './pages/order/OrderSuccess';
import OrderDetails from './pages/order/OrderDetails';
import DeliveryInfo from './pages/order/DeliveryInfo';
import Reviews from './pages/menu/Reviews';
import OrderStatus from './pages/admin/OrderStatus';
import OrdersTable from './pages/admin/ActiveOrderList';
import OrdersTablePickup from './pages/admin/ActiveOrderListPickup';
import OrdersTableDelivery from './pages/admin/ActiveOrderListDelivery';
import CreateMenu from './pages/menu/CreateMenu';
import Profile from './pages/user/Profile';
import UserOrderList from './pages/order/UserOrderList';
// import ShippingInfo from './pages/order/ShippingInfo';
import SignUpForm from './pages/auth/register/Signup';
import { useEffect, useState, useRef  } from 'react';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import HomeDraft from 'pages/home/draft/home1';
import CreateRestaurant from 'pages/admin/CreateRestaurant';
import EditRestaurant from 'pages/admin/UpdateRestaurant';
import CreateAdmin from 'pages/admin/CreateAdmin';
import ProductSearch from 'pages/menu/MenuSearch'; 
import CarouselForm from 'pages/admin/carousal/CreateCarousal';
import CarousalTable from 'pages/admin/carousal/ListCarousal';
import UpdateCarousal from 'pages/admin/carousal/UpdateCarousal';
import MyTimePicker from 'services/helperFunctions/test';
import ShippingInfo1 from 'pages/order/shippingInfo/ShippingInfo';
import RegistrationSuccess from 'pages/auth/register/RegistrationSuccess';
import LocationComponent from 'pages/location/Location';
import Home from 'pages/home/draft/Home';
import UpdateProfile from 'pages/user/UpdateProfile';
import CustomerList from 'pages/admin/CustomerList';
// import CartSummary from 'pages/home/draft/CartSummaryy';
// import Cart from 'pages/home/draft/cartSummary';
import Cart from './pages/order/cart';
import Landing from 'pages/home/LandingPage/Home';
import ProtectedRoute from 'routes/protectedRoute';

function App() {
  const loggedIn = window.localStorage.getItem('isloggedIn'  || false);
  const {pathname} = window.location.pathname;
  // console.log(pathname);
  const [stripeApiKey, setStripeApiKey] = useState('');
  // const [notification, setNotification] = useState('');
  useEffect(() => {
    // store.dispatch(loadUser);
    async function getStripeApiKey() {
      try {
        const { data } = await axios.get('/api/stripeapi');
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(`Bad Request: ${error.response.data.message}`, {
            position: toast.POSITION.BOTTOM_CENTER
          });
          // console.error('Bad Request:', error.response.data.message);
        } else {
          // console.error('Error fetching Stripe API key:', error);
          toast.error('Error fetching Stripe API key', {
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      }
    }

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App bg-dark">
        <HelmetProvider>
          <div className="header">
              <Header />
          </div>
            <ToastContainer theme="dark" />
            <Routes>
              <Route element={loggedIn ? <HomePage /> : <LoginPage />} />

              {/* <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductDetail />} /> */}
              <Route path="/time" element={<MyTimePicker />} />
              <Route path="/select" element={<HomePage />} />
              <Route path="/landing" element={<Home />} />
              <Route path="/home" element={<HomeDraft />} />
              <Route path="/ProductSearch" element={<ProductSearch />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/otp" element={<SendLoginOtp />} />
              <Route path="/loginWithOtp" element={<LoginWithOtp />} />
              <Route path="/menuDetails/:id" element={<MenuDetails />} />
              <Route path="/restaurants" element={<Restaurant />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/menus" element={<Menus />} />
              < Route path="/" element={<Landing />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/password/forgot" element={<ForgotPasswordPage />} />
              <Route path="/userOrderList" element={<UserOrderList />} />
              <Route path="/api/verify-email/:token" element={<RegistrationSuccess />} />
              <Route path="/shippingInfo" element={<ShippingInfo1 />} />
              <Route path="/api/password/reset/:token" element={<ResetPassword />} />
              <Route path="/location" element={<LocationComponent/>} />
              <Route path="/order/confirm" element={                  
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
                path="/order/:id"
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
                path="/myProfile/:id"
                element={
                  // <ProtectedRoute>
                  <Profile />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/updateProfile/:id"
                element={
                  // <ProtectedRoute isAdmin>
                  <UpdateProfile />
                  // </ProtectedRoute>
                }
              />
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
                path="/admin/orders/delivery"
                element={
                  // <ProtectedRoute isAdmin>
                  <OrdersTableDelivery />
                  // </ProtectedRoute>
                }
              />
               <Route
                path="/admin/orders/pickup"
                element={
                  // <ProtectedRoute isAdmin>
                  <OrdersTablePickup />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/admin/order/:id"
                element={
                  // <ProtectedRoute isAdmin>
                  <OrderStatus />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/admin/carousel/new"
                element={
                  // <ProtectedRoute isAdmin>
                  <CarouselForm />
                // </ProtectedRoute>
                }
              />
               <Route
                path="/admin/carousel/list"
                element={
                  // <ProtectedRoute isAdmin>
                  <CarousalTable />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/admin/create"
                element={
                  // <ProtectedRoute isAdmin>
                  <CreateAdmin />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/admin/updateCarousal/:id"
                element={
                  // <ProtectedRoute isAdmin>
                  <UpdateCarousal />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/admin/create/restaurant"
                element={
                  // <ProtectedRoute>
                  <CreateRestaurant />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/admin/updateMenu/:id"
                element={
                  // <ProtectedRoute>
                  <UpdateMenu />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/admin/updateRestaurant/:id"
                element={
                  // <ProtectedRoute>
                  <EditRestaurant />
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
                path="/admin/customer/list"
                element={
                  // <ProtectedRoute isAdmin>
                  <CustomerList />
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
              />
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
            </Routes>
           <Footer /> 
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;