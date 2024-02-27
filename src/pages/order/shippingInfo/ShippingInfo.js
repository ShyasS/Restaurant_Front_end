// export default ShippingInfo1;
/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonalDetails from './PersonalDetails';
import OrderDetails from './OrderDetails';
import DeliveryAddress from './DeliveryAddress';
import BillingAddress from './BillingAddress';
// import '../../checkout/CheckoutForm.css';
import { toast } from 'react-toastify';
import './ShippingInfo.css';

const   ShippingInfo1 = () => {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem('isloggedIn'));
  const user = JSON.parse(localStorage.getItem('user'));
  const [enteredOtp, setOtp] = useState('');
  const [orderType, setOrderType] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('US');
  const [state, setState] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [textBox1, setTextBox1] = useState('');
  const [textBox2, setTextBox2] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timeVerified, setTimeVerified] = useState(false);
  const [name, setFirstName] = useState(isLoggedIn ? user.name : '');
  const [lastName, setLastName] = useState(isLoggedIn ? user.lastName : '');
  const [email, setEmail] = useState(isLoggedIn ? user.email : '');
  const [deliveryVerified, setDeliveryVerified] = useState(false);
  const [billingVerified, setBillingVerified] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [distanceResult, setDistanceResult] = useState(null);
  const [toastShown, setToastShown] = useState(false);
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null
  });
  const [billingCoordinates, setBillingCoordinates] = useState({
    latitude: null,
    longitude: null
  });
  const [userLocation, setUserLocation] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(
    isLoggedIn ? user.phone : ''
  );
  const [errors, setErrors] = useState({});
  const lat = JSON.parse(localStorage.getItem('lat'));
  const lng = JSON.parse(localStorage.getItem('lng'));
  const [time, setTime] = useState(null);

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    // console.log(time);
  };

  const handleUseCurrentLocationChange = () => {
    setUseCurrentLocation(!useCurrentLocation);
    // setUserLocation(false);
    setDeliveryVerified(false);
    setBillingVerified(false);
    setDistanceResult(null);
  };

  const convertTo24HourFormat = (time12hr) => {
    if (!time12hr) {
      return '';
    }

    const [startTime, endTime] = time12hr.split(' - ');

    const convertSingleTimeTo24Hour = (singleTime) => {
      const [time, period] = singleTime.split(' ');

      if (!time || !period) {
        return '';
      }

      const [hours, minutes] = time.split(':');
      let hours24 = parseInt(hours, 10);

      if (Number.isNaN(hours24)) {
        return '';
      }

      if (period.toUpperCase() === 'PM' && hours24 !== 12) {
        hours24 += 12;
      }

      if (period.toUpperCase() === 'AM' && hours24 === 12) {
        hours24 = 0;
      }

      const formattedHours = hours24.toString().padStart(2, '0');
      const formattedMinutes = minutes.padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}`;
    };

    const convertedStartTime = convertSingleTimeTo24Hour(startTime);
    const convertedEndTime = convertSingleTimeTo24Hour(endTime);

    return `${convertedStartTime} - ${convertedEndTime}`;
  };

  const isTimeWithinSlot = () => {
    const convertedTime = convertTo24HourFormat(selectedTimeSlot);

    if (!convertedTime) {
      toast.error('Invalid time slot format', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return false;
    }

    const [startTime, endTime] = convertedTime.split(' - ');
    const selectedHour = parseInt(time.split(':')[0], 10);
    const selectedMin = parseInt(time.split(':')[1], 10);

    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');

    const isValid =
      selectedHour > parseInt(startHour, 10) ||
      (selectedHour === parseInt(startHour, 10) &&
        (selectedMin > parseInt(startMinute, 10) ||
          (selectedMin === parseInt(startMinute, 10) &&
            (selectedHour < parseInt(endHour, 10) ||
              (selectedHour === parseInt(endHour, 10) &&
                selectedMin < parseInt(endMinute, 10))))));
    if (isValid) {
      const formattedSelectedMin = selectedMin.toString().padStart(2, '0');
      setTimeVerified(true);
      toast.info('Time slot verified', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      localStorage.setItem(
        'time',
        JSON.stringify(`${selectedHour}:${formattedSelectedMin}`)
      );
    }

    if (!isValid) {
      toast.error('Selected time is not within the time slot', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      setTime(null);
    }

    return isValid;
  };

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};

    // Check if required fields are empty
    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    }

    if (!mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    }

    // Add more validation for other fields as needed

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle user name change
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  // Function to handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTimeSlotChange = (e) => {
    const selectedSlot = e.target.value;
    setSelectedTimeSlot(selectedSlot);
    localStorage.setItem('selectedTimeSlot', JSON.stringify(selectedSlot));
  };

  // Function to handle mobile number change
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleText1 = (e) => {
    const orderNotes = e.target.value;
    setTextBox1(orderNotes);
    localStorage.setItem('orderNotes', JSON.stringify(orderNotes));
  };
  const handleText2 = (e) => {
    const deliveryInstruction = e.target.value;
    setTextBox2(deliveryInstruction);
    localStorage.setItem(
      'deliveryInstruction',
      JSON.stringify(deliveryInstruction)
    );
  };
  // Function to handle order type change
  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  // Function to handle street address change
  const handleStreetAddressChange = (e) => {
    setStreetAddress(e.target.value);
  };

  // Function to handle city change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  // Function to handle state change
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Function to handle ZIP code change
  const handleZipCodeChange = (e) => {
    setPostal_code(e.target.value);
  };
  const handleConfirmOtp = async () => {
    try {
      // Your API endpoint for OTP verification
      const apiUrl = '/api/verify/otp';

      // Send the entered OTP to the server for verification
      const response = await axios.post(apiUrl, {
        email: emailOrMobile,
        mobile: emailOrMobile,
        enteredOtp
      });

      // Check the response from the server
      if (response.data.success) {
        // console.log('OTP verified successfully');
        toast.success('OTP verified successfully');
        localStorage.setItem('emailOrMobile', JSON.stringify(emailOrMobile));
        setOtpVerified(true);
        // Proceed with further actions, such as navigating to the next step
      } else {
        // console.error('OTP verification failed:', response.data.message);
        toast.error(`OTP verification failed!`);
        // Handle the case where OTP verification failed, show an error message, etc.
      }
    } catch (error) {
      // console.error('Error confirming OTP:', error);
      toast.error(`OTP verification failed!`);
      // Handle other errors, show an error message, etc.
    }
    // console.log('Entered OTP:', enteredOtp);
  };
  const handleEmailOrMobileChange = (e) => {
    setEmailOrMobile(e.target.value);
  };

  const handleGetOtp = async () => {
    try {
      const apiUrl = '/api/send/otp';
      // console.log('Mobile Number:', emailOrMobile);
      // Check if the input is an email or a phone number
      const isEmail = /\S+@\S+\.\S+/.test(emailOrMobile);
      const isPhone = /^\d{10}$/.test(emailOrMobile);

      // Send the request to get OTP
      await axios.post(apiUrl, {
        email: isEmail ? emailOrMobile : undefined,
        mobile: isPhone ? emailOrMobile : undefined
      });

      toast.success('OTP sent successfully!');
      setIsOtpSent(true);
    } catch (error) {
      // console.error('Error sending OTP:', error);
      toast.error(`Error sending OTP!`);
    }
  };

  let latitude1;
  let longitude1;
  const geoapifyApiKey = '31bc2a8978644190beec0a6f143266d3';
  let positionLat;
  let positionLng;
  let position;
  const findMyCoordinates = async () => {
    try {
      if (navigator.geolocation) {
        position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        latitude1 = position.coords.latitude; // Updated to get latitude
        longitude1 = position.coords.longitude; // Updated to get longitude
        localStorage.setItem('lat', JSON.stringify(latitude1));
        localStorage.setItem('lng', JSON.stringify(longitude1));
        const location = ` https://api.geoapify.com/v1/geocode/reverse?lat=${latitude1}&lon=${longitude1}&apiKey=70348c75b2aa4bd0b91fcba1f9e3a0dc`;
        const response = await axios.get(location);
        const { data } = response;
        setUserLocation(data);
        const distanceResponse = await axios.post('/api/calculate-distance', {
          latitude: latitude1,
          longitude: longitude1
        });

        const result = distanceResponse;
        const calculatedDistance = distanceResponse.data.distanceInKilometers;
        setDistanceResult(calculatedDistance);
        // setBillingVerified(true);
        if (calculatedDistance < 500) {
          setDeliveryVerified(true);
        } else {
          setDeliveryVerified(false);
        }
        // console.log('Distance Result:', distanceResult);
        // console.log('Full Distance Response:', distanceResponse.data);
        localStorage.setItem('distanceResponse', JSON.stringify(result));
        localStorage.setItem(
          'deliveryAddress',
          JSON.stringify({
            streetAddress: data.features[0].properties.address_line1,
            postalCode: data.features[0].properties.postcode,
            city: data.features[0].properties.city,
            state: data.features[0].properties.state,
            country: data.features[0].properties.country
          })
        );

        // console.log(data);
        setToastShown(true);
      } else {
        toast.error('Geolocation is not supported by your browser');
      }
    } catch (error) {
      // console.error('Error getting location:', error.message);
      toast.error('Error getting location');
      // notifyError(error.message);
    }
  };
  const handleBillingAddressChange = async (event) => {
    event.preventDefault();
    const fullBillingAddress = `${streetAddress}, ${city}, ${state}, ${postal_code}, ${country}`;

    const geocodeBillingAddressToCoordinates = async (address) => {
      try {
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
        setBillingVerified(true);
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
  const handleAddressChange = async (e) => {
    // if (e) {
    //   e.preventDefault();
    // }
    const fullAddress = `${streetAddress}, ${city}, ${postal_code} ${state}, ${country}`;

    const geocodeAddressToCoordinates = async (address) => {
      try {
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${geoapifyApiKey}`
        );
        // console.log(
        //   `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${geoapifyApiKey}`
        // );

        if (!response.data.features || response.data.features.length === 0) {
          throw new Error('Coordinates not found for the given address');
        }

        const firstFeature = response.data.features[0];
        const { lat, lon } = firstFeature.properties;
        positionLat = firstFeature.properties.lat;
        positionLng = firstFeature.properties.lon;
        // console.log(`-------------${positionLat}`);

        localStorage.setItem('lat', JSON.stringify(lat));
        localStorage.setItem('lng', JSON.stringify(lon));
        return { latitude: lat, longitude: lon };
      } catch (error) {
        // console.error('Error geocoding address:', error.message);
        toast.error('Error geocoding address');
        throw error;
      }
    };

    if (useCurrentLocation) {
      try {
        findMyCoordinates();
      } catch (error) {
        // console.log(error);
        toast.error('Error in finding coordinates');
      }
    } else {
      try {
        const newCoordinates = await geocodeAddressToCoordinates(fullAddress);
        setCoordinates(newCoordinates);
        const distanceResponse = await axios.post('/api/calculate-distance', {
          latitude: positionLat,
          longitude: positionLng
        });

        const result = distanceResponse;
        const calculatedDistance = distanceResponse.data.distanceInKilometers;
        setDistanceResult(calculatedDistance);
        // setBillingVerified(true);
        if (calculatedDistance < 500) {
          setDeliveryVerified(true);
        } else {
          setDeliveryVerified(false);
        }

        // console.log('Distance Result:', distanceResult);
        // console.log('Full Distance Response:', distanceResponse.data);
        localStorage.setItem('distanceResponse', JSON.stringify(result));
      } catch (error) {
        // console.error('Error getting coordinates:', error.message);
        toast.error('Error getting coordinates');

        // Check if the error is an AxiosError and the status code is 400
        if (
          error.isAxiosError &&
          error.response &&
          error.response.status === 400
        ) {
          // Show a toast message for the 400 Bad Request error
          toast.error('Please check if delivery is available to your address.');
        } else {
          // For other errors, show a general error message
          toast.error('Error getting coordinates. Please try again later.');
        }
      }
    }
  };
  const handleButtonClick = () => {
    // setUserLocation(false);
    handleAddressChange();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form submitted');

    try {
      // Check if the form is valid (uncomment if you have a validateForm function)
      // const isValid = validateForm();

      // Create an object with the entered address data
      const addressData = {
        orderType,
        name,
        lastName,
        email,
        mobileNumber,
        textBox1,
        textBox2
      };

      // Save entered information in local storage
      localStorage.setItem('shippingInfo', JSON.stringify(addressData));

      // Verify OTP or user login
      if (otpVerified || isLoggedIn) {
        // Check for delivery verification if the order type is 'Delivery'
        if (orderType === 'Delivery' && deliveryVerified === true) {
          if (billingVerified === true) {
            navigate('/order/confirm');
          } else {
            toast.error('Please check Billing address!', {
              position: toast.POSITION.BOTTOM_CENTER
            });
          }
        } else if (
          orderType === 'Pickup' &&
          (deliveryVerified === true || billingVerified === true)
        ) {
          // If the order type is 'Pickup', navigate to the confirmation page
          navigate('/order/confirm');
        } else {
          if (orderType === 'Delivery') {
            toast.error('Please check delivery address!', {
              position: toast.POSITION.TOP_CENTER
              // bodyClassName: 'toast-fixed'
            });
          } else {
            toast.error('Please check address!', {
              position: toast.POSITION.TOP_CENTER
              // bodyClassName: 'toast-fixed'
            });
          }
        }
      } else {
        // If OTP is not verified or user is not logged in
        if (
          orderType === 'Pickup' &&
          (deliveryVerified === true || billingVerified === true)
        ) {
          // If the order type is 'Pickup' and delivery is verified, navigate to the confirmation page
          navigate('/order/confirm');
        } else {
          // Show an error message for other cases
          toast.error('Please verify your email or mobile number', {
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      }
    } catch (error) {
      // console.error('Error submitting form:', error);

      // Show specific error messages based on the error type
      if (
        error.isAxiosError &&
        error.response &&
        error.response.status === 400
      ) {
        toast.error('Please check if delivery is available to your address.');
      } else {
        toast.error('Error submitting form. Please try again later.');
      }
    }
  };

  useEffect(() => {
    // Fetch time slots from the API
    const fetchTimeSlots = async () => {
      try {
        const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
        const response = await axios.post('/api/timeSlots', { restaurantId });
        const timeSlotsData = response.data.timeSlots;
        // const timeSlotsData = Array.isArray(response.data) ? response.data : [];
        // console.log(timeSlotsData);
        setTimeSlots(timeSlotsData);
      } catch (error) {
        // console.error('Error fetching time slots:', error.message);
        toast.error('Error fetching time slots');
      }
    };

    fetchTimeSlots();
  }, []);
  useEffect(() => {
    // // If otpVerified is true, navigate to the next page
    // if (otpVerified) {
    //   navigate('/order/confirm');
    // } else {
    //   toast.error('Please verify your email or mobile number.');
    // }
  }, [otpVerified, navigate]);

  return (
    <div id="ShippingInfo" className='py-5'  >
    <div className="container col-md-5 custom-table my-4" id="CardBackIMg">
      <form className="checkout-form" onSubmit={handleSubmit}>
        {!isLoggedIn && (
          <PersonalDetails
            name={name}
            lastName={lastName}
            email={email}
            otp={enteredOtp}
            handleGetOtp={handleGetOtp}
            isOtpSent={isOtpSent}
            otpVerified={otpVerified}
            emailOrMobile={emailOrMobile}
            handleConfirmOtp={handleConfirmOtp}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleEmailChange={handleEmailChange}
            handleOtpChange={handleOtpChange}
            handleEmailOrMobileChange={handleEmailOrMobileChange}
            errors={errors}
          />
        )}
        {(otpVerified || isLoggedIn) && (
          <OrderDetails
            orderType={orderType}
            selectedTimeSlot={selectedTimeSlot}
            timeSlots={timeSlots}
            handleOrderTypeChange={handleOrderTypeChange}
            handleTimeSlotChange={handleTimeSlotChange}
            isTimeWithinSlot={isTimeWithinSlot}
            handleTimeChange={handleTimeChange}
            time={time}
          />
        )}
        {orderType === 'Delivery' && (
          <DeliveryAddress
            streetAddress={streetAddress}
            postalCode={postal_code}
            city={city}
            state={state}
            country={country}
            textBox2={textBox2}
            setBillingVerified={setBillingVerified}
            handleStreetAddressChange={handleStreetAddressChange}
            handleZipCodeChange={handleZipCodeChange}
            handleCityChange={handleCityChange}
            handleStateChange={handleStateChange}
            handleCountryChange={handleCountryChange}
            handleText2={handleText2}
            handleButtonClick={handleButtonClick}
            toastShown={toastShown}
            setToastShown={setToastShown}
            useCurrentLocation={useCurrentLocation}
            findMyCoordinates={findMyCoordinates}
            userLocation={userLocation}
            coordinates={coordinates}
            handleUseCurrentLocationChange={handleUseCurrentLocationChange}
            distanceResult={distanceResult}
          />
        )}
        {orderType === 'Pickup' && (
          <BillingAddress
            streetAddress={streetAddress}
            postalCode={postal_code}
            city={city}
            state={state}
            country={country}
            textBox1={textBox1}
            handleBillingAddressChange={handleBillingAddressChange}
            handleStreetAddressChange={handleStreetAddressChange}
            handleZipCodeChange={handleZipCodeChange}
            handleCityChange={handleCityChange}
            handleStateChange={handleStateChange}
            handleCountryChange={handleCountryChange}
            handleText1={handleText1}
            orderType={orderType}
          />
        )}
        <button type="submit" className="btn my-global-button btn-primary mb-4">
          Continue
        </button>
      </form>
    </div>
    </div>
  );
};

export default ShippingInfo1;
