import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    confirmEmail: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the axios call to your login API endpoint
      const response = await axios.post('/api/register', formData);

      // Handle success, for example, show a success message or redirect
      console.log('Register successful', response.data);
    } catch (error) {
      // Handle error
      console.error('error', error.response.data.message);
      // You can display an error message to the user or handle it as needed
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div>
          If you have an account? <Link to="/login">login</Link>
        </div>
        <div>
          <label htmlFor="name">First name:</label>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="lastName">Last name:</label>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              // eslint-disable-next-line prettier/prettier
        />
          </div>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
