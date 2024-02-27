/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */

import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import CategoryList from './CategoryList';
import CategoryList1 from './CategoryList1';
import './CreateMenu.css';

// import Sidebar from './Sidebar';

export default function CreateMenu() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState('');
  const [mealTypeCategory, setMealTypeCategory] = useState('');
  const [dietaryCategories, setDietaryCategories] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantBranch, setRestaurantBranch] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [loading, setLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newMealCategoryName, setNewMealCategoryName] = useState('');
  const [isAddMealCategoryModalOpen, setAddMealCategoryModalOpen] =
    useState(false);
  const [categories, setCategories] = useState([]);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [viewCategoryModalOpen, setViewCategoryModalOpen] = useState(false);
  const [viewCategoryModalOpen1, setViewCategoryModalOpen1] = useState(false);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const { role } = user;

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
  const handleCheckboxChange = () => {
    setIsAvailable(!isAvailable); // Toggle the checkbox value
  };
  const handleAddMealCategoryClick = () => {
    setAddMealCategoryModalOpen(!isAddMealCategoryModalOpen);
  };
  const fetchDietaryCategories = async () => {
    await axios
      .get('/api/dietary-preferences')
      .then((response) => setDietaryCategories(response.data.data))
      .catch((error) =>
        console.error('Error fetching dietary categories:', error)
      );
  };
  const fetchMealCategories1 = async () => {
    await axios
      .get('/api/meal-types')
      .then((response) => setMealCategories(response.data.data))
      .catch((error) =>
        console.error('Error fetching meal categories:', error)
      );
  };
  const handleSaveMealCategory = async () => {
    try {
      // Make an Axios POST request to save the new meal category
      await axios.post('/api/meal-types', {
        mealTypeCategory: newMealCategoryName
      });
      fetchMealCategories1();

      // Handle success, e.g., show a success message
      toast('Meal Category Added Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      // Optionally, perform any other actions after successful category addition

      // Close the modal after successful addition
      setAddMealCategoryModalOpen(false);
    } catch (error) {
      // Handle errors, e.g., show an error message
      toast(error.message || 'An error occurred', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  const handleAddCategoryClick = () => {
    console.log('handleAddCategoryClick called');
    setAddCategoryModalOpen(!isAddCategoryModalOpen);
  };
  const handleSaveCategory = async () => {
    try {
      // Make an Axios POST request to save the new category
      await axios.post('/api/dietary-preferences', {
        dietaryPreferenceCategory: newCategoryName
      });

      // Handle success, e.g., show a success message
      toast('Category Added Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      // Optionally, perform any other actions after successful category addition
      fetchDietaryCategories();
      // Close the modal after successful addition
      setAddCategoryModalOpen(false);
    } catch (error) {
      // Handle errors, e.g., show an error message
      toast(error.message || 'An error occurred', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };
  const fetchCategories = () => {
    // Fetch dietary categories from API
    axios
      .get('/api/dietary-preferences')
      .then((response) => setCategories(response.data.data))
      .catch((error) =>
        console.error('Error fetching dietary categories:', error)
      );
  };
  const fetchMealCategories = () => {
    // Fetch dietary categories from API
    axios
      .get('/api/meal-types')
      .then((response) => setCategories(response.data.data))
      .catch((error) =>
        console.error('Error fetching dietary categories:', error)
      );
  };

  const handleViewAllCategories = () => {
    // Fetch and display all categories when "View all Category" is clicked
    setViewCategoryModalOpen1(true);
    fetchCategories();
  };
  const handleViewAllCategories1 = () => {
    // Fetch and display all categories when "View all Category" is clicked
    setViewCategoryModalOpen(true);
    fetchMealCategories();
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      // Make an Axios DELETE request to remove the category
      await axios.delete(`/api/dietary-preferences/${categoryId}`);
      fetchCategories();
      fetchDietaryCategories();
      // Handle success, e.g., show a success message
      toast('Category Deleted Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      // Fetch updated categories after deleting a category
    } catch (error) {
      // Handle errors, e.g., show an error message
      toast(error.message || 'An error occurred', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };
  const handleDeleteCategory1 = async (categoryId) => {
    try {
      // Make an Axios DELETE request to remove the category
      await axios.delete(`/api/meal-types/${categoryId}`);
      // Handle success, e.g., show a success message
      toast('Category Deleted Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      // Fetch updated categories after deleting a category
    } catch (error) {
      // Handle errors, e.g., show an error message
      toast(error.message || 'An error occurred', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('dietaryPreferenceCategory', dietaryPreferenceCategory);
      formData.append('mealTypeCategory', mealTypeCategory);
      formData.append('isAvailable', isAvailable);
      if (role === 'superAdmin') {
        formData.append('restaurantBranch', selectedBranch);
        formData.append('restaurantId', selectedRestaurantId);
      } else {
        formData.append('restaurantBranch', restaurantBranch);
        formData.append('restaurantId', restaurantId);
      }

      images.forEach((image) => {
        formData.append('images', image);
      });

      await axios.post('/api/admin/product/new', formData);

      toast('Product Created Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      // navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Error creating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { restaurantId, restaurantBranch } = user;
    if (role !== 'superAdmin') {
      setRestaurantId(restaurantId);
      setRestaurantBranch(restaurantBranch);
    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error'
      });
    }
  }, [error]);
  useEffect(() => {
    fetchDietaryCategories();
    fetchMealCategories1();
    fetchCategories();
    if (role === 'superAdmin') {
      axios
        .get('/api/restaurant/get')
        .then((response) => setRestaurantBranch(response.data.data))
        .catch((error) =>
          console.error('Error fetching restaurant branches:', error)
        );
    }
  }, []);
  useEffect(() => {
    // Update selected restaurantId based on the selectedBranch
    if (role === 'superAdmin') {
      const selectedBranchObject = restaurantBranch.find(
        (branch) => branch.restaurantBranch === selectedBranch
      );

      if (selectedBranchObject) {
        setSelectedRestaurantId(selectedBranchObject.restaurantId);
      }
    }
  }, [selectedBranch, restaurantBranch]);

  return (
    <div className='CreateMenu py-1 text-white' >
    <div className="container-fluid">
      <>
        <div className="my-5">
          <form
            onSubmit={submitHandler}
            className="address-container shadow-lg "
            encType="multipart/form-data"
          >
            <h4 className="my-5 mx-5 pt-4">Create Menu Item</h4>
            <div className="row">
              <div className="col-xs-12 col-lg-6 col-md-12">
                <div className="mb-4 mx-5">
                  <label htmlFor="name_field">
                    Name
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                  </label>
                  <input
                   style={{backgroundColor:'transparent', color:'white'}}
                    type="text"
                    id="name_field"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    placeholder="Field is required"
                  />
                </div>

                <div className="mb-4 mx-5">
                  <label htmlFor="price_field">
                    Price
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                  </label>
                  <input
                   style={{backgroundColor:'transparent', color:'white'}}
                    type="text"
                    id="price_field"
                    required
                    placeholder="Field is required"
                    className={`form-control `}
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>

                <div className="mb-4 mx-5">
                  <label htmlFor="description_field">
                    Description
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                  </label>
                  <textarea
                   style={{backgroundColor:'transparent', color:'white'}}
                    className="form-control"
                    id="description_field"
                    rows="2"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                    placeholder="Field is required"
                  />
                </div>
                <div className="mb-4 mx-5">
                  <label htmlFor="category_field">
                    Meal Category
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                    <span onClick={handleAddMealCategoryClick}>
                      (Add Category)
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        style={{ marginRight: '5px' }}
                      />
                    </span>
                  </label>
                  <select
                   style={{backgroundColor:'transparent', color:'white'}}
                    onChange={(e) => setMealTypeCategory(e.target.value)}
                    className="form-control"
                    id="category_field"
                    required
                  >
                    <option value="">Select</option>
                    {mealCategories.map((mealType) => (
                      <option
                      style={{backgroundColor:'transparent', color:'white'}}
                        key={mealType.mealTypeCategory}
                        value={mealType.mealTypeCategory}
                      >
                        {mealType.mealTypeCategory}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 mx-5">
                  <label htmlFor="dietary_category_field">
                    Dietary Category
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                    <span onClick={handleAddCategoryClick}>
                      (Add Category)
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        style={{ marginRight: '5px' }}
                      />
                    </span>
                  </label>
                  <select
                   style={{backgroundColor:'transparent', color:'white'}}
                    onChange={(e) =>
                      setDietaryPreferenceCategory(e.target.value)
                    }
                    className="form-control"
                    id="dietary_category_field"
                    required
                  >
                    <option value="">Select</option>
                    {dietaryCategories.map((mealType) => (
                      <option
                        key={mealType.dietaryPreferenceCategory}
                        value={mealType.dietaryPreferenceCategory}
                      >
                        {mealType.dietaryPreferenceCategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-xs-12 col-lg-6 col-md-12">
                <>
                  {role === 'superAdmin' && Array.isArray(restaurantBranch) && (
                    <div className="mb-4 mx-5">
                      <label htmlFor="seller_field">
                        Restaurant Branch
                        <span className="text-danger">
                          {' '}
                          <b>*</b>
                        </span>
                      </label>
                      <select
                       style={{backgroundColor:'transparent', color:'white'}}
                        id="seller_field"
                        className="form-control"
                        value={selectedBranch} // Use a separate state for selected value
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        {restaurantBranch.map((branch) => (
                          <option
                            key={branch.restaurantBranch}
                            value={branch.restaurantBranch}
                          >
                            {branch.restaurantBranch}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="mb-4 mx-5 d-none">
                    <label htmlFor="id_field">
                      Restaurant Id
                      <span className="text-danger">
                        {' '}
                        <b>*</b>
                      </span>
                    </label>
                    <input
                     style={{backgroundColor:'transparent', color:'white'}}
                      type="text"
                      id="id_field"
                      className="form-control"
                      // onChange={() => setRestaurantId(selectedRestaurantId)}
                      // value={selectedRestaurantId}
                      // required
                      placeholder="Field is required"
                    />
                  </div>
                </>

                <div className="mb-4 mx-5">
                  <label htmlFor="customFile">Images</label>

                  <div className="custom-file">
                    <input
                     style={{backgroundColor:'transparent', color:'white'}}
                      type="file"
                      name="product_images"
                      className="form-control"
                      id="customFile"
                      multiple
                      onChange={onImagesChange}
                    />

                    <label className="custom-file-label" htmlFor="customFile">
                      Chosen Image
                    </label>
                  </div>

                  <div className="image-preview mt-3">
                    {imagesPreview.map((image, index) => (
                      <img
                        className="mr-2 mb-2"
                        key={index}
                        src={image}
                        alt={`Image Preview ${index + 1}`}
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4 mx-5">
                  <label
                    htmlFor="vegetarian_checkbox"
                    style={{ fontSize: '1rem',  color:'white' }}
                  >
                    Is Available
                  </label>
                  <div className="my-2">
                    <input
                      type="checkbox"
                      id="vegetarian_checkbox"
                      checked={isAvailable}
                      onChange={handleCheckboxChange}
                      className="custom-checkbox form-control"
                      style={{
                        display: 'none' // Hide default checkbox
                      }}
                    />
                    <label
                      htmlFor="vegetarian_checkbox"
                      style={{
                        marginTop: '5px',
                        borderRadius: '50%', // Make it round
                        width: '20px', // Adjust the size as needed
                        height: '20px', // Adjust the size as needed
                        cursor: 'pointer',
                        border: '1px solid #333',
                        display: 'inline-block',
                        position: 'relative',
                        backgroundColor: isAvailable ? '#4caf50' : '#fff' // Green background for checked state
                      }}
                    >
                      {isAvailable && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{
                            color: '#fff',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </label>
                  </div>
                </div>

                <div className="mb-4 p-5">
                  <button
                    id="login_button"
                    type="submit"
                    disabled={loading}
                    className="my-global-button px-5 mx-5"
                  >
                    CREATE
                  </button>
                </div>
              </div>
            </div>
          </form>
          {isAddMealCategoryModalOpen && (
            <Modal
              show={isAddMealCategoryModalOpen}
              onHide={() => setAddMealCategoryModalOpen(false)}
              className="my-5"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Meal Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Your Add Meal Category form or content goes here */}
                <Form>
                  <Form.Group controlId="newMealCategoryName">
                    <Form.Label>New Meal Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter meal category name"
                      value={newMealCategoryName}
                      onChange={(e) => setNewMealCategoryName(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="my-global-button"
                  onClick={() => setAddMealCategoryModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  className="my-global-button"
                  onClick={handleViewAllCategories1}
                >
                  View all Category
                </Button>
                <Button
                  className="my-global-button"
                  onClick={handleSaveMealCategory}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          {isAddCategoryModalOpen && (
            <Modal
              show={isAddCategoryModalOpen}
              onHide={() => setAddCategoryModalOpen(false)}
              className="my-5"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Dietary Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Your Add Category form or content goes here */}
                <Form>
                  <Form.Group controlId="newCategoryName">
                    <Form.Label>New Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="my-global-button"
                  onClick={() => setAddCategoryModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  className="my-global-button"
                  onClick={handleViewAllCategories}
                >
                  View all Category
                </Button>
                <Button
                  className="my-global-button"
                  onClick={handleSaveCategory}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {viewCategoryModalOpen && (
            <Modal
              show={viewCategoryModalOpen}
              onHide={() => setViewCategoryModalOpen(false)}
              className="my-5"
            >
              <Modal.Header closeButton>
                <Modal.Title>All Meal Categories</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CategoryList1
                  categories={categories}
                  onDeleteCategory1={handleDeleteCategory1}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="my-global-button"
                  onClick={() => setViewCategoryModalOpen(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {viewCategoryModalOpen1 && (
            <Modal
              show={viewCategoryModalOpen1}
              onHide={() => setViewCategoryModalOpen1(false)}
              className="my-5"
            >
              <Modal.Header closeButton>
                <Modal.Title>All Dietary Categories</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CategoryList
                  categories={categories}
                  onDeleteCategory={handleDeleteCategory}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="my-global-button"
                  onClick={() => setViewCategoryModalOpen1(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </>
    </div>
    </div>
  );
}
