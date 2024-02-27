/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal, Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from 'layout/Loader';

const Menus = ({ branch, onAddToCart }) => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const selectedBranch = localStorage.getItem('restaurantId');
  const [productsCount, setProductsCount] = useState(0);
  const [resPerPage, setResPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealTypeCategory, setMealTypeCategory] = useState(null);
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState(null);
  const [dietaryCategories, setDietaryCategories] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { keyword } = useParams();

  const handleAddToCart = (menuItem) => {
    const isItemInCart = onAddToCart(menuItem);

    if (isItemInCart) {
      toast.warning('Item is already in the cart.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else {
      toast.success('Item added to the cart!', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  const handleViewDetails = (selectedMenu) => {
    setSelectedMenuItem(selectedMenu);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getProducts = async (
    keyword,
    dietaryPreferenceCategory,
    mealTypeCategory,
    currentPage
  ) => {
    try {
      setLoading(true);
      let link = `http://localhost:8000/api/products?restaurantId=${selectedBranch}&page=${currentPage}`;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (mealTypeCategory) {
        link += `&mealTypeCategory=${mealTypeCategory}`;
      }
      if (dietaryPreferenceCategory) {
        link += `&dietaryPreferenceCategory=${dietaryPreferenceCategory}`;
      }
      const response = await axios.get(link);
      setMenus(response.data.Menus);
      setProductsCount(response.data.Count);
      setResPerPage(response.data.resPerPage);
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching menus:', error);
      setLoading(false);
      //    toast.warning('No menus available!', {
      //     position: toast.POSITION.BOTTOM_CENTER,
      //     autoClose: 3000
      //   });
      setMealTypeCategory(null);
      setDietaryPreferenceCategory(null);
    }
  };
  const handleClearFilter = () => {
    setMealTypeCategory(null);
    setDietaryPreferenceCategory(null);
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };
  const handleSearchChange = (e) => {
    // Update the search term when the input changes
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Trigger a new API call when the search is submitted
    getProducts(
      searchTerm,
      dietaryPreferenceCategory,
      mealTypeCategory,
      currentPage
    );
    setSearchTerm('');
  };
  useEffect(() => {
    // Fetch products when component mounts
    getProducts(
      keyword,
      dietaryPreferenceCategory,
      mealTypeCategory,
      currentPage
    );
  }, [
    currentPage,
    keyword,
    mealTypeCategory,
    dietaryPreferenceCategory,
    branch
  ]);
  useEffect(() => {
    // Fetch dietary categories from API
    axios
      .get('/api/dietary-preferences')
      .then((response) => setDietaryCategories(response.data.data))
      .catch((error) =>
        // console.error('Error fetching dietary categories:', error)
        toast.error('Error fetching dietary categories')
      );

    // Fetch meal categories from API
    axios
      .get('/api/meal-types')
      .then((response) => setMealCategories(response.data.data))
      .catch((error) =>
        // console.error('Error fetching meal categories:', error)
        toast.error('Error fetching meal categories')
      );
  }, []);
  return (
    <div className="row">
      <div className="col-2">
        <h4 id="products_heading">Category</h4>
        {/* <Button onClick={handleClearFilter}>clear</Button> */}
        <hr />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="row">
              <div>
                <h5 className="mb-3 mt-3">Food Preferences</h5>
                <ul className="pl-0">
                  {dietaryCategories.map((category) => (
                    <li
                      style={{
                        cursor: 'pointer',
                        listStyleType: 'none',
                        color:
                          dietaryPreferenceCategory ===
                          category.dietaryPreferenceCategory
                            ? 'red'
                            : 'black' // Highlight color
                      }}
                      key={category._id}
                      onClick={() => {
                        // Toggle filter when clicked again
                        if (
                          dietaryPreferenceCategory ===
                          category.dietaryPreferenceCategory
                        ) {
                          setDietaryPreferenceCategory(null); // Clear the filter
                        } else {
                          setDietaryPreferenceCategory(
                            category.dietaryPreferenceCategory
                          );
                        }
                      }}
                    >
                      {category.dietaryPreferenceCategory}
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="mt-5">
                <h5 className="mb-3">Course</h5>
                <ul className="pl-0">
                  {mealCategories.map((category) => (
                    <li
                      style={{
                        cursor: 'pointer',
                        listStyleType: 'none',
                        color:
                          mealTypeCategory === category.mealTypeCategory
                            ? 'red'
                            : 'black'
                      }}
                      key={category._id}
                      onClick={() => {
                        // Toggle filter when clicked again
                        if (mealTypeCategory === category.mealTypeCategory) {
                          setMealTypeCategory(null); // Clear the filter
                        } else {
                          setMealTypeCategory(category.mealTypeCategory);
                        }
                      }}
                    >
                      {category.mealTypeCategory}
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="my-5" />
            </div>
            {productsCount > 0 && productsCount > resPerPage ? (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  onChange={handlePageChange}
                  totalItemsCount={productsCount}
                  itemsCountPerPage={resPerPage}
                  nextPageText="Next"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            ) : null}
          </>
        )}
      </div>
      <div id="products" className="col-10">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchSubmit}>Search</button>
        <div className="row">
          {menus.map((menuItem) => (
            <div
              key={menuItem._id}
              className="col-sm-12 col-md-6 col-lg-4 my-3"
            >
              <div className="card p-3 rounded shadow">
                <h5 className="card-title mb-3">{menuItem.name}</h5>
                <img
                  className="card-img-top mx-auto"
                  src={
                    menuItem.images.length > 0
                      ? menuItem.images[0].image
                      : 'https://via.placeholder.com/75x50'
                  }
                  alt={menuItem.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-3">
                    <a href="#product-details">{menuItem.mealTypeCategory}</a>
                  </h5>
                  <div className="ratings mb-2">
                    <div className="rating-outer">
                      <span className="text-muted ml-2">
                        {menuItem.description}...
                      </span>
                      <span
                        className="pointer"
                        onClick={() => handleViewDetails(menuItem)}
                      >
                        View Details{' '}
                      </span>
                    </div>
                  </div>
                  <div className="price mb-3">${menuItem.price.toFixed(2)}</div>
                  <button
                    type="button"
                    id="cart_btn"
                    disabled={!menuItem.isAvailable}
                    onClick={() => handleAddToCart(menuItem)}
                    className="btn  d-inline ml-4"
                    style={{ backgroundColor: '#ffa500' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Menu Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMenuItem && (
            <>
              <h3>{selectedMenuItem.name}</h3>
              <p>Price: ${selectedMenuItem.price.toFixed(2)}</p>
              <p>Description: {selectedMenuItem.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menus;
