/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// /* eslint-disable prefer-destructuring */
// /* eslint-disable no-underscore-dangle */
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const OrderSuccess = () => {
//   // const [cartItems, setCartItems] = useState([]);
//   const orderInfo = JSON.parse(sessionStorage.getItem('confirmOrder'));
//   const cartInfo = JSON.parse(sessionStorage.getItem('cartItems'));
//   const streetAddress = orderInfo.shippingInfo.streetAddress;
//   const city = orderInfo.shippingInfo.city;
//   const state = orderInfo.shippingInfo.state;
//   const fullAddress = `${streetAddress ? `${streetAddress}, ` : ''}${
//     city || ''
//   }${state ? `, ${state}` : ''}`;
//   const localData = JSON.parse(sessionStorage.getItem('shippingInfo'));
//   const restaurantId = JSON.parse(sessionStorage.getItem('zipCode'));
//   const restaurantBranch = JSON.parse(
//     sessionStorage.getItem('restaurantBranch')
//   );
//   const deliveryInstruction = JSON.parse(
//     sessionStorage.getItem('deliveryInstruction')
//   );
//   const orderNotes = JSON.parse(sessionStorage.getItem('orderNotes'));
//   // const [cartItems, setCartItems] = useState(cartInfo);
//   const createOrder = async () => {
//     try {
//       console.log(fullAddress);
//       const response = await axios.post('/api/order/new', {
//         shipping: {
//           name: `${localData.name} ${localData.lastName}`,
//           email: localData.email,
//           phone: localData.mobileNumber,
//           address: {
//             user: localData.name,
//             email: localData.email,
//             phone: localData.mobileNumber,
//             line1: localData.streetAddress,
//             city: localData.city,
//             orderType: localData.orderType,
//             state: localData.state,
//             postalCode: localData.zipCode,
//             country: localData.country
//           }
//         },
//         items: cartInfo.map((cartItem) => ({
//           name: cartItem.name,
//           image:
//             Array.isArray(cartItem.image) && cartItem.image.length > 0
//               ? cartItem.image[0]
//               : 'https://via.placeholder.com/20',
//           price: cartItem.price,
//           itemQuantity: cartItem.quantity
//         })),
//         orderNotes,
//         deliveryInstruction,
//         itemsPrice: orderInfo.orderSummary.estimatedTotal,
//         taxPrice: orderInfo.orderSummary.tax,
//         shippingPrice: orderInfo.orderSummary.shipping,
//         totalPrice: orderInfo.orderSummary.total,
//         paymentInfo: orderInfo.paymentInfo,
//         restaurantId,
//         restaurantBranch,
//         pickup: orderInfo.shippingInfo.orderType,
//         selectedTimeSlot: localData.selectedTimeSlot
//       });

//       console.log('Order created successfully:', response.data.order);
//       sessionStorage.removeItem('cartItems');
//     } catch (error) {
//       console.error('Error creating order:', error.message);
//     }
//   };
//   useEffect(() => {
//     createOrder();
//   }, []);

//   return (
//     <div>
//       <div className="row justify-content-center">
//         <div className="col-6 mt-5 text-center">
//           <img
//             className="my-5 img-fluid d-block mx-auto"
//             src="https://static.vecteezy.com/system/resources/thumbnails/001/622/545/original/success-check-mark-icon-animation-video.jpg"
//             alt="Order Success"
//             width="200"
//             height="200"
//           />

//           <h2>Your Order has been placed successfully.</h2>

//           {/* <Link to="/userOrderList">Go to Orders</Link> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './OrderSuccess.css';
import { motion, AnimatePresence } from "framer-motion"

const OrderSuccess = () => {
  // const [cartItems, setCartItems] = useState([]);
  const orderInfo = JSON.parse(localStorage.getItem('confirmOrder'));
  const cartInfo = JSON.parse(localStorage.getItem('cartItems'));
  // const date = localStorage.getItem('selectedDate');
  const localData = JSON.parse(localStorage.getItem('shippingInfo'));
  // const selectedTimeSlot = JSON.parse(
  //   localStorage.getItem('selectedTimeSlot')
  // );
  const time = JSON.parse(localStorage.getItem('selectedTimeSlot'));
  const payment = JSON.parse(localStorage.getItem('payment'));
  const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
  const restaurantBranch = JSON.parse(localStorage.getItem('branch'));
  const restaurantAddress = JSON.parse(localStorage.getItem('Address'));
  const orderDate = JSON.parse(localStorage.getItem('selectedDate'));
  const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
  const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
  const deliveryInstruction = JSON.parse(
    localStorage.getItem('deliveryInstruction')
  );
  const orderNotes = JSON.parse(localStorage.getItem('orderNotes'));
  const userId = JSON.parse(localStorage.getItem('user'));
  const emailOrMobile = JSON.parse(localStorage.getItem('emailOrMobile'));
  const createOrder = async () => {
    try {
      const response = await axios.post('/api/order/new', {
        shipping: {
          name: `${localData.name} ${localData.lastName}`,
          email: localData.email,
          phone: localData.mobileNumber,
          emailOrMobile,
          address: {
            user: localData.name,
            email: localData.email,
            emailOrMobile,
            phone: localData.mobileNumber,
            line1: billingAddress.streetAddress,
            city: billingAddress.city,
            orderType: localData.orderType,
            state: billingAddress.state,
            postalCode: billingAddress.postalCode,
            country: billingAddress.country
          }
        },
        delivery: deliveryAddress
          ? {
              line1: deliveryAddress.streetAddress,
              city: deliveryAddress.city,
              state: deliveryAddress.state,
              postalCode: deliveryAddress.postalCode,
              country: deliveryAddress.country
            }
          : undefined,
        items: cartInfo.map((cartItem) => ({
          name: cartItem.name,
          image: cartItem.images[0].image || 'https://via.placeholder.com/20',
          price: cartItem.price,
          itemQuantity: cartItem.quantity
        })),
        orderNotes,
        userId: userId?._id || 'Guest',
        deliveryInstruction,
        itemsPrice: orderInfo.orderSummary.estimatedTotal,
        taxPrice: orderInfo.orderSummary.tax,
        shippingPrice: orderInfo.orderSummary.shipping,
        totalPrice: orderInfo.orderSummary.total,
        paymentInfo: payment.paymentIntent.id,
        orderInstruction: orderInfo.orderSummary.textBox1,
        paymentStatus: payment.paymentIntent.status,
        restaurantId,
        orderDate,
        restaurantBranch: `${restaurantBranch}, ${restaurantAddress}`,
        orderType: orderInfo.shippingInfo.orderType,
        selectedTimeSlot: `${time}` // [${date}] ${selectedTimeSlot} - ()
      });

      // console.log('Order created successfully:', response.data.order);
      localStorage.removeItem('cartItems');
      for (const key in localStorage) {
        if (key !== 'user' && key !== 'isloggedIn') {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      // console.error('Error creating order:', error.message);
      toast.error('Error creating order');
    }
  };
  useEffect(() => {
    createOrder();
  }, []);

  return (
    <div id='OrderSuccessMainImg'>
      <div className="row justify-content-center mx-auto">
        <div className="col-12 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src={require('../../assets/img/OrderSuccessImg.png')}
            alt="Order Success"
            width="300"
            height="300"
          />

          <h1 className='mb-3' style={{color:'#62fc03'}}>Your Order has been placed successfully.</h1>
          <div>
            <Link to="/">
              <Button className="my-global-button  mb-5 mt-3">Go to home</Button>{' '}
            </Link>
          </div>

          {/* <Link to="/userOrderList">Go to Orders</Link> */}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
