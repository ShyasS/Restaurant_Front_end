/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryList1 = ({ categories, onDeleteCategory1 }) => {
  return (
    <div>
      <h4>All Categories</h4>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.mealTypeCategory}
            <Button
              variant="danger"
              onClick={() => onDeleteCategory1(category._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoryList1;
