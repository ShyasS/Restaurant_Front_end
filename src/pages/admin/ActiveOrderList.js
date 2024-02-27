/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// export default OrdersTable;
/* eslint-disable no-plusplus */
/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
import './index.css';
import { Button } from 'react-bootstrap';
// import Sidebar from './Sidebar';

const OrdersTable = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { restaurantId } = user;
  const { role } = user;
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 30;
  const [restaurant, setRestaurant] = useState([]);
  const [orderType, setSelectedOrderType] = useState('all');
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(restaurantId || 'all');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${month}/${day}`;
  });
  const generateDates = (numDays) => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < numDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      dates.push(formattedDate);
    }

    return dates;
  };

  const availableDates = generateDates(7);
  const headers = [
    'Sl No',
    'Order ID',
    'Customer',
    'Restaurant Branch',
    'Pickup/Delivery Time',
    'Status'
  ];
  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };
  const handleOrderTypeChange = (orderType) => {
    setSelectedOrderType(orderType);
  };
  const handleClear = () => {
    setSelectedOrderType('all');
  };
  const formatAddress = (address) => {
    return `${address.line1}, ${address.city}, ${address.state} - ${address.postalCode}, ${address.country}`;
  };
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    // console.log(`selected date - ${selectedDate}`);
  };

  const fetchOrders = async () => {
    try {
      let response;

      if (selectedBranch === 'all') {
        response = await axios.get(
          `/api/admin/orders/active?restaurantId=${selectedBranch}&selectedDate=${selectedDate}&page=${
            page + 1
          }&pageSize=${pageSize}`
        );
      } else {
        // const requestData = {
        //   restaurantId: selectedBranch
        // };
        response = await axios.get(
          `/api/admin/order/active?restaurantId=${selectedBranch}&selectedDate=${selectedDate}&page=${
            page + 1
          }&pageSize=${pageSize}`
          // requestData
        );
      }

      let orders = Array.isArray(response.data)
        ? response.data
        : response.data.orders;

      // Filter orders based on orderType
      if (orderType !== 'all') {
        orders = orders.filter((order) => order.orderType === orderType);
      }
      orders.sort((a, b) => {
        const dateA = new Date(`1970-01-01T${a.selectedTimeSlot}:00`);
        const dateB = new Date(`1970-01-01T${b.selectedTimeSlot}:00`);

        return dateA - dateB;
      });

      setOrders(orders || []);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / pageSize));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected);
  };
  const handleEdit = (orderId) => {
    navigate(`/admin/order/${orderId}`);
    // console.log(`Edit order with ID ${orderId}`);
  };
  const handleUpdateOrder = async (orderId) => {
    const response = await axios.put(`/api/admin/order/${orderId}`, {
      orderStatus: selectedOrderStatus
    });

    if (response.status === 200) {
      // console.log('Order status updated successfully');
      // Optionally, you can refetch the order details to reflect the updated status
      fetchOrders(orderId);
    } else {
      console.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedBranch, orderType, selectedDate, page, pageSize]);
  useEffect(() => {
    // Fetch time slots from the API
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurant/get');
        const restaurant = response.data.data;
        // const timeSlotsData = Array.isArray(response.data) ? response.data : [];
        // console.log(restaurant);
        setRestaurant(restaurant);
      } catch (error) {
        console.error('Error fetching time slots:', error.message);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="ActiveOrders" >
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-12 mx-auto'>
      <h4 className=" py-4 text-white" style={{ fontWeight: 'bold' }}>
        CURRENT ORDERS
      </h4>
      <div
        className="row"
        // style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div
          className="col-xs-6 col-sm-6 col-md-8 col-lg-6"
          // style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div className="form-group">
            {role !== 'admin' && (
              <div className='col-lg-6 col-md-7 col-xs-6 col-sm-6' >
                <h5 className="my-4 mt-3 text-white">Select Branch</h5>
                <select
                  className=" form-select  form-select-sm"
                  name="status"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                >
                  <option value="all">All</option>
                  {restaurant &&
                    restaurant.map((restaurant) => (
                      <option
                        key={restaurant._id}
                        value={restaurant.restaurantId}
                      >
                       
                        {restaurant.restaurantBranch} -{' '}
                        {formatAddress(restaurant.address)}
                      
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
          </div>
          <>
            <div className='col-lg-6'>
              <h5 className="mt-3 text-white">Select order type</h5>
              <label>
                <input
                  id="pickup"
                  type="radio"
                  name="orderType"
                  value="Pickup"
                  checked={orderType === 'Pickup'}
                  onChange={() => handleOrderTypeChange('Pickup')}
                />{' '}
              <span className='text-white'>Pickup</span>  
              </label>{' '}
              <label>
                <input
                  id="delivery"
                  type="radio"
                  name="orderType"
                  value="Delivery"
                  checked={orderType === 'Delivery'}
                  onChange={() => handleOrderTypeChange('Delivery')}
                />{' '}
                   <span className='text-white'>Delivery</span> 
              </label>{' '}
              <button
                className="my-global-button btn mb-2"
                onClick={handleClear}
              >
                clear
              </button>
            </div>

 {/* To change fields */}


            <div className='col-lg-6 col-xs-12 col-sm-12 col-md-8'>
              <h5 className='text-white'>Update order</h5>
              <select
                className="form-control mb-2"
                value={selectedOrderStatus}
                required
                onChange={(e) => setSelectedOrderStatus(e.target.value)}
              >
                <option>Select Order Status</option>
                <option value="Preparing">Preparing</option>
                <option value="Out For Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </>
   
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mt-4">
          <div className="date-buttons mb-4">
            {availableDates.map((date) => (
              <Button
                key={date}
                className="my-global-button"
                value={date}
                onClick={() => handleDateSelection(date)}
                style={{
                  backgroundColor: selectedDate === date ? 'danger' : 'inherit',
                  border:
                    selectedDate === date ? '2px solid black' : '1px solid #ccc'
                  // For example, padding, border, etc.
                }}
              >
                {date}
              </Button>
            ))}
          </div>
        </div>
        <ReusableTable
          data={orders}
          headers={headers}
          update={handleUpdateOrder}
          onEdit={handleEdit}
        />
        <ReactPaginate
          className="pagination bg-transparent"
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
      </div>
    </div>
    </div>
        </div>
  );
};

export default OrdersTable;
