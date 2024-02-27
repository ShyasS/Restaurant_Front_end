/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Loader from 'layout/Loader';
import React from 'react';
import { Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const FilterPanel = ({
  dietaryCategories,
  mealCategories,
  mealTypeCategory,
  setMealTypeCategory,
  dietaryPreferenceCategory,
  setDietaryPreferenceCategory,
  handleClearFilter,
  productsCount,
  loading
}) => {
  return (
    <div className="col-12">
      <h4 id="products_heading">Category</h4>
      {/* <Button onClick={handleClearFilter}>clear</Button> */}
      {/* <hr /> */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="row"
            style={{
              background: '#red',
              borderRadius: '8px'
            }}
          >
            <div>
              <>
                <h5 className="mb-3 mt-3" style={{ color: 'black' }}>
                  Food Preferences
                </h5>
              </>
              <>
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
                        if (
                          dietaryPreferenceCategory ===
                          category.dietaryPreferenceCategory
                        ) {
                          setDietaryPreferenceCategory(null);
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
              </>
            </div>
            {/* <hr /> */}
            <div className="mt-5">
              <>
                <h5 className="mb-3" style={{ color: 'black' }}>
                  Course
                </h5>
              </>
              <>
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
                        if (mealTypeCategory === category.mealTypeCategory) {
                          setMealTypeCategory(null);
                        } else {
                          setMealTypeCategory(category.mealTypeCategory);
                        }
                      }}
                    >
                      {category.mealTypeCategory}
                    </li>
                  ))}
                </ul>
              </>
            </div>
            {/* <hr className="my-5" /> */}
          </div>
          {/* {productsCount > 0 && productsCount > resPerPage ? (
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
          ) : null} */}
        </>
      )}
    </div>
  );
};

export default FilterPanel;
