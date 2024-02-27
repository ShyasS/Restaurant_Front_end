import { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios'; // Import Axios for API requests
import '../login/login.scss';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [showHeader, setShowHeader] = useState(false);
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      try {
        // Make the API request using Axios
        const response = await axios.put(
          `http://localhost:8000/api/password/reset/${token}`,
          {
            password,
            confirmPassword
          }
        );

        // Handle the response based on the message
        console.log('Password reset success:', response.data);
        toast('Reset success', {
          type: 'success',
          position: toast.POSITION.BOTTOM_FULL_WIDTH
        });
        navigate('/login');
      } catch (error) {
        console.error('Password reset failed:', error);

        toast(error.response.data.message, {
          type: 'error',
          position: toast.POSITION.BOTTOM_FULL_WIDTH
        });
      }
    } else {
      toast('Password Reset failed!', {
        type: 'error',
        position: toast.POSITION.BOTTOM_FULL_WIDTH
      });
      validator.current.showMessages();
    }
  };

  return (
    <div className="signup-form-container mx-3 my-5">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row custom-table">
            <div className="col-md-12">
              <h3 className="text-center mt-3 font-regular-29">
                Reset password
              </h3>
              <div className="mb-3 address-container">
                <label className="form-label" htmlFor="password_field">
                  Password
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <input
                  type="password"
                  id="password_field"
                  placeholder="Field is required"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 address-container">
                <label className="form-label" htmlFor="confirm_password_field">
                  Confirm Password
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  placeholder="Field is required"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {validator.current.message('password', password, 'required')}
                {validator.current.message(
                  'confirmPassword',
                  confirmPassword,
                  'required|same:password'
                )}
              </div>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn my-global-button">
                Submit
              </button>
            </div>
            <div>
              <Link to="/login">Back to login</Link>
            </div>
            <div className="mb-3">
              <Link to="/">Continue as Guest</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
