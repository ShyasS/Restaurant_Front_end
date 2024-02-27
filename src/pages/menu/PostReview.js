import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const ReviewForm = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      productId,
      rating: parseFloat(rating),
      comment
    };
    // Call the function to submit the review data to the server/API
    onReviewSubmit(newReview);
    // Optionally, you can reset the form fields after submission
    setRating('');
    setComment('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Post a review</h3>
      <Form.Group controlId="rating">
        <Form.Label>Rating:</Form.Label>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="comment">
        <Form.Label>Comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={handleCommentChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit Review
      </Button>
    </Form>
  );
};

export default ReviewForm;
