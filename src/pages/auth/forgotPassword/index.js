/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import SimpleReactValidator from 'simple-react-validator';
// import {
//   forgotPassword,
//   clearAuthError
// } from '../../../redux-toolkit/actions/auth.js';

// const ForgotPasswordPage = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const { message, error, loading } = useSelector((state) => state.authState);
//   const validator = useRef(
//     new SimpleReactValidator({ className: 'text-danger' })
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('email', email);
//     dispatch(forgotPassword(formData));
//   };

//   useEffect(() => {
//     if (message) {
//       toast(message, {
//         type: 'success',
//         position: toast.POSITION.TOP_CENTER
//       });
//       setEmail('');
//     }

//     if (error) {
//       toast(JSON.stringify(error), {
//         position: toast.POSITION.TOP_CENTER,
//         type: 'error',
//         onOpen: () => {
//           dispatch(clearAuthError());
//         }
//       });
//     }
//   }, [message, error, dispatch]);

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="row custom-table my-5">
//         <div className="col-md-12">
//           <h3 className="text-center mt-3 font-regular-29">Forgot password</h3>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email address{' '}
//               <span className="text-danger">
//                 {' '}
//                 <b>*</b>
//               </span>
//             </label>
//             <input
//               value={email}
//               name="email"
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               required
//               placeholder="Field is required"
//               className="form-control"
//             />
//             {validator.current.message('Email', email, 'required')}
//           </div>
//         </div>
//         <div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="btn btn-secondary mb-4"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };
// export default ForgotPasswordPage;
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../login/login.scss';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('email', email);
        const config = {
          headers: {
            'Content-type': 'application/json'
          }
        };

        const response = await axios.post(
          'http://localhost:8000/api/password/forgot',
          formData,
          config
        );

        setMessage(response.data.message);
        toast(response.data.message, {
          type: 'success',
          position: toast.POSITION.BOTTOM_FULL_WIDTH
        });
        setEmail('');
      } catch (error) {
        setError(error.response ? error.response.data : 'An error occurred');
        const errorMessage = error.response
          ? error.response.data.message
          : 'An error occurred';
        toast(errorMessage, {
          position: toast.POSITION.BOTTOM_FULL_WIDTH,
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast('Please fix the validation errors', {
        type: 'error',
        position: toast.POSITION.BOTTOM_FULL_WIDTH
      });
      validator.current.showMessages();
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <div id="ForgetPMainImg">
    <div className="signup-form-container mx-auto container-fluid col-md-4 py-5 mx-3 ">
      <form onSubmit={handleSubmit}>
        <div className="row custom-table my-5" id="ForgetImg" >
          <div className="col-md-12">
            <h2 className="text-center mt-3 font-regular-29">
              Forgot password
            </h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{color:'white',backgroundColor:'transparent'}}>
                Email address{' '}
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
              style={{color:'white',backgroundColor:'transparent'}}
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Field is required"
                className="form-control"
              />
              {validator.current.message('Email', email, 'required')}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn mb-4 w-100"

            >
              Submit
            </button>
          </div>
          <div>
            <Link to="/login"  style={{color:'white',backgroundColor:'transparent'}}>Back to login</Link>
          </div>
          <div className="mb-3">
            <Link to="/"  style={{color:'white',backgroundColor:'transparent'}}>Continue as Guest</Link>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ForgotPasswordPage;
