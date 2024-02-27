/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurant, col }) {
  if (!restaurant || !restaurant.location) {
    return null;
  }
  const latitude = restaurant.location.coordinates
    ? restaurant.location.coordinates[1]
    : null;
  const longitude = restaurant.location.coordinates
    ? restaurant.location.coordinates[0]
    : null;

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        {restaurant.images && restaurant.images.length > 0 && (
          <img
            className="card-img-top mx-auto"
            src={restaurant.images[0].images}
            alt={restaurant.name}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{restaurant.name}</h5>
          <p className="card-text">Restaurant ID: {restaurant.restaurantId}</p>
          <p className="card-text">Description: {restaurant.description}</p>
          <p className="card-text">
            Dietary Preference: {restaurant.dietaryPreferenceCategory}
          </p>
          <p className="card-text">
            Cuisine Type: {restaurant.cuisineTypeCategory}
          </p>
          <p className="card-text">Opening Hours: {restaurant.openingHours}</p>
          {latitude && longitude && (
            <p className="card-text">
              Location: Latitude {latitude}, Longitude {longitude}
            </p>
          )}
          {/* Link to the restaurant details page */}
          <Link to="/" className="btn btn-block" id="view_btn">
            View Menus
          </Link>
        </div>
      </div>
    </div>
  );
}
