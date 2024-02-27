// import React from 'react';

// const DeliveryInfo = () => {
//   return (
//     <div>
//       <div className="row wrapper">
//         <div className="col-10 col-lg-5">
//           <form className="shadow-lg">
//             <h1 className="mb-4">Delivery Address</h1>
//             <div className="form-group">
//               <label htmlFor="address_field">Address</label>
//               <input
//                 type="text"
//                 id="address_field"
//                 className="form-control"
//                 value=""
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="city_field">City</label>
//               <input
//                 type="text"
//                 id="city_field"
//                 className="form-control"
//                 value=""
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="phone_field">Phone No</label>
//               <input
//                 type="phone"
//                 id="phone_field"
//                 className="form-control"
//                 value=""
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="postal_code_field">Postal Code</label>
//               <input
//                 type="number"
//                 id="postal_code_field"
//                 className="form-control"
//                 value=""
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="country_field">Country</label>
//               <select
//                 id="country_field"
//                 className="form-control"
//                 value=""
//                 required
//               >
//                 <option>India</option>
//                 <option>USA</option>
//               </select>
//             </div>

//             <button
//               id="shipping_btn"
//               type="submit"
//               className="btn btn-block py-3"
//             >
//               CONTINUE
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryInfo;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryInfo = () => {
  // Initialize state for form input values
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use axios to make an API call and save data to the user database
    try {
      // Make an API call to save the data
      const response = await axios.post('/api/address/new', {
        address,
        city,
        phone,
        postalCode,
        country
      });

      // Handle the response, e.g., show a success message
      console.log('Data saved successfully:', response.data);

      // You can redirect the user to the next step or perform additional actions here
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  // Effect to update session storage whenever form values change
  useEffect(() => {
    // Create an object with form data
    const formData = {
      address,
      city,
      phone,
      postalCode,
      country
    };

    // Convert the object to a JSON string and save it to session storage
    localStorage.setItem('deliveryInfo', JSON.stringify(formData));
  }, [address, city, phone, postalCode, country]);

  return (
    <div>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4">Delivery Address</h1>

            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
