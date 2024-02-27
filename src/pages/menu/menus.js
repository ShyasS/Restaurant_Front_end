/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useCookies } from 'react-cookie';
// import { Button, Modal } from 'react-bootstrap';
// // import { getmenu } from 'redux-toolkit/actions/menu';
// // import { useParams } from 'react-router-dom';
// import { addToCart } from '../../redux-toolkit/actions/cart';

// const Menus = () => {
//   const [menus, setMenus] = useState([]);
//   const { isAuthenticated } = useSelector((state) => state.authState);
//   const dispatch = useDispatch();
//   // const { id } = useParams();
//   const [cookies] = useCookies(['token']);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedMenuItem, setSelectedMenuItem] = useState(null);
//   const branch = localStorage.getItem('zipCode');

//   const handleAddToCart = async (menuItem) => {
//     try {
//       const userToken = cookies.token;
//       if (isAuthenticated) {
//         await dispatch(addToCart(userToken, menuItem._id, menuItem.price));
//         toast('Item added to the cart!', {
//           type: 'success',
//           position: toast.POSITION.BOTTOM_CENTER
//         });
//       } else {
//         toast.error('Please log in to add items to the cart.', {
//           position: toast.POSITION.BOTTOM_CENTER
//         });
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error.response);
//       toast.error('Failed to add item to the cart. Please try again.', {
//         position: toast.POSITION.BOTTOM_CENTER
//       });
//     }
//   };

//   const handleViewDetails = (selectedMenu) => {
//     setSelectedMenuItem(selectedMenu);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   useEffect(() => {
//     const fetchMenus = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/admin/products`
//         );
//         setMenus(response.data.data);
//       } catch (error) {
//         console.error('Error fetching menus:', error.response.data);
//       }
//     };

//     fetchMenus();
//   }, [branch]);

//   return (
//     <div>
//       <div id="products" className="container mt-5">
//         <div className="row">
//           {menus.map((menuItem) => (
//             <div
//               key={menuItem._id}
//               className="col-sm-12 col-md-6 col-lg-4 my-3"
//             >
//               <div className="card p-3 rounded shadow">
//                 <h5 className="card-title mb-3">{menuItem.name}</h5>
//                 <img
//                   className="card-img-top mx-auto"
//                   src={
//                     menuItem.images.length > 0
//                       ? menuItem.images[0]
//                       : 'https://via.placeholder.com/75x50'
//                   }
//                   alt={menuItem.name}
//                 />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title mb-3">
//                     <a href="#product-details">{menuItem.mealTypeCategory}</a>
//                   </h5>
//                   <div className="ratings mb-2">
//                     <div className="rating-outer">
//                       <span className="text-muted ml-2">
//                         {menuItem.description}...
//                       </span>
//                       <span
//                         className="pointer"
//                         onClick={() => handleViewDetails(menuItem)}
//                       >
//                         View Details{' '}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="price mb-3">${menuItem.price.toFixed(2)}</div>
//                   <button
//                     type="button"
//                     id="cart_btn"
//                     disabled={!menuItem.isAvailable}
//                     onClick={() => handleAddToCart(menuItem)}
//                     className="btn  d-inline ml-4"
//                     style={{ backgroundColor: '#ffa500' }}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Menu Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedMenuItem && (
//             <>
//               <h3>{selectedMenuItem.name}</h3>
//               <p>{selectedMenuItem.description}</p>
//               <p>Price: ${selectedMenuItem.price.toFixed(2)}</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Menus;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const branch = localStorage.getItem('zipCode');
  // const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const handleAddToCart = (menuItem) => {
    try {
      // Retrieve existing cart items from session storage
      const existingCartItems =
        JSON.parse(localStorage.getItem('cartItems')) || [];

      // Check if the item is already in the cart
      const isItemInCart = existingCartItems.some(
        (item) => item._id === menuItem._id
      );

      if (isItemInCart) {
        toast.warning('Item is already in the cart.', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      } else {
        // Update the local session storage with the selected item
        const updatedCartItems = [...existingCartItems, menuItem];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        toast.success('Item added to the cart!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to the cart. Please try again.', {
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

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // Fetch menus from the provided API endpoint
        const response = await axios.get(
          'http://localhost:8000/api/admin/products'
        );
        setMenus(response.data.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, [branch]);

  return (
    <div>
      <div id="products" className="container mt-5">
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
                {/* {menuItem.images.length > 0 && (
                  <img
                    className="card-img-top mx-auto"
                    src={menuItem.images[0].image}
                    alt={menuItem.name}
                  />
                )} */}
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
              <p>Description: ${selectedMenuItem.description}</p>
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
