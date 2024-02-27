import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const RegistrationSuccess = () => {
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(`${token}`);
        if (response.data.success) {
          setVerificationStatus('Email verified successfully!');
        } else {
          setVerificationStatus(
            'Email verification failed. Please contact support.'
          );
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setVerificationStatus('Error verifying email. Please try again later.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="https://static.vecteezy.com/system/resources/thumbnails/001/622/545/original/success-check-mark-icon-animation-video.jpg"
            alt="Registration Success"
            width="200"
            height="200"
          />

          <h2>{verificationStatus}</h2>

          {verificationStatus === 'Email verified successfully!' && (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
