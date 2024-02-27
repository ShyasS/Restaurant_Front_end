/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState('');
  const [mealTypeCategory, setMealTypeCategory] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id: productId } = useParams();

  const dietaryCategory = [
    'Vegetarian',
    'Non-vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Other'
  ];
  const mealCategory = [
    'Appetizers',
    'Main Course',
    'Desserts',
    'Beverages',
    'Other'
  ];

  // const navigate = useNavigate();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('isAvailable', isAvailable);
    formData.append('description', description);
    formData.append('restaurantId', restaurantId);
    formData.append('mealTypeCategory', mealTypeCategory);
    formData.append('dietaryPreferenceCategory', dietaryPreferenceCategory);
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('imagesCleared', imagesCleared);

    try {
      // Use axios to send the form data
      await axios.put(`/api/products/${productId}`, formData);

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
        const response = await axios.get(`/api/product/${productId}`);
        const product = response.data.menu;

        setName(product.name);
        setPrice(product.price);
        setIsAvailable(product.isAvailable);
        setDescription(product.description);
        setRestaurantId(product.restaurantId);
        setDietaryPreferenceCategory(product.dietaryPreferenceCategory);
        setMealTypeCategory(product.mealTypeCategory);

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
  }, [productId]);

  return (
    <div className="container-fluid col-lg-10">
      <div className="custom-table">
        <div className="wrapper my-5">
          <form
            onSubmit={submitHandler}
            className="address-container shadow-lg "
            encType="multipart/form-data"
          >
            <h3 className="my-5 pt-4">Update Product</h3>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="2"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">
                    Dietary Preference Category
                  </label>
                  <select
                    value={dietaryPreferenceCategory}
                    onChange={(e) =>
                      setDietaryPreferenceCategory(e.target.value)
                    }
                    className="form-control"
                    id="category_field"
                  >
                    <option value="">Select</option>
                    {dietaryCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="category_field">Meal Type Category</label>
                  <select
                    value={mealTypeCategory}
                    onChange={(e) =>
                      setDietaryPreferenceCategory(e.target.value)
                    }
                    className="form-control"
                    id="category_field"
                  >
                    <option value="">Select</option>
                    {mealCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Is Available</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    onChange={(e) => setIsAvailable(e.target.value)}
                    value={isAvailable}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Restaurant Id</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    onChange={(e) => setRestaurantId(e.target.value)}
                    value={restaurantId}
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
