/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReviewForm from './PostReview';

// const Reviews = () => {
//   return (
//     <div className="container container-fluid">
//       <div className="reviews w-75">
//         <h3>Reviews:</h3>
//         <hr />
//         <div className="review-card my-3">
//           <div className="rating-outer">
//             <div className="rating-inner" />
//           </div>
//           <p className="review_user">by Test</p>
//           <p className="review_comment">Best Product</p>

//           <hr />
//         </div>
//       </div>
//       <div>
//         <ReviewForm />
//       </div>
//     </div>
//   );
// };

// export default Reviews;
export default function Reviews({ reviews }) {
  return (
    <div>
      <div className="reviews w-75">
        <h3>Reviews:</h3>
        <hr />
        {reviews &&
          reviews.map((review) => (
            <div key={review._id} className="review-card my-3">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(review.rating / 5) * 100}%` }}
                />
              </div>
              <p className="review_user">by {review.user.name}</p>
              <p className="review_comment">{review.comment}</p>

              <hr />
            </div>
          ))}
      </div>
      <div>
        <ReviewForm />
      </div>
    </div>
  );
}
