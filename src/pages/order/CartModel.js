/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faMinus, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const CartModel = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = () => {
    try {
      const storedCartItems =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };

  const handleUpdateQuantity = (itemId, itemQuantity) => {
    try {
      const updatedCartItems = cartItems.map((cartItem) => {
        return {
          ...cartItem,
          items: cartItem.items.map((item) => {
            if (item.item._id === itemId) {
              return {
                ...item,
                itemQuantity: Number(itemQuantity)
              };
            }
            return item;
          })
        };
      });

      setCartItems(updatedCartItems);

      // Update session storage with the updated cart items
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const handleDeleteItem = (itemId) => {
    try {
      const updatedCartItems = cartItems.map((cartItem) => ({
        ...cartItem,
        items: cartItem.items.filter((item) => item.item._id !== itemId)
      }));

      setCartItems(updatedCartItems);

      // Update session storage with the updated cart items
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCartItems();
  }, []);

  const totalAmount = cartItems.reduce((total, cartItem) => {
    const itemTotalAmount =
      cartItem.items &&
      Array.isArray(cartItem.items) &&
      cartItem.items.length > 0 &&
      cartItem.items.reduce((itemTotal, item) => {
        return itemTotal + item.price * item.itemQuantity;
      }, 0);

    return total + (itemTotalAmount || 0);
  }, 0);

  return (
    <div className="container container-fluid">
      <h2>
        Your Cart:{' '}
        <b>
          {cartItems.reduce((total, cartItem) => {
            return total + (cartItem.items ? cartItem.items.length : 0);
          }, 0)}{' '}
          items
        </b>
      </h2>

      <div className="row">
        {Array.isArray(cartItems) &&
          cartItems.map((cartItem) => (
            <Card key={cartItem._id}>
              {cartItem.items &&
                Array.isArray(cartItem.items) &&
                cartItem.items.map((item) => (
                  <React.Fragment key={item.item._id}>
                    <Row>
                      <Col>
                        <Card.Body>
                          <Row>
                            <img
                              className="cartImage"
                              src={
                                item.image || 'https://via.placeholder.com/150'
                              }
                            />
                          </Row>
                          <Row className="d-flex align-items-center">
                            <div className="d-flex">
                              <div
                                className="icon-container mr-3"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.item._id,
                                    item.itemQuantity - 1
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </div>
                              <div
                                className="icon-container"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.item._id,
                                    item.itemQuantity + 1
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </div>
                            </div>
                          </Row>
                        </Card.Body>
                      </Col>
                      <Col>
                        <Card.Body>
                          <h6>
                            <Link to="/">{item.item.name}</Link>
                          </h6>
                          <Card.Text>
                            <b>$</b> {item.price.toFixed(2)}
                          </Card.Text>
                          <Card.Text>
                            <b>Qty:</b> {item.itemQuantity}
                          </Card.Text>
                        </Card.Body>
                      </Col>
                      <Col>
                        <div
                          className="mr-3"
                          style={{ marginTop: '10px' }}
                          onClick={() => handleDeleteItem(item.item._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </Col>
                    </Row>
                    <hr />
                  </React.Fragment>
                ))}
              <hr />
            </Card>
          ))}
      </div>
      <Card className="mt-4">
        <Card.Body>
          <Card.Text>Total: ${totalAmount}</Card.Text>
          <Link to="/shippingInfo">
            <Button
              onClick={handleCheckout}
              className="checkout"
              style={{ backgroundColor: '#ffa500' }}
            >
              Continue to checkout
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartModel;
