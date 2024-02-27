/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { Form, FormControl, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown, Stack } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { logout } from '../redux-toolkit/actions/auth';
import './header.css';
import logo from '../assets/img/grandIndiaLogo1.png';

const Header = () => {
  // const { isAuthenticated } = useSelector((state) => state.authState);
  const pathname1 = window.location.pathname;
  const { isAuthenticated } = useSelector((state) => state.authState);
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const cartItemsFromStorage =
    JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(cartItemsFromStorage);

  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const isloggedIn = localStorage.getItem('isloggedIn' || false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  const handleLogout = () => {
    dispatch(logout);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.clear();
    localStorage.clear();
    window.localStorage.setItem('isloggedIn', false);
    window.localStorage.setItem('isloggedIn', false);
    // toast.success('Logout successful!', {
    //   position: 'top-right',
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true
    // });
    setIsLoggedIn(false);
    navigate('/login');
  };

  const getUserRole = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.role;
    }
    return null;
  };

  const role = getUserRole();
  useEffect(() => {
    setNavbarExpanded(false);
  }, [navigate, token]);
  return (
    <Navbar
      expand="lg"
      className="header-custom custom-navbar"
      id="header"
      style={{ backgroundColor: 'white', color: 'black' }}
      expanded={navbarExpanded}
    >
      {pathname1 === '/login' ||
      pathname1 === '/signup' ||
      pathname1 === '/password/forgot' ||
      pathname1 === '/login/otp' ||
      pathname1 === '/loginWithOtp' ||
      pathname1 === `/api/password/reset/:${token}` ? (
        <></>
      ) : (
        <Container>
          <Navbar.Brand className="col-md-1 ">
            <Nav.Link as={Link} to="/">
              <img
                src={require('../assets/img/grandIndiaLogo1.png')}
                style={{ height: '40px', width: '130px' }}
              />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleNavbarToggle}
            style={{ border: '2px solid #8D4527' }}
          />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav
              style={{ fontSize: '17px', fontWeight: '600', color: '#2a206b' }}
              className="col-md-7 col-lg-8 mx-auto"
            >
              {isloggedIn === 'true' ? (
                <>
                  {role === 'user' && (
                    <>
                      <Nav.Link as={Link} to="/">
                        {/* <i className="fa-solid fa-house menuIconColor" /> */}
                        Home
                      </Nav.Link>
                      <Nav.Link as={Link} to="/select">
                        {/* <i className="fa-solid fa-bell-concierge menuIconColor" /> */}
                        Order
                      </Nav.Link>
                      <Nav.Link as={Link} to={`/myProfile/${user._id}`}>
                        {/* <i className="fa-solid fa-user menuIconColor" /> */}
                        Profile
                      </Nav.Link>
                    </>
                  )}
                  {role === 'admin' && (
                    <>
                      <Nav.Link as={Link} to="/">
                        {/* <i className="fa-solid fa-house menuIconColor" /> */}
                        Home
                      </Nav.Link>
                      <Nav.Link as={Link} to="/select">
                        {/* <i className="fa-solid fa-bell-concierge menuIconColor" /> */}
                        Order
                      </Nav.Link>
                      <Nav.Link as={Link} to={`/myProfile/${user._id}`}>
                        {/* <i className="fa-solid fa-user menuIconColor" /> */}
                        Profile
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/dashboard">
                        {/* <i className="fa-solid fa-table-columns menuIconColor" /> */}
                        Dashboard
                      </Nav.Link>

                      <Nav.Link as={Link} to="/admin/orders">
                        {/* <i className="fa-regular fa-note-sticky menuIconColor" /> */}
                        <span>Active Orders</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/orderHistory">
                        {/* <i className="fa-solid fa-clock-rotate-left menuIconColor" /> */}
                        Order History
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/menus">
                        {/* <i className="fa-solid fa-utensils menuIconColor" /> */}
                        Menus
                      </Nav.Link>
                    </>
                  )}
                  {role === 'superAdmin' && (
                    <>
                      {/* <Nav.Link as={Link} to="/">
                        <i className="fa-solid fa-house menuIconColor" />
                        <span> Home</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/select">
                        <i className="fa-solid fa-bell-concierge menuIconColor" />
                        <span>Order</span>
                      </Nav.Link> */}
                      <Nav.Link as={Link} to="/admin/dashboard">
                        {/* <i className="fa-solid fa-table-columns menuIconColor" /> */}
                        <span>Dashboard</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/orders">
                        {/* <i className="fa-regular fa-note-sticky menuIconColor" /> */}
                        <span>Active Orders</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/menus">
                        {/* <i className="fa-solid fa-utensils menuIconColor" /> */}
                        <span>Menus</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/orderHistory">
                        {/* <i className="fa-solid fa-clock-rotate-left menuIconColor" /> */}
                        <span>Order History</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/users">
                        {/* <i className="fa-solid fa-user menuIconColor" /> */}
                        <span>Users</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/restaurants">
                        {/* <i className="fa-solid fa-hotel menuIconColor" /> */}
                        <span>Restaurants</span>
                      </Nav.Link>
                    </>
                  )}
                  <div className="logout-login-buttons">
                    {!isLoggedIn ? (
                      <Nav.Link
                        style={{
                          borderRadius: '30px',
                          width: '100px',
                          backgroundColor: '#f0b06c',
                          textAlign: 'center', // Center text horizontally
                          display: 'inline-block',
                          borderColor: '#f0b06c'
                        }}
                        className="my-global-button mx-auto"
                        onClick={handleLogout}
                      >
                        Logout
                      </Nav.Link>
                    ) : (
                      <>
                        <Stack direction="horizontal" gap={3} />
                        <Nav.Link
                          style={{
                            borderRadius: '30px',
                            width: '100px',
                            backgroundColor: '#f0b06c',
                            textAlign: 'center', // Center text horizontally
                            display: 'inline-block',
                            borderColor: '#f0b06c'
                          }}
                          className="my-global-button mx-auto"
                          as={Link}
                          to="/login"
                        >
                          Login
                        </Nav.Link>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">
                    {/* <i className="fa-solid fa-house menuIconColor" /> */}
                    <span className='ms-lg-5'>Home</span>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/select">
                    {/* <i className="fa-solid fa-bell-concierge menuIconColor" /> */}
                    <span> Order</span>
                  </Nav.Link>
                  <div className="logout-login-buttons">
                    {isLoggedIn ? (
                      <Nav.Link
                        className="my-global-button mx-auto"
                        style={{
                          borderRadius: '30px',
                          width: '100px',
                          textAlign: 'center', // Center text horizontally
                          display: 'inline-block',
                          backgroundColor: '#f0b06c',
                          borderColor: '#f0b06c'
                        }}
                        onClick={handleLogout}
                      >
                       
                        Logout
                      </Nav.Link>
                    ) : (
                      <Nav>
                        <Stack direction="horizontal" gap={3} />
                        <Nav.Link
                          style={{
                            borderRadius: '30px',
                            width: '100px',
                            textAlign: 'center', // Center text horizontally
                            display: 'inline-block',
                            backgroundColor: '#f0b06c',
                            borderColor: '#f0b06c'
                          }}
                          className="my-global-button mx-auto"
                          as={Link}
                          to="/login"
                        >
                          Login
                        </Nav.Link>
                      </Nav>
                    )}
                  </div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );
};

export default Header;
