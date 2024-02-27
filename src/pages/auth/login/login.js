// /* eslint-disable react/button-has-type */
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState, useRef } from 'react';
// import SimpleReactValidator from 'simple-react-validator';
// import { toast } from 'react-toastify';
// import { login } from '../../../redux-toolkit/actions/auth';
// import './login.scss';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { loading, error, isAuthenticated, loginSuccess } = useSelector(
//     (state) => state.authState
//   );
//   const validator = useRef(
//     new SimpleReactValidator({ className: 'text-danger' })
//   );

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (validator.current.allValid()) {
//       dispatch(login(email, password));
//       toast.success('Login successful!', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true
//       });
//     } else {
//       validator.current.showMessages();
//       setEmail('');
//       setPassword('');
//       // dispatch(login(setEmail, setPassword));
//     }
//   };
//   useEffect(() => {
//     if (loginSuccess) {
//       const { token, user } = loginSuccess.payload;
//       document.cookie = `token=${token}; path=/;`;
//       sessionStorage.setItem('token', token);
//       sessionStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('user', JSON.stringify(user));
//     }
//     if (error) {
//       console.log(error);
//       toast.error(error, {
//         position: toast.POSITION.BOTTOM_CENTER
//         // onClose: () => {
//         //   dispatch(clearAuthError());
//         // }
//       });
//     }
//     if (isAuthenticated) {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (user && user.role !== 'user') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/');
//       }
//     }
//   }, [error, isAuthenticated, dispatch, navigate, loginSuccess]);

//   return (
//     <div className="signup-form-container">
//       <form onSubmit={handleLogin}>
//         <div className="row">
//           <div className="col-md-12">
//             <h3 className="text-center mt-3 font-regular-29">Log in</h3>
//             <div>
//               Do not have account?
//               <Link to="/signup">Sign Up</Link>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email address
//               </label>
//               <input
//                 value={email}
//                 name="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 className="form-control"
//               />
//               {validator.current.message('Email', email, 'required')}
//             </div>
//           </div>
//           <div className="col-md-12">
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 value={password}
//                 name="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="password"
//                 className="form-control"
//               />
//               {validator.current.message('password', password, 'required')}
//             </div>
//           </div>
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="btn btn-secondary"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//         <div className="links-container">
//           <div>
//             <Link to="/">Continue as Guest</Link>
//           </div>

//           <div>
//             <Link to="/password/forgot">Forgot password?</Link>
//           </div>
//           <div>
//             <Link to="/login/otp">Login with OTP</Link>
//           </div>
//           <div>
//             <Link to="/">Go to home</Link>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default LoginPage;
/* eslint-disable react/button-has-type */
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { clearAuthError, login } from '../../../redux-toolkit/actions/auth';
import './login.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, loginSuccess } = useSelector(
    (state) => state.authState
  );
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  const isAuthenticated = localStorage.getItem('isloggedIn') === 'true';
  // const isAuthenticated = localStorage.getItem('isloggedIn') === 'true';

  const handleLogin = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      dispatch(login(email, password));
    } else {
      validator.current.showMessages();
      setEmail('');
      setPassword('');
      // dispatch(login(setEmail, setPassword));
    }
  };
  useEffect(() => {
    if (loginSuccess) {
      const { token, user } = loginSuccess.payload;
      document.cookie = `token=${token}; path=/;`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (error) {
      // console.log(error);
      toast.error(error, {
        position: toast.POSITION.BOTTOM_FULL_WIDTH,
        onClose: () => {
          dispatch(clearAuthError);
        }
      });
    }
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));
      // const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role !== 'user') {
        // toast.success('Login successful!', {
        //   position: toast.POSITION.BOTTOM_FULL_WIDTH,
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true
        // });
        navigate('/admin/dashboard');
      } else {
        // toast.success('Login successful!', {
        //   position: toast.POSITION.BOTTOM_FULL_WIDTH,
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true
        // });
        navigate('/');
      }
    }
  }, [error, isAuthenticated, dispatch, navigate, loginSuccess]);

  return (
    <div className="container-fluid" id="LoginMainImg">
    <div className="signup-form-container mx-auto py-5" >
      <form onSubmit={handleLogin}  >
        <div className="row custom-table mx-auto mt-5" id="LoginImg">
          <div className="col-md-12 " >
            <h1 className="text-center mt-3 font-regular-29">Log in</h1>
            <div className='mt-4' style={{fontSize:'19px'}} >
              Do not have account?
              <Link to="/signup" className='ms-2' style={{color:'black',backgroundColor:'transparent'}}>Sign Up</Link>
            </div>
            <div className="mb-3 address-container">
              <label htmlFor="email" className="form-label mt-4" style={{color:'black',backgroundColor:'transparent', fontWeight:'500', fontSize:'19px'}} >
                Email address
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
                value={email}
                style={{color:'black',backgroundColor:'transparent'}}
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
          <div className="col-md-12">
            <div className="mb-3 address-container">
              <label htmlFor="password" className="form-label" style={{color:'black',backgroundColor:'transparent', fontWeight:'500', fontSize:'19px'}}>
                Password
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
               style={{color:'black',backgroundColor:'transparent'}}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Field is required"
                className="form-control"
              />
              {validator.current.message('password', password, 'required')}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn  my-3 w-100 "
              id="Btn"
              style={{backgroundColor:'#bd870b'}}
            >
              Submit
            </button>

            <div className="links-container mb-4">
              <div>
                <Link to="/"   style={{color:'black',backgroundColor:'transparent',fontSize:'18px'}} >Continue as Guest</Link>
              </div>

              <div>
                <Link to="/password/forgot" style={{color:'black',backgroundColor:'transparent',fontSize:'18px'}} > Forgot password?</Link>
              </div>
              <div>
                <Link to="/login/otp" style={{color:'black',backgroundColor:'transparent',fontSize:'18px'}} >Login with OTP</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};
export default LoginPage;
