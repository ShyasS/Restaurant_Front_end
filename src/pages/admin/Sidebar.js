/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react';
// import './sidebar.scss';

// const Sidebar = () => {
//   return (
//     <div className="row">
//       <div className="sidebar-wrapper">
//         <nav id="sidebar">
//           <ul className="list-unstyled components">
//             <li>
//               <a href="/admin/dashboard">
//                 <i className="fas fa-tachometer-alt" /> Dashboard
//               </a>
//             </li>

//             <li>
//               <a
//                 href="#productSubmenu"
//                 data-toggle="collapse"
//                 aria-expanded="false"
//                 className="dropdown-toggle"
//               >
//                 <i className="fab fa-product-hunt" /> Products
//               </a>
//               <ul className="collapse list-unstyled" id="productSubmenu">
//                 <li>
//                   <a href="#">
//                     <i className="fas fa-clipboard-list" /> All
//                   </a>
//                 </li>

//                 <li>
//                   <a href="#">
//                     <i className="fas fa-plus" /> Create
//                   </a>
//                 </li>
//               </ul>
//             </li>

//             <li>
//               <a href="/admin/orders">
//                 <i className="fas fa-shopping-basket" /> Orders
//               </a>
//             </li>

//             <li>
//               <a href="/admin/users">
//                 <i className="fas fa-users" /> Users
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faTachometerAlt,
  // faBox,
  faShoppingBasket,
  faUsers,
  faHistory,
  faUtensils,
  faStore,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.scss';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="row">
      <div className="sidebar-wrapper">
        <nav id="sidebar">
          <ul className="list-unstyled components">
            <li>
              <Link to="/admin/dashboard">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>

            <li>
              <Link to="/admin/restaurants">
                <FontAwesomeIcon icon={faStore} />
              </Link>
            </li>

            <li>
              <Link to="/admin/menus">
                <FontAwesomeIcon icon={faUtensils} />
              </Link>
            </li>

            <li>
              <Link to="/admin/orders">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </Link>
            </li>

            <li>
              <Link to="/admin/orderHistory">
                <FontAwesomeIcon icon={faHistory} />
              </Link>
            </li>

            <li>
              <Link to="/admin/users">
                <FontAwesomeIcon icon={faUsers} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
