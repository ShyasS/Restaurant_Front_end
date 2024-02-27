/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Fragment } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

const CartSummary = ({
  branch,
  address,
  date,
  cartItems,
  handleAdd,
  handleMinus,
  handleDelete,
  checkoutHandler,
  handleViewDetails,
  handleCloseModal,
  showModal,
  selectedMenuItem
}) => {
  const isCartEmpty = cartItems.length === 0;
  const time = JSON.parse(localStorage.getItem('selectedTimeSlot'));
  return (
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
          <div className="delivery-info">
            <b>Time:</b> {time}
          </div>
        </Card.Body>
      </Card>
      {isCartEmpty ? (
        <Card className="mt-4">
          <h4 className="my-4">Your cart is empty.</h4>
        </Card>
      ) : (
        <Card className="mt-4">
          <div className="row d-flex justify-content-between">
            <div>
              <h4 className="mt-4">Cart items</h4>
              {cartItems.map((item) => (
                <Fragment key={item._id}>
                  <hr />
                  <div className="row cart-item">
                    <div className="col-7">
                      <img
                        className="cartImage col-3"
                        src={
                          item.images[0] === undefined
                            ? 'https://via.placeholder.com/20'
                            : item.images[0].image
                        }
                        alt={item.name}
                      />
                      <span
                        className="pointer"
                        onClick={() => handleViewDetails(item)}
                      >
                        {item.name}
                      </span>
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
                  <Button
                    className="my-global-button"
                    variant="secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="col-12">
              <div id="order_summary">
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
                  className="btn my-global-button btn-block mb-3"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </aside>
  );
};

export default CartSummary;
