/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
import React, { Fragment, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Cart() {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsTotal = JSON.parse(localStorage.getItem('cartItemsTotal'));
  const [localQuantities, setLocalQuantities] = useState(
    storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {})
  );

  useEffect(() => {
    setLocalQuantities(
      storedCartItems.reduce((acc, item) => {
        acc[item._id] = Number(item.quantity);
        return acc;
      }, {})
    );
  }, []);

  return (
    <>
      {storedCartItems.length === 0 ? (
        <h4 className="mt-5" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>Your Cart is Empty</h4>
      ) : (
        <>
          <h4 className="mt-5" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
            Your Cart: <b>{storedCartItems.length} items</b>
          </h4>
          <Card className="row d-flex justify-content-between" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}} >
            <div className="col-12 " >
              {storedCartItems.map((item) => (
                <Fragment key={item._id}>
                  {/* <hr /> */}
                  <Card className="mt-3 p-2 mx-auto" style={{ borderRadius: '10px',color: 'black', backgroundColor: 'transparent' }}>
                    <div className="row" >
                      {/* <div className="col-4  col-lg-3">
          <img
           className="cartImage img-fluid border"
            src={
              item.images[0] === undefined
                ? 'https://via.placeholder.com/20'
                : item.images[0].image
            }
            alt={item.name}
          />
        </div> */}
                      <div className="col-12">
                        <div className="row">
                          <div className="col-4">
                            <p style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>{item.name}</p>
                          </div>
                          <div className="col-4">
                            <p id="card_item_price"style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>Qty: {item.quantity || 1}</p>
                          </div>
                          <div className="col-4 ">
                            <p id="card_item_price" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>${item.price * item.quantity}</p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </Card>
                </Fragment>
              ))}
              {/* <hr /> */}
            </div>
            <Card className="col-11 mx-auto pt-2 my-4 " style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              <div id="order_summary">
                {/* <hr /> */}

                <p style={{ color: 'black', backgroundColor: 'transparent', fontSize: '19px', fontWeight:'500'}}>
                  Items total:{' '}
                  <span className="order-summary-values" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                    ${Number(cartItemsTotal).toFixed(2)}
                  </span>
                </p>
                {/* <hr /> */}
              </div>
            </Card>
          </Card>
        </>
      )}
    </>
  );
}
