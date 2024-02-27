/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App1 = () => {
  const [nonActiveOrders, setNonActiveOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNonActiveOrders = async () => {
    try {
      const response = await axios.post(
        `/api/nonActiveOrdersByBranch?page=${currentPage}&sortDirection=${sortDirection}`
      );
      setNonActiveOrders(response.data.nonActiveOrders);
      setTotalOrders(response.data.totalOrders);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error('Error fetching non-active orders:', error);
    }
  };

  useEffect(() => {
    fetchNonActiveOrders();
  }, [currentPage, sortDirection]);

  const handleSortToggle = () => {
    setSortDirection((prevDirection) =>
      prevDirection === 'asc' ? 'desc' : 'asc'
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={handleSortToggle}>Name</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {nonActiveOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              {/* Add other table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Total Orders: {totalOrders}</p>
        <p>Total Price: ${totalPrice}</p>
      </div>

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={nonActiveOrders.length < 10}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App1;
