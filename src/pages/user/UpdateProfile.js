/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import MetaData from 'layout/MetaData';
import { Link } from 'react-router-dom';

export default function UpdateProfile() {
  const userId = JSON.parse(sessionStorage.getItem('user'));
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const id = userId._id;
  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('lastName', lastName);
      formData.append('phone', phone);
      formData.append('avatar', avatar);

      const response = await axios.put(`/api/update1/${id}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      });

      // console.log('Server Response:', response.data);

      if (response.data.success) {
        toast('Profile updated successfully', {
          type: 'success',
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'Internal Server Error';
      toast(errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error'
      });
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/myprofile/${id}`);
      const { user } = response.data.data;
      setName(user.name);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setAvatarPreview(user.avatar);
    };
    fetchUser();
  }, []);

  return (
    <div   id="ProfileMainImg" className="py-5" >
      <MetaData title="update"/>
      <div className="col-11 custom-table col-lg-4 col-md-8 mx-auto " id="ForgetImg">
        <form
          onSubmit={submitHandler}
          //   className="shadow-lg"
          encType="multipart/form-data"
        >
          <div className="mt-4 px-3" >
            <h4 className="mt-4 my-3">Update Profile</h4>
          </div>

          <div className="form-group mx-5 my-2">
            <label htmlFor="name_field" style={{color:'black',backgroundColor:'transparent',fontWeight:'550'}}>Name</label>
            <input
              type="name"
              style={{color:'white',backgroundColor:'transparent'}}
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mx-5 my-2">
            <label htmlFor="lastName_field" style={{color:'black',backgroundColor:'transparent',fontWeight:'550'}}>Last Name</label>
            <input
            style={{color:'white',backgroundColor:'transparent'}}
              type="name"
              id="lastName_field"
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group mx-5 my-2">
            <label htmlFor="email_field" style={{color:'black',backgroundColor:'transparent',fontWeight:'550'}}>Email</label>
            <input
            style={{color:'white',backgroundColor:'transparent'}}
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mx-5 my-2">
            <label htmlFor="phone_field" style={{color:'black',backgroundColor:'transparent',fontWeight:'550'}}>Phone</label>
            <input
            style={{color:'white',backgroundColor:'transparent',fontWeight:'550'}}
              type="tel"
              id="phone_field"
              className="form-control"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4 my-2 mx-5">
            <label htmlFor="customFile" style={{color:'black',backgroundColor:'transparent',fontWeight:'550'}}>Avatar</label>

            <div className="custom-file">
              <input
              style={{color:'white',backgroundColor:'transparent',fontWeight:'550'}}
                type="file"
                name="avatar"
                className="form-control"
                alt="Avatar Preview"
                id="customFile"
                onChange={onChangeAvatar}
              />

              <label className="custom-file-label" htmlFor="customFile">
                Chosen Avatar
              </label>
            </div>

            <figure className="image-preview mt-3">
              <img
                className="mr-2 mb-2"
                src={avatarPreview}
                width="55"
                height="52"
              />
            </figure>
          </div>
          {/* <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Avatar Preview"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChangeAvatar}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div> */}
          <div className="px-3">
            <button
              type="submit"
              className="btn my-global-button update-btn btn-block mt-4 mb-3"
            >
              Update
            </button>
            <Link to={'/myProfile/:id'}>
            <button
              type="submit"
              className="btn my-global-button update-btn btn-block mt-4 mb-3 ms-5"
            >
             Back to HomePage
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
