/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './index.css';
// import { toast } from 'react-toastify';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import BillingAddress from './BillingAddress';

const DeliveryAddress = ({
  streetAddress,
  postalCode,
  city,
  state,
  country,
  textBox2,
  useCurrentLocation,
  handleButtonClick,
  handleStreetAddressChange,
  handleZipCodeChange,
  handleCityChange,
  handleStateChange,
  handleCountryChange,
  findMyCoordinates,
  handleUseCurrentLocationChange,
  userLocation,
  setToastShown,
  distanceResult,
  setBillingVerified,
  toastShown,
  handleText2
}) => {
  const [sameAsDelivery, setSameAsDelivery] = useState(false);
  const [billingStreetAddress, setBillingStreetAddress] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingCountry, setBillingCountry] = useState('US');
  const [billingCoordinates, setBillingCoordinates] = useState({
    latitude: null,
    longitude: null
  });

  const handleSameAsDeliveryChange = () => {
    setSameAsDelivery(!sameAsDelivery);

    if (!sameAsDelivery) {
      // If the user selects "Same as Delivery," auto-populate billing address
      setBillingStreetAddress(streetAddress);
      setBillingPostalCode(postalCode);
      setBillingCity(city);
      setBillingState(state);
      setBillingCountry(country);
    } else {
      // If the user unselects "Same as Delivery," clear the billing address
      setBillingStreetAddress('');
      setBillingPostalCode('');
      setBillingCity('');
      setBillingState('');
      setBillingCountry('');
      localStorage.removeItem('billingAddress');
    }
  };
  const handleBillingAddressChange = async () => {
    const fullBillingAddress = `${billingStreetAddress}, ${billingCity}, ${billingState}, ${billingPostalCode}, ${billingCountry}`;

    const geocodeBillingAddressToCoordinates = async (address) => {
      try {
        const geoapifyApiKey = '31bc2a8978644190beec0a6f143266d3';
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${geoapifyApiKey}`
        );

        if (!response.data.features || response.data.features.length === 0) {
          throw new Error(
            'Coordinates not found for the given billing address'
          );
        }

        const firstFeature = response.data.features[0];
        const { lat, lon } = firstFeature.properties;

        localStorage.setItem('billingLat', JSON.stringify(lat));
        localStorage.setItem('billingLng', JSON.stringify(lon));

        return { latitude: lat, longitude: lon };
      } catch (error) {
        // console.error('Error geocoding billing address:', error.message);
        toast.error('Error geocoding billing address');
        throw error;
      }
    };

    try {
      const billingCoordinates = await geocodeBillingAddressToCoordinates(
        fullBillingAddress
      );
      setBillingCoordinates(billingCoordinates);
      setBillingVerified(true);
    } catch (error) {
      // console.error('Error getting billing coordinates:', error.message);
      toast.error('Error getting billing coordinates');
      // Handle errors for billing address coordinates
    }
  };
  useEffect(() => {
    if (!toastShown && useCurrentLocation) {
      findMyCoordinates();
      setToastShown(true);
    }
  }, [toastShown, useCurrentLocation]);
  useEffect(() => {
    // This useEffect will run whenever any of the billing address state values change
    // and it will update localStorage accordingly.
    localStorage.setItem(
      'billingAddress',
      JSON.stringify({
        streetAddress: billingStreetAddress,
        postalCode: billingPostalCode,
        city: billingCity,
        state: billingState,
        country: billingCountry
      })
    );
  }, [
    billingStreetAddress,
    billingPostalCode,
    billingCity,
    billingState,
    billingCountry
  ]);
  useEffect(() => {
    // console.log('Billing Address Props:', {
    //   streetAddress,
    //   postalCode,
    //   city,
    //   state,
    //   country
    // });
    localStorage.setItem(
      'deliveryAddress',
      JSON.stringify({
        streetAddress,
        postalCode,
        city,
        state,
        country
      })
    );
  }, [streetAddress, postalCode, city, state, country]);
  useEffect(() => {
    // console.log('sameAsDelivery changed:', sameAsDelivery);
    if (sameAsDelivery) {
      if (!useCurrentLocation) {
        setBillingStreetAddress(streetAddress);
        setBillingPostalCode(postalCode);
        setBillingCity(city);
        setBillingState(state);
        setBillingCountry(country);
      } else {
        // If not manually entered, use the current location address
        setBillingStreetAddress(
          userLocation.features[0].properties.address_line1
        );
        setBillingPostalCode(userLocation.features[0].properties.postcode);
        setBillingCity(userLocation.features[0].properties.city);
        setBillingState(userLocation.features[0].properties.state);
        setBillingCountry(userLocation.features[0].properties.country);
      }
    }
  }, [sameAsDelivery, streetAddress, postalCode, city, state, country]);

  return (
    <Card className="my-3 p-3" id='CardBackIMg'>
      <h4>Delivery Address</h4>
      <div className="location-options mt-2" >
        <label className="radio-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
          <input
           style={{color:'black',backgroundColor:'transparent'}}
            type="radio"
            name="locationOption"
            checked={useCurrentLocation}
            onChange={handleUseCurrentLocationChange}
          />
          <span className="radio-custom" />
          Use current location
        </label>
        <label className="radio-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
          <input
            type="radio"
            name="locationOption"
            style={{color:'black',backgroundColor:'transparent'}}
            checked={!useCurrentLocation}
            onChange={handleUseCurrentLocationChange}
          />
          <span className="radio-custom" />
          Enter address manually
        </label>
      </div>

      {useCurrentLocation ? (
        <div >
          <p>Using current location</p>
          {userLocation ? (
            <div>
              <p>
                Address: {userLocation.features[0].properties.address_line1},{' '}
                {userLocation.features[0].properties.postcode},{' '}
                {userLocation.features[0].properties.state_district},{' '}
                {userLocation.features[0].properties.state},{' '}
                {userLocation.features[0].properties.country}
              </p>
              <Button
                className="mb-2 my-global-button"
                onClick={handleButtonClick}
              >
                Check delivery{' '}
              </Button>{' '}
              <span className="text-danger">*</span>
              {distanceResult !== null && (
                <>
                  {distanceResult < 500 ? (
                    <div>
                      <p  style={{color:'black',backgroundColor:'transparent'}}>Order available for this location</p>
                    </div>
                  ) : (
                    <div>
                      <p  style={{color:'black',backgroundColor:'transparent'}}>Order not available for this location</p>
                    </div>
                  )}
                </>
              )}
              <div className="mb-3">
                <label htmlFor="deliveryInstructions" className="form-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  Delivery Instruction
                </label>
              </div>
              <div className="mb-3">
                <textarea
                 style={{color:'black',backgroundColor:'transparent'}}
                  type="text"
                  className={`form-control `}
                  name="deliveryInstructions"
                  value={textBox2}
                  onChange={handleText2}
                  placeholder="Delivery Instructions"
                />
              </div>
              <div className="address-options mt-2">
                <label className="radio-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <input 
                   style={{color:'black',backgroundColor:'transparent'}}
                    type="radio"
                    name="sameAsDeliveryOption"
                    checked={sameAsDelivery}
                    onChange={handleSameAsDeliveryChange}
                  />
                  <span className="radio-custom" />
                  Use Delivery address
                </label>
                <label className="radio-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
                  <input
                   style={{color:'black',backgroundColor:'transparent'}}
                    type="radio"
                    name="sameAsDeliveryOption"
                    checked={!sameAsDelivery}
                    onChange={handleSameAsDeliveryChange}
                  />
                  <span className="radio-custom" />
                  Enter different address
                </label>
              </div>
              <BillingAddress
                sameAsDelivery={sameAsDelivery}
                streetAddress={billingStreetAddress}
                postalCode={billingPostalCode}
                city={billingCity}
                state={billingState}
                country={billingCountry}
                handleStreetAddressChange={(e) =>
                  setBillingStreetAddress(e.target.value)
                }
                handleZipCodeChange={(e) =>
                  setBillingPostalCode(e.target.value)
                }
                handleCityChange={(e) => setBillingCity(e.target.value)}
                handleStateChange={(e) => setBillingState(e.target.value)}
                handleCountryChange={(e) => setBillingCountry(e.target.value)}
              />
              <Button
                className="mb-2 my-global-button"
                onClick={handleBillingAddressChange}
              >
                Check Address
              </Button>
            </div>
          ) : (
            <p>Loading location...</p>
          )}
        </div>
      ) : (
        <div className="address-container">
          <div className="mb-3">
            <label htmlFor="streetAddress" className="form-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}} >
              Street Address{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
            style={{color:'black',backgroundColor:'transparent'}}
              type="text"
              className={`form-control `}
              id="streetAddress"
              value={streetAddress}
              onChange={handleStreetAddressChange}
              required
              placeholder="Field is required"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="zipCode" className="form-label" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              ZIP Code{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
            style={{color:'black',backgroundColor:'transparent'}}
              type="text"
              className={`form-control `}
              id="zipCode"
              value={postalCode}
              onChange={handleZipCodeChange}
              required
              placeholder="Field is required"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              City{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
            style={{color:'black',backgroundColor:'transparent'}}
              type="text"
              className={`form-control `}
              id="city"
              value={city}
              onChange={handleCityChange}
              required
              placeholder="Field is required"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              State{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
            style={{color:'black',backgroundColor:'transparent'}}
              type="text"
              className={`form-control `}
              id="state"
              value={state}
              onChange={handleStateChange}
              required
              placeholder="Field is required"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}> 
              Country{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
            style={{color:'black',backgroundColor:'transparent'}}
              type="text"
              className={`form-control `}
              id="country"
              value={country}
              onChange={handleCountryChange}
              required
              // disabled
              placeholder="Field is required"
            />
          </div>
          <Button
            className="mb-2 my-global-button"
            onClick={handleButtonClick}
            // disabled={isButtonClicked}
          >
            Check delivery{' '}
          </Button>{' '}
          <span className="text-danger">*</span>
          {distanceResult !== null && (
            <>
              {distanceResult < 500 ? (
                <div>
                  <p  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>Order available for this location</p>
                </div>
              ) : (
                <div>
                  <p  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>Order not available for this location</p>
                </div>
              )}
            </>
          )}
          <label htmlFor="deliveryInstructions" className="form-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
            Delivery Instruction
          </label>
          <div className="mb-3">
            <textarea
            style={{color:'black',backgroundColor:'transparent'}}
              type="text"
              className={`form-control `}
              name="deliveryInstructions"
              value={textBox2}
              onChange={handleText2}
              placeholder="Delivery Instructions"
            />
          </div>
          <div className="address-options mt-2">
            <label className="radio-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}} >
              <input
                type="radio"
                name="sameAsDeliveryOption"
                checked={sameAsDelivery}
                onChange={handleSameAsDeliveryChange}
              />
              <span className="radio-custom" />
              Use Delivery address
            </label>
            <label className="radio-label"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              <input
                type="radio"
                name="sameAsDeliveryOption"
                checked={!sameAsDelivery}
                onChange={handleSameAsDeliveryChange}
              />
              <span className="radio-custom" />
              Enter different address
            </label>
          </div>
          <BillingAddress
            sameAsDelivery={sameAsDelivery}
            streetAddress={billingStreetAddress}
            postalCode={billingPostalCode}
            city={billingCity}
            state={billingState}
            country={billingCountry}
            handleStreetAddressChange={(e) =>
              setBillingStreetAddress(e.target.value)
            }
            handleZipCodeChange={(e) => setBillingPostalCode(e.target.value)}
            handleCityChange={(e) => setBillingCity(e.target.value)}
            handleStateChange={(e) => setBillingState(e.target.value)}
            handleCountryChange={(e) => setBillingCountry(e.target.value)}
          />
          <Button
            className="my-global-button mb-2"
            onClick={handleBillingAddressChange}
          >
            Check Address
          </Button>
        </div>
      )}
    </Card>
  );
};

export default DeliveryAddress;
