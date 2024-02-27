/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import Loader from 'layout/Loader';
import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';

const ProductSearch = () => {
  // Local state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [resPerPage, setResPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealTypeCategory, setMealTypeCategory] = useState(null);
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState(null);
  const { keyword } = useParams();
  const dietaryPreferenceCategories = [
    'Vegetarian',
    'Non-vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Other'
  ];
  const mealTypeCategories = [
    'Appetizers',
    'Main Course',
    'Desserts',
    'Beverages',
    'Other'
  ];

  // Other local state variables and functions...

  // Handle page change
  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };
  const getProducts = async (
    keyword,
    dietaryPreferenceCategory,
    mealTypeCategory,
    currentPage
  ) => {
    try {
      setLoading(true);

      let link = `/api/products?restaurantId=${selectedBranch}&page=${currentPage}`;

      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (mealTypeCategory) {
        link += `&mealTypeCategory=${mealTypeCategory}`;
      }
      if (dietaryPreferenceCategory) {
        link += `&dietaryPreferenceCategory=${dietaryPreferenceCategory}`;
      }

      const { data } = await axios.get(link);

      setMenus(data.Menus);
      setProductsCount(data.Count);
      setResPerPage(data.resPerPage);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(
      keyword,
      dietaryPreferenceCategory,
      mealTypeCategory,
      currentPage
    );
  }, [currentPage, keyword, mealTypeCategory, dietaryPreferenceCategory]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mb-5 mt-5">
                <hr className="my-5" />
                {/* Category Filter */}
                <div className="mt-5">
                  <h3 className="mb-3">Dietary Categories</h3>
                  <ul className="pl-0">
                    {dietaryPreferenceCategories.map((category) => (
                      <li
                        style={{
                          cursor: 'pointer',
                          listStyleType: 'none'
                        }}
                        key={category}
                        onClick={() => {
                          setDietaryPreferenceCategory(category);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5">
                  <h3 className="mb-3">Meal Categories</h3>
                  <ul className="pl-0">
                    {mealTypeCategories.map((category) => (
                      <li
                        style={{
                          cursor: 'pointer',
                          listStyleType: 'none'
                        }}
                        key={category}
                        onClick={() => {
                          setMealTypeCategory(category);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-5" />
              </div>
              {/* <div className="col-6 col-md-9">
                <div className="row">
                  {Array.isArray(products) &&
                    products.map((product) => (
                      <Menus col={4} key={product._id} product={product} />
                    ))}
                </div>
              </div> */}
            </div>
          </section>
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
    </>
  );
};

export default ProductSearch;
