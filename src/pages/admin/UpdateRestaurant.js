/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';

const EditRestaurant = () => {
  const { id: restaurantId } = useParams();

  const [formData, setFormData] = useState({
    restaurantName: '',
    restaurantBranch: '',
    restaurantId: '',
    description: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    cuisineTypeCategory: '',
    openingHours: ''
  });

  useEffect(() => {
    // Fetch existing restaurant data using the ID
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`/api/restaurant/get/${restaurantId}`);
        const existingData = response.data.restaurant;

        setFormData({
          restaurantName: existingData.restaurantName,
          restaurantBranch: existingData.restaurantBranch,
          pincode: existingData.pincode,
          restaurantId: existingData.restaurantId,
          description: existingData.description,
          address: {
            line1: existingData.address.line1 || '',
            line2: existingData.address.line2 || '',
            city: existingData.address.city || '',
            state: existingData.address.state || '',
            postalCode: existingData.address.postalCode || '',
            country: existingData.address.country || ''
          },
          cuisineTypeCategory: existingData.cuisineTypeCategory,
          openingHours: existingData.openingHours
        });
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        // Handle error (e.g., show a toast)
      }
    };

    // Call the fetchRestaurantData function
    fetchRestaurantData();
  }, [restaurantId]);

  const handleChange = (e) => {
    if (e.target.name.startsWith('address.')) {
      // If the field belongs to the address, update it separately
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [e.target.name.slice(8)]: e.target.value
        }
      });
    } else {
      // Otherwise, update the form data normally
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/restaurant/edit/${restaurantId}`, formData);
      console.log('Restaurant updated successfully!');

      toast.success('Restaurant updated successfully!');
    } catch (error) {
      console.error('Error updating restaurant:', error);

      toast.error('Error updating restaurant. Please try again.');
    }
  };

  return (
    <div className="MenuHeaderMain">
    <div className="col-md-7 col-lg-5 container" style={{backgroundColor:'transparent',color:'white'}}>
      <h4 className="py-3">Edit Restaurant</h4>
      <form onSubmit={handleSubmit} className="address-container">
        <Card className="p-3"  style={{backgroundColor:'transparent',color:'white'}}>
          <div className="mb-4">
            <label>
              Restaurant Name:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Restaurant Branch:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="restaurantBranch"
              value={formData.restaurantBranch}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Restaurant Id:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="restaurantId"
              value={formData.restaurantId}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Description:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Address Line 1:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="address.line1"
              value={formData.address.line1}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Address Line 2:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="address.line2"
              value={formData.address.line2}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              City:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              State:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Postal Code:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Country:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Cuisine:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <select
              name="cuisineTypeCategory"
              value={formData.cuisineTypeCategory}
              onChange={handleChange}
              required
              className={`form-control `}
            >
              <option value="">Select</option>
              <option value="Italian">Italian</option>
              <option value="Asian">Asian</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Mexican">Mexican</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label>
              Opening Hours:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>
        </Card>
        <button type="submit" className="my-global-button my-4">
          Update Restaurant
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditRestaurant;
