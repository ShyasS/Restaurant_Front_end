/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateCarousal = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id: carousalId } = useParams();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(() => [reader.result]);
          setImages(() => [file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('imagesCleared', imagesCleared);

    try {
      // Use axios to send the form data
      await axios.put(`/api/admin/carousel/${carousalId}`, formData);

      toast('Product Updated Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      setImages([]);
    } catch (error) {
      toast(error.message || 'An error occurred', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(`/api/carousel/${carousalId}`);
        const product = response.data.carousel;
        setText(product.text);
        const images = product.images.map((image) => image.image);
        setImagesPreview(images);
      } catch (error) {
        toast(error.message || 'An error occurred', {
          type: 'error',
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    };

    getProductDetails();
  }, [carousalId]);

  return (
    <div className="row">
      <div className="col-12 col-md-10">
        <div className="wrapper my-5">
          <form
            onSubmit={submitHandler}
            className="shadow-lg"
            encType="multipart/form-data"
          >
            <h1 className="mb-4">Update Carousal</h1>
            <div className="form-group">
              <label htmlFor="text_field">text</label>
              <textarea
                className="form-control"
                id="text_field"
                rows="8"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </div>
            <div className="form-group">
              <label>Images</label>

              <div className="custom-file">
                <input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  multiple
                  onChange={onImagesChange}
                />

                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>

              {imagesPreview.length > 0 && (
                <span
                  className="mr-2"
                  onClick={clearImagesHandler}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fa fa-trash" />
                </span>
              )}
              {imagesPreview.map((image) => (
                <img
                  className="mt-3 mr-2"
                  key={image}
                  src={image}
                  alt="Image Preview"
                  width="55"
                  height="52"
                />
              ))}
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCarousal;
