/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */

import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const confirmOrderData = JSON.parse(localStorage.getItem('confirmOrder'));
  const emailOrMobile = JSON.parse(localStorage.getItem('emailOrMobile'));
  const user = JSON.parse(localStorage.getItem('user'));
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
  const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
  const [error, setError] = useState(null);

  const paymentData = {
    amount: Math.round(confirmOrderData.orderSummary.total),
    shipping: {
      // name: `${user.name} ${user.lastName}`,
      name: `${user?.name || shippingInfo.name} ${
        user?.lastName || shippingInfo.lastName
      }`,
      phone: user?.phone || emailOrMobile,
      address: {
        line1: billingAddress?.streetAddress,
        line2: null,
        city: billingAddress?.city,
        state: billingAddress?.state,
        postal_code: billingAddress?.postalCode,
        country: billingAddress?.country
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;

    try {
      const { data } = await axios.post('/api/payment/process', paymentData);
      const clientSecret = data.client_secret;
      const cardNumberElement = elements.getElement(CardNumberElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: `${user?.name || shippingInfo.name} ${
              user?.lastName || shippingInfo.lastName
            }`,
            email: user?.email || emailOrMobile
          }
        }
      });

      if (result.error) {
        toast(result.error.message, {
          type: 'error',
          position: toast.POSITION.BOTTOM_CENTER
        });
        document.querySelector('#pay_btn').disabled = false;
      } else if (result.paymentIntent.status === 'succeeded') {
        // Payment Success!
        toast('Payment Success!', {
          type: 'success',
          position: toast.POSITION.BOTTOM_CENTER
        });
        localStorage.setItem('payment', JSON.stringify(result));
        navigate('/order/success');

        // Optionally, you can perform other actions here after successful payment
      } else {
        // Payment failed
        toast('Payment failed, Please try again!', {
          type: 'warning',
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } catch (error) {
      // Handle any API call errors
      console.error('Error processing payment:', error.message);
    }
  };
  useEffect(() => {
    setError(null);
  }, [error]);

  return (
    <div className="" id="CardPMainImg">
      <div className="col-11 col-md-4 mx-auto py-5" >
        <Form onSubmit={submitHandler} className="shadow-lg custom-table" id="CardBackIMg" >
          <div className="m-3 ">
            <h4 className="mb-4"  style={{color:'white',backgroundColor:'transparent',fontWeight:'520'}}>Card Info</h4>
            <div className="form-group" >
              <label htmlFor="card_num_field"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>Card Number</label>
              <CardNumberElement
                type="text"
                style={{color:'black',backgroundColor:'transparent'}}
                id="card_num_field"
                className="form-control "
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>Card CVC</label>
              <CardCvcElement
                type="password"
                id="card_cvc_field"
                className="form-control "
                value=""
              />
            </div>

            <button
              id="pay_btn"
              type="submit"
              className="btn my-global-button btn-block my-3 text-white"
            >
              Pay -{' '}
              {` $${
                confirmOrderData.orderSummary &&
                confirmOrderData.orderSummary.total
              }`}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Payment;
