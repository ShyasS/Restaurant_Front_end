/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
// import SimpleReactValidator from 'simple-react-validator';
import './index.css';
import { Button, Card } from 'react-bootstrap';

const PersonalDetails = ({
  name,
  lastName,
  handleFirstNameChange,
  handleLastNameChange,
  handleGetOtp,
  handleOtpChange,
  emailOrMobile,
  handleEmailOrMobileChange,
  enteredOtp,
  isOtpSent,
  handleConfirmOtp,
  errors
}) => {
  // const [emailError, setEmailError] = useState('');
  // const validator = useRef(
  //   new SimpleReactValidator({ className: 'text-danger' })
  // );

  // const validateEmail = () => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     setEmailError('Invalid email address');
  //     return false;
  //   }
  //   setEmailError('');
  //   return true;
  // };

  // const handleEmailBlur = () => {
  //   validateEmail();
  // };

  return (
    <div >
    <Card className="my-3 p-3" style={{backgroundColor:'transparent'}}>
      <h4   style={{color:'black', fontWeight:'550'}}>Personal Details</h4>
      <div className="mb-3 address-container">
        <label htmlFor="userName" className="form-label" style={{color:'black', fontWeight:'500'}}>
          First Name{' '}
          <span className="text-danger">
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          style={{color:'black',backgroundColor:'transparent'}}
          className={`form-control `}
          id="userName"
          value={name}
          onChange={handleFirstNameChange}
          placeholder="Field is required"
          required
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="lastName" className="form-label" style={{color:'black', fontWeight:'500'}}>
          Last Name{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <input
        style={{color:'black',backgroundColor:'transparent'}}
          type="text"
          className={`form-control `}
          id="lastName"
          value={lastName}
          placeholder="Field is required"
          onChange={handleLastNameChange}
          required
        />
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="emailOrMobile" className="form-label" style={{color:'black', fontWeight:'500'}}>
          Email / Mobile Number{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          style={{color:'black',backgroundColor:'transparent'}}
          className="form-control"
          id="emailOrMobile"
          value={emailOrMobile}
          onChange={handleEmailOrMobileChange}
          required
          placeholder="Field is required"
        />
      </div>
      <Button
        type="button"
        className="my-global-button my-2"
        onClick={handleGetOtp}
      >
        Get OTP
      </Button>
      {isOtpSent && (
        <>
          <div>
            <label htmlFor="otp" className="form-label mt-4"  style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
              Enter OTP{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{color:'black',backgroundColor:'transparent'}}
              type="tel"
              className={`form-control `}
              id="otp"
              value={enteredOtp}
              onChange={handleOtpChange}
              required
              placeholder="Field is required"
            />
          </div>
          <Button
            type="button"
            className="my-3 my-global-button"
            required
            onClick={handleConfirmOtp}
          >
            Confirm OTP
          </Button>
        </>
      )}
    </Card>
    </div>
  );
};

export default PersonalDetails;
