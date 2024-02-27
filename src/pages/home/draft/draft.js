/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, Fragment } from 'react';
import { Card, Button, Modal, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loader from 'layout/Loader';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const branch = localStorage.getItem('branch');
  const address = localStorage.getItem('Address');
  const date = localStorage.getItem('selectedDate');
  const selectedBranch = localStorage.getItem('restaurantId');
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(storedCartItems);
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [localQuantities, setLocalQuantities] = useState(
    storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {})
  );
  const [productsCount, setProductsCount] = useState(0);
  const [resPerPage, setResPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealTypeCategory, setMealTypeCategory] = useState(null);
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState(null);
  const [dietaryCategories, setDietaryCategories] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = (menuItem) => {
    // Check if menuItem is defined and has an _id property
    if (!menuItem || !menuItem._id) {
      // console.error('Invalid menuItem:', menuItem);
      return;
    }

    // Check if the item is already in the cart
    const existingCartItem = cartItems.find(
      (item) => item._id === menuItem._id
    );

    if (existingCartItem) {
      return;
    }
    const updatedCartItems = [
      ...cartItems,
      { ...menuItem, quantity: cartItems.quantity || 1 }
    ];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleViewDetails = (selectedMenu) => {
    setSelectedMenuItem(selectedMenu);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getProducts = async (
    keyword,
    dietaryPreferenceCategory,
    mealTypeCategory,
    currentPage
  ) => {
    try {
      setLoading(true);
      let link = `http://localhost:8000/api/products?restaurantId=${selectedBranch}&page=${currentPage}`;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (mealTypeCategory) {
        link += `&mealTypeCategory=${mealTypeCategory}`;
      }
      if (dietaryPreferenceCategory) {
        link += `&dietaryPreferenceCategory=${dietaryPreferenceCategory}`;
      }
      const response = await axios.get(link);
      setMenus(response.data.Menus);
      setProductsCount(response.data.Count);
      setResPerPage(response.data.resPerPage);
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching menus:', error);
      setLoading(false);
      toast.warning('No menus available!', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000
      });
      setMealTypeCategory(null);
      setDietaryPreferenceCategory(null);
    }
  };

  const handleClearFilter = () => {
    setMealTypeCategory(null);
    setDietaryPreferenceCategory(null);
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    getProducts(
      searchTerm,
      dietaryPreferenceCategory,
      mealTypeCategory,
      currentPage
    );
    setSearchTerm('');
  };

  const handleAdd = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: (localQuantities[item._id] || 0) + 1
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('localQuantities', JSON.stringify(updatedQuantities));
  };

  const handleMinus = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: Math.max((localQuantities[item._id] || 0) - 1, 0)
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return {
          ...cartItem,
          quantity: Math.max((cartItem.quantity || 0) - 1, 1)
        };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('localQuantities', JSON.stringify(updatedQuantities));
  };

  const handleDelete = (itemId) => {
    try {
      const storedCartItem =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      const updatedCartItems = storedCartItem.filter(
        (item) => item._id !== itemId
      );

      // Update state
      setLocalQuantities((prevQuantities) => {
        const { [itemId]: _, ...rest } = prevQuantities;
        return rest;
      });
      setCartItems(updatedCartItems);

      // Update localStorage
      if (updatedCartItems.length === 0) {
        localStorage.removeItem('cartItems');
      } else {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      // console.error('Error deleting item:', error.message);
      toast.error('Error deleting item:');
    }
  };

  const checkoutHandler = () => {
    const cartItemsTotal = cartItems.reduce((acc, item) => {
      const quantity = item.quantity || 1; // Use item.quantity directly
      const price = Number(item.price);
      const subtotal = quantity * price;
      // console.log(`Item: ${item._id}, Subtotal: ${subtotal}`);
      return acc + subtotal;
    }, 0);
    localStorage.setItem('cartItemsTotal', JSON.stringify(cartItemsTotal));
    navigate('/shippingInfo');
  };
  useEffect(() => {
    if (storedCartItems.length > 0) {
      handleDelete();
    }
  }, [storedCartItems.length]);

  useEffect(() => {
    getProducts(
      searchTerm,
      dietaryPreferenceCategory,
      mealTypeCategory,
      currentPage
    );
  }, [
    currentPage,
    searchTerm,
    mealTypeCategory,
    dietaryPreferenceCategory,
    branch
  ]);

  useEffect(() => {
    axios
      .get('/api/dietary-preferences')
      .then((response) => setDietaryCategories(response.data.data))
      .catch(() =>
        // console.error('Error fetching dietary categories:', error)
        toast.error('Error fetching dietary categories')
      );

    axios
      .get('/api/meal-types')
      .then((response) => setMealCategories(response.data.data))
      .catch(() =>
        // console.error('Error fetching meal categories:', error)
        toast.error('Error fetching meal categories')
      );
  }, []);

  return (
    <div className="product-page">
      <main className="main-content">
        <div className="row">
          <div className="col-2">
            <h4 id="products_heading">Category</h4>
            <Button onClick={handleClearFilter}>clear</Button>
            <hr />
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="row">
                  <div>
                    <h5 className="mb-3 mt-3">Food Preferences</h5>
                    <ul className="pl-0">
                      {dietaryCategories.map((category) => (
                        <li
                          style={{
                            cursor: 'pointer',
                            listStyleType: 'none',
                            color:
                              dietaryPreferenceCategory ===
                              category.dietaryPreferenceCategory
                                ? 'red'
                                : 'black' // Highlight color
                          }}
                          key={category._id}
                          onClick={() => {
                            if (
                              dietaryPreferenceCategory ===
                              category.dietaryPreferenceCategory
                            ) {
                              setDietaryPreferenceCategory(null);
                            } else {
                              setDietaryPreferenceCategory(
                                category.dietaryPreferenceCategory
                              );
                            }
                          }}
                        >
                          {category.dietaryPreferenceCategory}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <div className="mt-5">
                    <h5 className="mb-3">Course</h5>
                    <ul className="pl-0">
                      {mealCategories.map((category) => (
                        <li
                          style={{
                            cursor: 'pointer',
                            listStyleType: 'none',
                            color:
                              mealTypeCategory === category.mealTypeCategory
                                ? 'red'
                                : 'black'
                          }}
                          key={category._id}
                          onClick={() => {
                            if (
                              mealTypeCategory === category.mealTypeCategory
                            ) {
                              setMealTypeCategory(null);
                            } else {
                              setMealTypeCategory(category.mealTypeCategory);
                            }
                          }}
                        >
                          {category.mealTypeCategory}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr className="my-5" />
                </div>
                {productsCount > 0 && productsCount > resPerPage ? (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination
                      activePage={currentPage}
                      onChange={handlePageChange}
                      totalItemsCount={productsCount}
                      itemsCountPerPage={resPerPage}
                      nextPageText="Next"
                      firstPageText="First"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div id="products" className="col-10">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearchSubmit}>Search</button>
            <div className="row">
              {menus.map((menuItem) => (
                <div
                  key={menuItem._id}
                  className="col-sm-12 col-md-6 col-lg-4 my-3"
                >
                  <div className="card p-3 rounded shadow">
                    <h5 className="card-title mb-3">{menuItem.name}</h5>
                    <img
                      className="card-img-top mx-auto"
                      src={
                        menuItem.images.length > 0
                          ? menuItem.images[0].image
                          : 'https://via.placeholder.com/75x50'
                      }
                      alt={menuItem.name}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-3">
                        <Link to={`/product/${menuItem._id}`}>
                          {menuItem.mealTypeCategory}
                        </Link>
                      </h5>
                      <div className="ratings mb-2">
                        <div className="rating-outer">
                          <span className="text-muted ml-2">
                            {menuItem.description}...
                          </span>
                          <span
                            className="pointer"
                            onClick={() => handleViewDetails(menuItem)}
                          >
                            View Details{' '}
                          </span>
                        </div>
                      </div>
                      <div className="price mb-3">
                        ${menuItem.price.toFixed(2)}
                      </div>
                      <button
                        type="button"
                        id="cart_btn"
                        disabled={!menuItem.isAvailable}
                        onClick={() => handleAddToCart(menuItem)}
                        className="btn  d-inline ml-4"
                        style={{ backgroundColor: '#ffa500' }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <aside className="cart-summary">
        <Card>
          <Card.Header>
            <h2>Delivery Information</h2>
          </Card.Header>
          <Card.Body>
            <div className="delivery-info">
              <b>Restaurant:</b> {branch} {''} {address}
            </div>
            <div className="delivery-info">
              <b>Date:</b> {date}
            </div>
          </Card.Body>
        </Card>
        <div className="row d-flex justify-content-between">
          <div>
            {cartItems.map((item) => (
              <Fragment key={item._id}>
                <hr />
                <div className="row cart-item">
                  <div className="col-7">
                    <img
                      className="cartImage col-3"
                      src={item.image || 'https://via.placeholder.com/20'}
                      alt={item.name}
                    />
                    <Link className="col-9" to={`/product/${item._id}`}>
                      {item.name}
                    </Link>
                  </div>
                  <div className="col-5">
                    <p id="card_item_price">${item.price}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                      <span
                        className="icon-container"
                        onClick={() => handleAdd(item)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      <span
                        className="icon-container"
                        onClick={() => handleMinus(item)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </span>
                    </div>
                  </div>
                  <div className="col-6 mt-4 mt-lg-0">
                    <div className="stockCounter dinline">
                      <span>Qty:</span> {item.quantity}
                    </div>
                    <span
                      style={{ marginLeft: '20px', marginTop: '10px' }}
                      onClick={() => handleDelete(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </div>
                </div>
              </Fragment>
            ))}
            <hr />
          </div>
          <div className="col-12">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Items total:{' '}
                <span className="order-summary-values">
                  $
                  {(
                    cartItems.reduce((acc, item) => {
                      const subtotal = item.price * item.quantity;
                      return acc + subtotal;
                    }, 0) || 0
                  ).toFixed(2)}
                </span>
              </p>
              <hr />
              <button
                id="checkout_btn"
                onClick={checkoutHandler}
                className="btn btn-primary btn-block"
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </aside>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Menu Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMenuItem && (
            <>
              <h3>{selectedMenuItem.name}</h3>
              <p>Price: ${selectedMenuItem.price.toFixed(2)}</p>
              <p>Description: {selectedMenuItem.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
// /* eslint-disable no-underscore-dangle */
// import React, { useState, useEffect } from 'react';
// import { Card } from 'react-bootstrap';
// import Menus from './menu';
// import CartModel from './cart';
// // import Search from './search';

// function HomeDraft() {
//   const branch = localStorage.getItem('branch');
//   const address = localStorage.getItem('Address');
//   const date = localStorage.getItem('selectedDate');
//   const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   const [cartItems, setCartItems] = useState(storedCartItems);

//   const handleAddToCart = (menuItem) => {
//     // Check if menuItem is defined and has an _id property
//     if (!menuItem || !menuItem._id) {
//       console.error('Invalid menuItem:', menuItem);
//       return;
//     }

//     // Check if the item is already in the cart
//     const existingCartItem = cartItems.find(
//       (item) => item._id === menuItem._id
//     );

//     if (existingCartItem) {
//       return;
//     }
//     const updatedCartItems = [
//       ...cartItems,
//       { ...menuItem, quantity: cartItems.quantity || 1 }
//     ];
//     setCartItems(updatedCartItems);

//     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//     // }
//   };

//   const handleCheckout = () => {
//     //
//   };
//   useEffect(() => {
//     if (storedCartItems.length > 0) {
//       handleAddToCart();
//     }
//   }, [storedCartItems.length]);

//   return (
//     <div className="product-page">
//       <main className="main-content">
//         <Menus branch={branch} onAddToCart={handleAddToCart} />
//       </main>
//       <aside className="cart-summary">
//         <Card>
//           <Card.Header>
//             <h2>Delivery Information</h2>
//           </Card.Header>
//           <Card.Body>
//             <div className="delivery-info">
//               <b>Restaurant:</b> {branch} {''} {address}
//             </div>
//             <div className="delivery-info">
//               <b>Date:</b> {date}
//             </div>
//           </Card.Body>
//         </Card>
//         <div className="cart-items">
//           <CartModel
//             cartItems={cartItems}
//             // onCartItemUpdate={handleCartItemUpdate}
//             // onCartItemDelete={handleCartItemDelete}
//             onCheckout={handleCheckout}
//           />
//         </div>
//       </aside>
//     </div>
//   );
// }

// export default HomeDraft;

// /* eslint-disable no-shadow */
// /* eslint-disable no-underscore-dangle */

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { Button } from 'react-bootstrap';
// import axios from 'axios';
// import ReusableTable from '../../components/ReusableTable';
// import './index.css';
// // import Sidebar from './Sidebar';

// const OrdersTable = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const { restaurantId } = user;
//   const { role } = user;
//   const [orders, setOrders] = useState([]);
//   const [restaurant, setRestaurant] = useState([]);
//   const [orderType, setSelectedOrderType] = useState('all');

//   const [selectedBranch, setSelectedBranch] = useState(restaurantId || 'all');
//   const headers = [
//     'Sl No',
//     'Order ID',
//     'Customer',
//     'Restaurant Branch',
//     'Status'
//   ];
//   const handleBranchChange = (e) => {
//     setSelectedBranch(e.target.value);
//   };
//   const handleOrderTypeChange = (orderType) => {
//     setSelectedOrderType(orderType);
//   };
//   const formatAddress = (address) => {
//     return `${address.line1}, ${address.city}, ${address.state} - ${address.postalCode}, ${address.country}`;
//   };

//   // const fetchOrders = async () => {
//   //   try {
//   //     let response;

//   //     if (selectedBranch === 'all') {
//   //       response = await axios.get('/api/admin/orders/active');
//   //     } else {
//   //       const requestData = {
//   //         restaurantId: selectedBranch
//   //       };
//   //       response = await axios.post(
//   //         `/api/admin/orderHistory-active`,
//   //         requestData
//   //       );
//   //     }

//   //     // Extract the orders array from the response, handling both object and array responses
//   //     const orders = Array.isArray(response.data)
//   //       ? response.data
//   //       : response.data.orders;

//   //     setOrders(orders || []);
//   //   } catch (error) {
//   //     console.error('Error fetching orders:', error);
//   //   }
//   // };
//   const fetchOrders = async () => {
//     try {
//       let response;

//       if (selectedBranch === 'all') {
//         response = await axios.get('/api/admin/orders/active');
//       } else {
//         const requestData = {
//           restaurantId: selectedBranch
//         };
//         response = await axios.post(
//           '/api/admin/orderHistory-active',
//           requestData
//         );
//       }

//       // Extract the orders array from the response, handling both object and array responses
//       let orders = Array.isArray(response.data)
//         ? response.data
//         : response.data.orders;

//       // Filter orders based on orderType
//       if (orderType !== 'all') {
//         orders = orders.filter((order) => order.orderType === orderType);
//       }

//       setOrders(orders || []);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const handleEdit = (orderId) => {
//     navigate(`/admin/order/${orderId}`);
//     console.log(`Edit order with ID ${orderId}`);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [selectedBranch, orderType]);
//   useEffect(() => {
//     // Fetch time slots from the API
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get('/api/restaurant/get');
//         const restaurant = response.data.data;
//         // const timeSlotsData = Array.isArray(response.data) ? response.data : [];
//         console.log(restaurant);
//         setRestaurant(restaurant);
//       } catch (error) {
//         console.error('Error fetching time slots:', error.message);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col">
//           <div className="col-12 col-lg-3 mt-5">
//             <div className="form-group">
//               {role !== 'admin' && (
//                 <>
//                   <select
//                     className="form-control"
//                     name="status"
//                     value={selectedBranch}
//                     onChange={handleBranchChange}
//                   >
//                     <h4 className="my-4">Select branch</h4>
//                     <option value="all">All</option>
//                     {restaurant &&
//                       restaurant.map((restaurant) => (
//                         <option
//                           key={restaurant._id}
//                           value={restaurant.restaurantId}
//                         >
//                           {restaurant.restaurantBranch} -{' '}
//                           {formatAddress(restaurant.address)}
//                         </option>
//                       ))}
//                   </select>
//                   <h4 className="my-4 mt-3">Select order type</h4>
//                   <label>
//                     <input
//                       id="pickup"
//                       type="radio"
//                       name="orderType"
//                       value="Pickup"
//                       checked={orderType === 'Pickup'}
//                       onChange={() => handleOrderTypeChange('Pickup')}
//                     />{' '}
//                     Pickup
//                   </label>{' '}
//                   <label>
//                     <input
//                       id="delivery"
//                       type="radio"
//                       name="orderType"
//                       value="Delivery"
//                       checked={orderType === 'Delivery'}
//                       onChange={() => handleOrderTypeChange('Delivery')}
//                     />{' '}
//                     Delivery
//                   </label>
//                 </>
//               )}
//             </div>
//           </div>
//           <ReusableTable
//             data={orders}
//             headers={headers}
//             onEdit={(orderId) => handleEdit(orderId)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersTable;
