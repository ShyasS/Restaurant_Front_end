/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
import './UserOrderList.css';
const OrdersTable = () => {
  const navigate = useNavigate();
  const [currentOrders, setCurrentOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('user'));
  const user = userId._id;

  const headers = ['Order ID', 'Restaurant Branch', 'Status'];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/myorders?userId=${user}`, {
          withCredentials: true
        });

        const { order } = response.data;
        const delivered = order.filter(
          (order) => order.orderStatus === 'Delivered'
        );
        const current = order.filter(
          (order) => order.orderStatus !== 'Delivered'
        );

        setDeliveredOrders(delivered);
        setCurrentOrders(current);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  function handleView(_id) {
    navigate(`/order/${_id}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const noCurrentOrders = currentOrders.length === 0;
  const noDeliveredOrders = deliveredOrders.length === 0;

  if (noCurrentOrders && noDeliveredOrders) {
    // Optionally, you can render a message or hide the component entirely
    return <div>No orders available.</div>;
  }

  return (
    <div  id="ProfileMainImg">
    <div className="container col-lg-8">
      <div className="row">
        <div className="col p-4 my-2" >
          {!noCurrentOrders && (
            <div >
              <h3 style={{color:'white',backgroundColor:'transparent',fontWeight:'550'}}>Current Orders</h3>
              <ReusableTable
                data={currentOrders}
                headers={headers}
                onViewDetails={handleView}
              />
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col p-4 mb-2">
          {!noDeliveredOrders && (
            <>
              <h3>Delivered Orders</h3>
              <ReusableTable
                data={deliveredOrders}
                headers={headers}
                onViewDetails={handleView}
              />
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrdersTable;
