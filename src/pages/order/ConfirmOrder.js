/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */

import axios from 'axios';
import Cart from 'pages/home/draft/cartSummary';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ConfirmOrder.css';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [restaurantBranch, setRestaurantBranch] = useState(null);
  const [isPickup, setIsPickup] = useState(true);
  // const { cartId } = useParams();

  // Get data from session storage
  const localData = JSON.parse(localStorage.getItem('shippingInfo'));
  const emailOrMobile = JSON.parse(localStorage.getItem('emailOrMobile'));
  const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
  const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
  const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
  const selectedDate = JSON.parse(localStorage.getItem('selectedDate'));
  const time = JSON.parse(localStorage.getItem('selectedTimeSlot'));
  const distanceResponse = JSON.parse(localStorage.getItem('distanceResponse'));
  const isLoggedIn = JSON.parse(localStorage.getItem('isloggedIn'));
  // const userData = JSON.parse(localStorage.getItem('user'));
  const shippingPrice = isPickup
    ? 0
    : 10 * Number(distanceResponse.data.distanceInKilometers * 0.5);

  // Calculate total price without shipping
  const cartItemsTotal = JSON.parse(localStorage.getItem('cartItemsTotal'));
  const totalPriceWithoutShipping = Number(cartItemsTotal);
  // Calculate tax price
  const taxPrice = Number(0.05 * totalPriceWithoutShipping).toFixed(2);

  // Calculate total price
  const totalPrice = Number(
    Number(shippingPrice) + Number(totalPriceWithoutShipping) + Number(taxPrice)
  ).toFixed(2);

  const fetchRestaurantBranch = async () => {
    try {
      const response = await axios.get(`/api/restaurant`, {
        params: {
          id: restaurantId
        }
      });
      setRestaurantBranch(response.data.restaurant.restaurantBranch);
      // console.log(response.data.restaurant.restaurantBranch);
      localStorage.setItem(
        'restaurantBranch',
        JSON.stringify(restaurantBranch)
      );
    } catch (error) {
      // console.error('Error fetching restaurant details:', error.message);
      toast.error('Error fetching restaurant details');
    }
  };
  useEffect(() => {
    fetchRestaurantBranch();
  }, [restaurantId]);
  // Map shipping information
  const mapData = () => {
    return {
      userName: localData.name,
      city: billingAddress.city,
      orderType: localData.orderType,
      selectedTimeSlot: `${time}`,
      state: billingAddress.state,
      streetAddress: billingAddress.streetAddress,
      postalCode: billingAddress.postalCode,
      country: billingAddress.country
    };
  };

  // Map data using the function
  const mappedData = mapData();

  const processPayment = () => {
    const data = {
      shippingInfo: mappedData, // Shipping information
      cartItems,
      orderSummary: {
        shipping: Number(shippingPrice),
        tax: Number(taxPrice),
        total: Number(totalPrice)
      }
    };

    // Save order information to localStorage
    localStorage.setItem('confirmOrder', JSON.stringify(data));

    // Redirect to the payment page
    navigate('/payment');
  };

  // Fetch cart items from session storage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    setIsPickup(mappedData.orderType === 'Pickup');
  }, []);

  return (
    <div className='ConfirmOrderMainImg'>
      <div className='py-5'>
      <Card className="row d-flex justify-content-between col-12 col-md-5 mx-auto" id="CardBackIMg" >
        <div className=" order-confirm " style={{ textAlign: 'left' }} >
          <h4 className="mb-3 my-2" style={{color:'white',backgroundColor:'transparent',fontWeight:'550'}}>
            <>Shipping Info</>
          </h4>
          <Card className="p-2 " style={{ borderRadius: '10px', backgroundColor:'transparent' }}>
            <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              <b>Name:</b> {localData.name}{' '}
              {/* Replace with actual name data */}
            </p>
            {isLoggedIn && (
              <>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Email:</b> {localData.email}
                </p>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Phone:</b> {localData.mobileNumber}
                </p>
              </>
            )}
            {!isLoggedIn && (
              <>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Email / Phone:</b> {emailOrMobile}
                </p>
                <p className="mb-4" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Billing Address:</b> {mappedData.streetAddress},{' '}
                  {mappedData.city}, {mappedData.state}, {mappedData.postalCode}
                  , {mappedData.country}
                </p>
              </>
            )}
            {mappedData.orderType === 'Pickup' ? (
              <div style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}} >
                  <b >Type:</b> Pickup
                </p>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Order date:</b> {selectedDate}
                </p>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Pickup Time:</b> {mappedData.selectedTimeSlot}
                </p>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Restaurant:</b> {restaurantBranch}
                </p>
              </div>
            ) : (
              <div>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Type:</b> Delivery
                </p>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Restaurant:</b> {restaurantBranch}
                </p>
                <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <b>Delivery Time:</b>{' '}
                  {mappedData.selectedTimeSlot || Date.now()}
                </p>
                <Card className="mt-3 p-2" style={{ borderRadius: '10px',color:'black',backgroundColor:'transparent'}}>
                  <p className="mb-4"style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                    <b style={{color:'black'}} >Billing Address:</b> {mappedData.streetAddress},{' '}
                    {mappedData.city}, {mappedData.state},{' '}
                    {mappedData.postalCode}, {mappedData.country}
                  </p>
                </Card>
                <Card className="mt-3 p-2" style={{ borderRadius: '10px',color:'white',backgroundColor:'transparent'}}>
                  <p className="mb-4" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                    <b style={{color:'black'}}>Delivery Address:</b> {deliveryAddress.streetAddress},{' '}
                    {deliveryAddress.city}, {deliveryAddress.state},{' '}
                    {deliveryAddress.postalCode}, {deliveryAddress.country}
                  </p>
                </Card>
              </div>
            )}
          </Card>
          {/* <Card className="p-2 " style={{ borderRadius: '10px' }}> */}
          <Cart />
          {/* </Card> */}
        </div>

        <div className="">
          <Card
          
            className="mt-3 p-2 "
            style={{ borderRadius: '10px',color:'black',backgroundColor:'transparent',fontWeight:'500'}}
            id="order_summary"
          >
            <p  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>

            {/* <hr /> */}
            <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              Delivery:{' '}
              <span className="order-summary-values">${shippingPrice}</span>
            </p>

            {/* <hr /> */}

            <p  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>
            {/* <hr /> */}
          </Card>
          <button
            type="submit"
            id="checkout_btn"
            className="btn my-global-button my-4"
            style={{ backgroundColor: '#ffa500' }}
            onClick={processPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </Card>
      </div>
    </div>
  );
};

export default ConfirmOrder;
