/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-useless-path-segments
import { toast } from 'react-toastify';
import RestaurantCard from '../restaurant/Restaurant';
import ProductModal from './HomeModel';
// eslint-disable-next-line import/no-useless-path-segments
import RestaurantSelection from '../../pages/restaurant/RestaurantSelection';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/restaurant/get'
      );
      const { data } = response;

      if (Array.isArray(data.data)) {
        setRestaurants(data.data);
      } else {
        setError('Invalid data format');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 Bad Request error
        // console.error('Bad Request:', error.response.data);
        // Optionally, you can display a toast message here
        toast.error(`Bad Request: ${error.response.data}`, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      } else {
        setError('Error fetching data');
        // Display a toast message or log the error to the console
        // console.error('Error fetching data:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER
    });
    return null; // or handle the error in a way that makes sense for your application
  }
  return (
    <div>
      <ProductModal />
      <div className="">
        <RestaurantSelection />
      </div>
    </div>
  );
};

export default HomePage;

/* <div className="row">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              col={3}
            />
          ))
        ) : (
          <p>No restaurants available.</p>
        )}
      </div> */
