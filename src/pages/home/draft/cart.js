/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */

import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const navigate = useNavigate();
  const [localQuantities, setLocalQuantities] = useState(
    storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {})
  );

  const handleAdd = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: (localQuantities[item._id] || 0) + 1,
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = storedCartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleMinus = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: Math.max((localQuantities[item._id] || 0) - 1, 0),
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = storedCartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: Math.max((cartItem.quantity || 0) - 1, 1) };
      }
      return cartItem;
    });

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // const handleDelete = (itemId) => {
  //   try {
  //     // Get the current cart items from session storage
  //     const storedCartItem = JSON.parse(sessionStorage.getItem('cartItems')) || [];

  //     // Filter out the item with the specified itemId
  //     const updatedCartItems = storedCartItem.filter(item => item._id !== itemId);

  //     // Optionally, update your local state or perform any other necessary actions
  //     setLocalQuantities(updatedCartItems);
      
  //     // Update session storage with the updated cart items
  //     sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
     
  //   } catch (error) {
  //     console.error('Error deleting item:', error.message);
  //   }
  // };
  const handleDelete = (itemId) => {
    try {
      // Get the current cart items from session storage
      const storedCartItem = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      // Filter out the item with the specified itemId
      const updatedCartItems = storedCartItem.filter(item => item._id !== itemId);
  
      // Update your local state with the updated cart items
      setLocalQuantities(updatedCartItems);
  
      // Update session storage with the updated cart items or remove the key if the array is empty
      if (updatedCartItems.length === 0) {
        localStorage.removeItem('cartItems');
      } else {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };
    


  const checkoutHandler = () => {
    const cartItemsTotal = storedCartItems.reduce((acc, item) => {
      const quantity = localQuantities[item._id] || 1;
      const price = Number(item.price);
      const subtotal = quantity * price;
      console.log(`Item: ${item._id}, Subtotal: ${subtotal}`);
      return acc + subtotal;
    }, 0);

    localStorage.setItem('cartItemsTotal', JSON.stringify(cartItemsTotal));
    navigate('/shippingInfo');
  };


  // useEffect(() => {
  //   setLocalQuantities(
  //     storedCartItems.reduce((acc, item) => {
  //       acc[item._id] = Number(item.quantity);
  //       return acc;
  //     }, {})
  //   );
  // }, []);
  useEffect(() => {
    if (storedCartItems.length > 0) {
      handleDelete();
    }
  }, [storedCartItems.length]);

  // localQuantities,

  return (
    <>
      {storedCartItems.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{storedCartItems.length} items</b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div>
              {storedCartItems.map((item) => (
                <Fragment key={item._id}>
                  <hr />
                  <div className="row cart-item">

                    <div className="col-7">
                      <img
                        className="cartImage col-3"
                        src={
                          item.image || 'https://via.placeholder.com/20'
                        }
                        alt={item.name}
                      />
                      <Link className='col-9' to={`/product/${item._id}`}>{item.name}</Link>
                    </div>
                    <div className='col-5' >
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
                      <div className="stockCounter d-inline">
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
                    ${(storedCartItems.reduce((acc, item) => {
                      // const quantity = Number(localQuantities[item._id]);
                      const price = Number(item.price);
                      const subtotal = Number(item.quantity) * Number(price);
                      console.log(`Item: ${item._id}, Subtotal: ${subtotal}`);
                      return Number(acc) + Number(subtotal);
                    }, 0)).toFixed(2)}
                  </span>
                </p>
                <hr />
                <button
                  id="checkout_btn"
                  onClick={checkoutHandler}
                  className="btn my-global-button btn-block"
                >
                  Check out..
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
