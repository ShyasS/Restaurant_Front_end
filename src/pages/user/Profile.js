// /* eslint-disable no-underscore-dangle */
// /* eslint-disable react/button-has-type */
// /* eslint-disable no-shadow */
// import React, { useEffect, useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../../App.css';
// import { toast } from 'react-toastify';
// import MetaData from 'layout/MetaData';
// import './users.scss';

// export default function Profile() {
//   const navigate = useNavigate();
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [name, setName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [avatar, setAvatar] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [isFormValid, setIsFormValid] = useState({
//     oldPassword: true,
//     password: true,
//     confirmPassword: true
//   });

//   const handleShowEditModal = () => setShowEditModal(true);
//   const handleCloseEditModal = () => setShowEditModal(false);
//   // const { id } = useParams();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const userId = user._id;

//   const handleEdit = () => {
//     // console.log('profile edit');
//     navigate(`/updateProfile/${userId}`);
//   };

//   const handleEditProfile = async () => {
//     // Check if all form fields are valid
//     const isValid =
//       isFormValid.oldPassword &&
//       isFormValid.password &&
//       isFormValid.confirmPassword;

//     if (!isValid) {
//       // If form is not valid, don't proceed with the API call
//       toast.error('Please provide all the fields in the form.');
//       return;
//     }

//     try {
//       if (password === confirmPassword) {
//         const response = await axios.put(`/api/password/change/${userId}`, {
//           oldPassword,
//           password,
//           confirmPassword
//         });

//         const successMessage = response.data.message;
//         toast.success(successMessage);

//         handleCloseEditModal();
//       } else {
//         toast.error('New password and confirm password must be the same.');
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         'An error occurred while updating the password.';
//       toast.error(errorMessage);
//     }
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await axios.get(`/api/myprofile/${userId}`);
//       const { user } = response.data.data;
//       setName(user.name);
//       setLastName(user.lastName);
//       setEmail(user.email);
//       setPhone(user.phone);
//       setAvatar(user.avatar);
//     };
//     fetchUser();
//   }, []);

//   return (
//     <div className="container col-10 row justify-content-around my-5 ">
//       <MetaData title={user.name} />
//       <h4 className="mt-4">Profile</h4>
//       <div className="col-12 col-md-3">
//         <figure className="my-4 avatar avatar-profile">
//           <img
//             className="rounded-circle img-fluid"
//             src={
//               avatar ??
//               'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
//             }
//             alt="Profile"
//           />
//         </figure>
//         <div>
//           <button className="my-4 btn m-1" onClick={handleEdit}>
//             Edit profile
//           </button>
//         </div>
//       </div>

//       <div className="col-12 my-5 col-md-5">
//         <h4>Full Name</h4>
//         <p>
//           {name} {lastName}
//         </p>

//         <h4>Email Address</h4>
//         <p>{email}</p>

//         <h4>Phone</h4>
//         <p>{phone}</p>

//         {/* Change Password Button */}
//         <button className="btn m-1" onClick={handleShowEditModal}>
//           Reset Password
//         </button>
//         <Link to="/userOrderList">
//           <button className=" btn btn-block m-1">My Orders</button>
//         </Link>

//         {/* Edit Profile Modal */}
//         <Modal show={showEditModal} onHide={handleCloseEditModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Profile</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="oldPassword">
//                 <Form.Label>Old Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   required
//                   placeholder="Enter your old password"
//                   value={oldPassword}
//                   onChange={(e) =>
//                     setOldPassword(e.target.value) &&
//                     setIsFormValid((prev) => ({ ...prev, oldPassword: true }))
//                   }
//                 />
//               </Form.Group>
//               {!isFormValid.confirmPassword && (
//                 <div className="text-danger">This fields are required.</div>
//               )}
//               <Form.Group controlId="newPassword">
//                 <Form.Label>New Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter your new password"
//                   value={password}
//                   required
//                   onChange={(e) =>
//                     setPassword(e.target.value) &&
//                     setIsFormValid((prev) => ({ ...prev, password: true }))
//                   }
//                 />
//               </Form.Group>
//               {!isFormValid.confirmPassword && (
//                 <div className="text-danger">This fields are required.</div>
//               )}
//               <Form.Group controlId="confirm_password">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Re-enter your new password"
//                   value={confirmPassword}
//                   required
//                   onChange={(e) =>
//                     setConfirmPassword(e.target.value) &&
//                     setIsFormValid((prev) => ({
//                       ...prev,
//                       confirmPassword: true
//                     }))
//                   }
//                 />
//               </Form.Group>
//               {!isFormValid.confirmPassword && (
//                 <div className="text-danger">This fields are required.</div>
//               )}
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button className="btn-custom" onClick={handleCloseEditModal}>
//               Close
//             </Button>
//             <Button className="btn-custom" onClick={handleEditProfile}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         {/* End Edit Profile Modal */}
//       </div>
//     </div>
//   );
// }

/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import MetaData from 'layout/MetaData';
import './users.scss';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState({
    oldPassword: true,
    password: true,
    confirmPassword: true
  });

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;

  const handleEdit = () => {
    navigate(`/updateProfile/${userId}`);
  };

  const handleEditProfile = async () => {
    const isValid =
      isFormValid.oldPassword &&
      isFormValid.password &&
      isFormValid.confirmPassword;

    if (!isValid) {
      toast.error('Please provide all the fields in the form.');
      return;
    }

    try {
      if (password === confirmPassword) {
        const response = await axios.put(`/api/password/change/${userId}`, {
          oldPassword,
          password,
          confirmPassword
        });

        const successMessage = response.data.message;
        toast.success(successMessage);
        handleCloseEditModal();
      } else {
        toast.error('New password and confirm password must be the same.');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while updating the password.';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/myprofile/${userId}`);
      const { user } = response.data.data;
      setName(user.name);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setAvatar(user.avatar);
    };
    fetchUser();
  }, []);

  return (
    <div id="ProfileMainImg" className='py-5 bg'>
          <div className="col-10 mx-auto mt-4 row justify-content-around" >
      <MetaData title={user.name} />
    <Container>
    <Row>
    

      <div>
        <h1 className="mx-auto" style={{color:'white',backgroundColor:'transparent'}}>Profile</h1>
      </div>
      <Col lg={{span:5,offset:0}} md={12}>
      <Card className=" borderUp mb-5 mt-3" id="ForgetImg">
        <figure className="my-4 avatar avatar-profile" >
          <img
            className="rounded-circle img-fluid"
            src={
              avatar ??
              require('../../assets/img/ProfilePic.png')
            }
            alt="Profile"
          />
        </figure>
        <div className="row-buttons col-9 mx-auto">
          <div>
            <button className="btn my-global-button my-2" onClick={handleEdit} >
              Edit profile
            </button>
          </div>
          <div>
            <Link to="/userOrderList">
              <button className="btn my-global-button my-2">My Orders</button>
            </Link>
          </div>
        </div>
        <div className="mx-auto">
          <button
            className="btn my-global-button mx-auto mb-4 "
            onClick={handleShowEditModal}
          >
            Reset Password
          </button>
        </div>
      </Card>
      </Col>
    <Col  lg={{span:5,offset:2}} md={{span:6, offset:4}}>
      <div className="my-5" style={{color:'white',backgroundColor:'transparent',fontSize:'23px'}}>
        <h4>Full Name</h4>
        <p style={{color:'white',backgroundColor:'transparent'}}>
          {name} {lastName}
        </p>

        <h4>Email Address</h4>
        <p style={{color:'white',backgroundColor:'transparent'}}>{email}</p>

        <h4>Phone</h4>
        <p style={{color:'white',backgroundColor:'transparent'}}>{phone}</p>

        <Modal style={{backgroundColor:'transparent'}} show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton  >
            <Modal.Title >Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:'transparent'}}  >
            <Form>
              <Form.Group controlId="oldPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Enter your old password"
                  value={oldPassword}
                  onChange={(e) =>
                    setOldPassword(e.target.value) &&
                    setIsFormValid((prev) => ({ ...prev, oldPassword: true }))
                  }
                />
              </Form.Group>
              {!isFormValid.confirmPassword && (
                <div className="text-danger">This fields are required.</div>
              )}
              <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  required
                  onChange={(e) =>
                    setPassword(e.target.value) &&
                    setIsFormValid((prev) => ({ ...prev, password: true }))
                  }
                />
              </Form.Group>
              {!isFormValid.confirmPassword && (
                <div className="text-danger">This fields are required.</div>
              )}
              <Form.Group controlId="confirm_password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  required
                  onChange={(e) =>
                    setConfirmPassword(e.target.value) &&
                    setIsFormValid((prev) => ({
                      ...prev,
                      confirmPassword: true
                    }))
                  }
                />
              </Form.Group>
              {!isFormValid.confirmPassword && (
                <div className="text-danger">This fields are required.</div>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="my-global-button" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button className="my-global-button" onClick={handleEditProfile}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Col>
      </Row>
  </Container>
    </div>
    </div>
  );
}
