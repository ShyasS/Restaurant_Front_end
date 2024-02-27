// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable no-underscore-dangle */
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { useCookies } from 'react-cookie';
// import axios from 'axios';
// import { getmenu } from '../../redux-toolkit/actions/menu';
// import { addToCart } from '../../redux-toolkit/actions/cart';
// import Loader from '../../layout/Loader';
// import MetaData from '../../layout/MetaData';

// const MenuDetails = () => {
//   const { loading, menu } = useSelector((state) => state.menuState);
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const [cookies] = useCookies(['token']);
//   useEffect(() => {
//     dispatch(getmenu(id));
//   }, [dispatch, id]);
//   const addToCart = async () => {
//     try {
//       // Make the API call to add the item to the cart
//       const token = localStorage.getItem('token');
//       await axios.post(`http://localhost:8000/api/item/${token}`, {
//         items: [{ id: menu._id, price: menu.price }],
//         token: cookies.token // Assuming token is the user ID
//       });

//       toast('Cart Item Added!', {
//         type: 'success',
//         position: toast.POSITION.BOTTOM_CENTER
//       });
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       toast.error(error.message, {
//         position: toast.POSITION.BOTTOM_CENTER
//       });
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <MetaData title={menu?.name || 'Menu Details'} />
//           <div className="row f-flex justify-content-around">
//             <div className="col-12 col-lg-5 img-fluid" id="product_image">
//               {/* Add logic for displaying images */}
//               {menu.images && menu.images.length > 0 ? (
//                 <img
//                   src={menu.images[0]}
//                   alt={menu.name || 'Menu'}
//                   height="500"
//                   width="500"
//                 />
//               ) : (
//                 <img
//                   src="https://via.placeholder.com/800x800"
//                   alt="Placeholder"
//                   height="500"
//                   width="500"
//                 />
//               )}
//             </div>

//             <div className="col-12 col-lg-5 mt-5">
//               <h3>{menu.name || 'Menu Name not available'}</h3>
//               <p>{menu.dietaryPreferenceCategory}</p>
//               <p id="product_id">Product # {menu._id || 'ID not available'}</p>

//               <hr />

//               {/* Assuming ratings is a number */}
//               <div className="rating-outer">
//                 <div
//                   className="rating-inner"
//                   style={{
//                     width: `${(menu.ratings / 5) * 100 || 0}%`
//                   }}
//                 />
//               </div>
//               <span id="no_of_reviews">({menu.numOfReviews || 0} Reviews)</span>

//               <hr />

//               <p id="product_price">
//                 {menu.price
//                   ? `$${menu.price.toFixed(2)}`
//                   : 'Price not available'}
//               </p>

//               <button
//                 type="button"
//                 id="cart_btn"
//                 disabled={!menu.isAvailable}
//                 onClick={addToCart}
//                 className="btn btn-primary d-inline ml-4"
//               >
//                 Add to Cart
//               </button>

//               <hr />

//               <p>
//                 Availability:
//                 <span
//                   className={menu.isAvailable ? 'greenColor' : 'redColor'}
//                   id="stock_status"
//                 >
//                   {menu.isAvailable ? ' Available' : ' Not Available'}
//                 </span>
//               </p>
//               <p>
//                 Pre-order Availability:
//                 <span
//                   className={
//                     menu.isPreOrderAvailable ? 'greenColor' : 'redColor'
//                   }
//                   id="stock_status"
//                 >
//                   {menu.isPreOrderAvailable ? ' Available' : ' Not Available'}
//                 </span>
//               </p>

//               <hr />

//               <h4 className="mt-2">Description:</h4>
//               <p>{menu.description || 'Description not available'}</p>
//               <hr />

//               <p id="product_seller mb-3">
//                 Sold by: <strong>{menu.restaurant}</strong>
//               </p>

//               <button
//                 id="review_btn"
//                 type="button"
//                 className="btn btn-primary mt-4"
//                 data-toggle="modal"
//                 data-target="#ratingModal"
//               >
//                 Submit Your Review
//               </button>

//               <div className="row mt-2 mb-5">
//                 {/* Add the modal for submitting a review */}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default MenuDetails;

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useCookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
// import { setUser } from 'redux-toolkit/slices/cart';
import { getmenu } from '../../redux-toolkit/actions/menu';
import { addToCart } from '../../redux-toolkit/actions/cart';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';

const MenuDetails = () => {
  const { loading, menu } = useSelector((state) => state.menuState);
  const { isAuthenticated } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    dispatch(getmenu(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    try {
      const userToken = cookies.token;
      if (isAuthenticated) {
        dispatch(addToCart(userToken, menu._id, menu.price));
        toast('Item added to the cart!', {
          type: 'success',
          position: toast.POSITION.BOTTOM_CENTER
        });
      } else {
        // Display an error toast if the user is not authenticated
        toast.error('Please log in to add items to the cart.', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } catch (error) {
      // Display an error toast if the addToCart action fails
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to the cart. Please try again.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={menu?.name || 'Menu Details'} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              {/* Add logic for displaying images */}
              {menu.images && menu.images.length > 0 ? (
                <img
                  src={menu.images[0]}
                  alt={menu.name || 'Menu'}
                  height="500"
                  width="500"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/800x800"
                  alt="Placeholder"
                  height="500"
                  width="500"
                />
              )}
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{menu.name || 'Menu Name not available'}</h3>
              <p>{menu.dietaryPreferenceCategory}</p>
              <p id="product_id">Product # {menu._id || 'ID not available'}</p>

              <hr />

              {/* Assuming ratings is a number */}
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{
                    width: `${(menu.ratings / 5) * 100 || 0}%`
                  }}
                />
              </div>
              <span id="no_of_reviews">({menu.numOfReviews || 0} Reviews)</span>

              <hr />

              <p id="product_price">
                {menu.price
                  ? `$${menu.price.toFixed(2)}`
                  : 'Price not available'}
              </p>

              <button
                type="button"
                id="cart_btn"
                disabled={!menu.isAvailable}
                onClick={() => handleAddToCart(menu)}
                className="btn btn-primary d-inline ml-4"
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Availability:
                <span
                  className={menu.isAvailable ? 'greenColor' : 'redColor'}
                  id="stock_status"
                >
                  {menu.isAvailable ? ' Available' : ' Not Available'}
                </span>
              </p>
              <p>
                Pre-order Availability:
                <span
                  className={
                    menu.isPreOrderAvailable ? 'greenColor' : 'redColor'
                  }
                  id="stock_status"
                >
                  {menu.isPreOrderAvailable ? ' Available' : ' Not Available'}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{menu.description || 'Description not available'}</p>
              <hr />

              <p id="product_seller mb-3">
                Sold by: <strong>{menu.restaurant}</strong>
              </p>

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                {/* Add the modal for submitting a review */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MenuDetails;
