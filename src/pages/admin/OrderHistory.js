/* eslint-disable import/order */
/* eslint-disable no-new */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Chart from 'chart.js/auto';
// import 'chart.js/dist/chart.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import ReusableTable from '../../components/ReusableTable';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPaginate from 'react-paginate';
// import SearchBar from '../../components/Search';
// import Sidebar from './Sidebar';

const OrdersHistory = () => {
  const defaultEndDate = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 6);
  const user = JSON.parse(localStorage.getItem('user'));
  const { restaurantId } = user;
  const { role } = user;
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 3;
  const [restaurant, setRestaurant] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(restaurantId || 'all');
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [orderType, setOrderType] = useState('Pickup');
  const [nonActiveOrders, setNonActiveOrders] = useState([]);
  const navigate = useNavigate();
  // const chartRef = useRef(null);
  const headers = [
    'Sl No',
    'Customer',
    'Email Address',
    'Phone No',
    'Restaurant Branch',
    'Order Date'
  ];
  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };
  const handleOrderTypeChange = (selectedOrderType) => {
    setOrderType(selectedOrderType);
  };
  const formatAddress = (address) => {
    return `${address.line1}, ${address.city}, ${address.state} - ${address.postalCode}, ${address.country}`;
  };

  const fetchOrders = async () => {
    try {
      let response;

      if (selectedBranch === 'all') {
        response = await axios.get(
          `/api/admin/orders?startDate=${startDate}&endDate=${endDate}&orderType=${orderType}&page=${
            page + 1
          }&pageSize=${pageSize}`
        );
      } else {
        const restaurantId = { restaurantId: selectedBranch };
        response = await axios.post(
          `/api/admin/orderHistory-nonActive?startDate=${startDate}&endDate=${endDate}&orderType=${orderType}&page=${
            page + 1
          }&pageSize=${pageSize}`,
          restaurantId
        );
      }
      const { data } = response;
      const {
        nonActiveOrders: extractedNonActiveOrders,
        totalOrders,
        totalPrice
      } = data;
      setNonActiveOrders(extractedNonActiveOrders);
      setTotalOrders(totalOrders);
      setTotalPrice(totalPrice);

      // console.log('Total Orders:', totalOrders);
      // console.log('Non-Active Orders:', extractedNonActiveOrders);
      // const orders = Array.isArray(response.data)
      //   ? response.data
      //   : response.data.orders;

      setOrders(orders || []);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / pageSize));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const onViewDetails = (id) => {
    navigate(`/order/${id}`);
  };
  // const drawPieChart = () => {
  //   // Destroy the previous chart if it exists
  //   if (chartRef.current) {
  //     Chart.getChart(chartRef.current)?.destroy();
  //   }

  //   // Create a new chart
  //   const chartCanvas = chartRef.current.getContext('2d');

  //   // Prepare data for the pie chart
  //   const pieData = {
  //     labels: [],
  //     datasets: []
  //   };

  //   // Iterate over nonActiveOrders to categorize data based on restaurantId
  //   const categories = {};
  //   nonActiveOrders.forEach((order) => {
  //     const { restaurantId, totalPrice } = order;

  //     if (!categories[restaurantId]) {
  //       categories[restaurantId] = {
  //         totalOrders: 0,
  //         totalPrice: 0
  //       };
  //     }

  //     categories[restaurantId].totalOrders += 1;
  //     categories[restaurantId].totalPrice += totalPrice;
  //   });

  //   // Fill in the pieData based on the categorized data
  //   Object.keys(categories).forEach((restaurantId) => {
  //     const { totalOrders, totalPrice } = categories[restaurantId];

  //     pieData.labels.push(`Restaurant ${restaurantId}`);
  //     pieData.datasets.push({
  //       data: [totalOrders, totalPrice],
  //       backgroundColor: ['#FF6384', '#36A2EB'] // You can customize colors
  //     });
  //   });

  //   new Chart(chartCanvas, {
  //     type: 'pie',
  //     data: pieData
  //   });
  // };
  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected);
  };
  useEffect(() => {
    fetchOrders();
    // drawPieChart();
  }, [
    selectedBranch,
    orderType,
    startDate,
    endDate,
    totalOrders,
    totalPrice,
    page,
    pageSize
  ]);
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
    <div className="MenuHeaderMain">
      <div className='container-fluid'>
      <div className="row">
        <h4 className="mt-4 mb-4 text-white" style={{ fontWeight: 'bold' }}>
          ORDER HISTORY
        </h4>
        <div
          className="col-6 mt-2"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div
            className="form-group"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <label>
              <span className='text-white'>Start Date:</span>{' '}
              <DatePicker
                className="form-control mb-3"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            </label>
            <div>
              <label className="mx-1">
              <span className='text-white'>End Date:</span>{' '}
                <DatePicker
                  className="form-control mb-3"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </label>
            </div>
          </div>
          {/* Remove the Submit button as it's no longer needed */}
        </div>
        <div
          className="col-6"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div>
            <h5 className="my-2 text-white">Select Order Type</h5>
            <label>
              <input
                type="radio"
                value="Pickup"
                checked={orderType === 'Pickup'}
                onChange={() => handleOrderTypeChange('Pickup')}
              />
                 <span className='text-white'>Pickup</span>
            </label>
            <label>
              <input
                type="radio"
                value="Delivery"
                checked={orderType === 'Delivery'}
                onChange={() => handleOrderTypeChange('Delivery')}
              />
              <span className='text-white'>Delivery</span>
            </label>
          </div>
          <div className="col-3 mt-2">
            {/* <canvas className="col-6" ref={chartRef} width="200" height="200" /> */}
            <h5 className="col-12 text-white">Select a branch</h5>
            {role !== 'admin' && (
              <select
                className="form-control mb-3"
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
                {/* <option value="1000010">Branch-A</option>
                  <option value="1000011">Branch-B</option>
                  <option value="1000012">Branch-C</option> */}
              </select>
            )}
          </div>
          <h6 className="col-3 text-white">Total orders: {totalOrders}</h6>
          {/* <h6 className="col-3">Total price: {totalPrice}</h6> */}
        </div>
        <ReusableTable
          headers={headers}
          data={nonActiveOrders}
          onViewDetails={onViewDetails}
        />
        <ReactPaginate
          className="pagination"
          pageCount={totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page"
          previousLabel={<span className="custom-label">previous</span>}
          nextLabel={<span className="custom-label">next</span>}
          breakLabel={<span className="custom-label">...</span>}
          pageLinkClassName="page-link"
          breakLinkClassName="break-link"
        />
      </div>
    </div>
    </div>
  );
};

export default OrdersHistory;
