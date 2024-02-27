/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';

const CategoryList = ({ categories, onDeleteCategory }) => {
  return (
    <div>
      <h4>All Categories</h4>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.dietaryPreferenceCategory}
            <Button
              className="mx-5"
              variant="danger"
              onClick={() => onDeleteCategory(category._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoryList;
