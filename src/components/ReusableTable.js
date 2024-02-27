/* eslint-disable no-nested-ternary */
// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable jsx-a11y/control-has-associated-label */
// /* eslint-disable no-underscore-dangle */
// /* eslint-disable react/no-array-index-key */
// /* eslint-disable react/prop-types */
// import React from 'react';
// import { Table, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './ReusableTable.css';

// const ReusableTable = ({
//   headers,
//   data,
//   onEdit,
//   onUpdate,
//   update,
//   onDelete,
//   onAddMenu,
//   onViewDetails
// }) => {
//   if (!Array.isArray(data)) {
//     // If data is not an array, display a message
//     return <div>No data available</div>;
//   }

//   return (
//     <Table bordered responsive className="custom-table mt-4">
//       <thead className="table-head">
//         <tr>
//           {headers.map((header) => (
//             <th key={header}>{header}</th>
//           ))}
//           {onEdit && <th>Update</th>}
//           {onUpdate && <th> Update</th>}
//           {update && <th> View</th>}
//           {onViewDetails && <th> View</th>}
//           {onDelete && <th>Delete</th>}
//           {onAddMenu && <th>Add Menu</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, i) => (
//           <tr key={item._id}>
//             {headers.map((header) => {
//               if (header === 'Sl No') {
//                 return <td key={header}>{i + 1}</td>;
//               }
//               if (header === 'Restaurant ID') {
//                 return <td key={header}>{item._id}</td>;
//               }
//               if (header === 'Order ID') {
//                 return <td key={header}>{item._id}</td>;
//               }
//               if (header === 'Carousal Image') {
//                 return (
//                   <td key={header}>
//                     <img
//                       src={item.images[0].image}
//                       alt="Carousel"
//                       style={{ width: '75px', height: 'auto' }}
//                     />
//                   </td>
//                 );
//               }
//               if (header === 'Carousal Text') {
//                 return <td key={header}>{item.text}</td>;
//               }
//               if (header === 'Branch ID') {
//                 return <td key={header}>{item.restaurantId}</td>;
//               }
//               if (header === 'Restaurant Branch ID') {
//                 return <td key={header}>{item.restaurantName}</td>;
//               }
//               if (header === 'Restaurant Branch') {
//                 return <td key={header}>{item.restaurantBranch}</td>;
//               }
//               if (header === 'User ID') {
//                 return <td key={header}>{item._id}</td>;
//               }
//               if (header === 'Status') {
//                 return <td key={header}>{item.orderStatus}</td>;
//               }
//               if (header === 'Pickup/Delivery Time') {
//                 return <td key={header}>{item.selectedTimeSlot}</td>;
//               }
//               if (header === 'Category') {
//                 return (
//                   <td key={header}>
//                     <div>
//                       {' '}
//                       <b>MealType: </b> {item.mealTypeCategory},
//                     </div>
//                     <div>
//                       {' '}
//                       <b>Dietary Preference: </b>{' '}
//                       {item.dietaryPreferenceCategory}
//                     </div>
//                   </td>
//                 );
//               }
//               if (header === 'Menu Name') {
//                 return <td key={header}>{item.name}</td>;
//               }
//               if (header === 'Customer') {
//                 return <td key={header}>{item.shipping.name}</td>;
//               }
//               // Use a fallback value if the property is not found
//               return (
//                 <td key={header}>{item[header.toLowerCase()] || 'N/A'}</td>
//               );
//             })}
//             {onUpdate && (
//               <td>
//                 <Button
//                   className="btn-custom with-border-radius"
//                   onClick={() => onUpdate(item._id)}
//                 >
//                   <FontAwesomeIcon icon={faEdit} />
//                 </Button>
//               </td>
//             )}
//             {update && (
//               <td>
//                 <Button className="btn-custom" onClick={() => update(item._id)}>
//                   Update
//                 </Button>
//               </td>
//             )}
//             {onEdit && (
//               <td>
//                 <Button
//                   className="btn-custom with-border-radius"
//                   onClick={() => onEdit(item._id)}
//                 >
//                   <FontAwesomeIcon icon={faEye} />
//                 </Button>
//               </td>
//             )}

//             {onDelete && (
//               <td>
//                 <Button
//                   className="btn-custom with-border-radius"
//                   onClick={() => onDelete(item._id)}
//                 >
//                   <FontAwesomeIcon icon={faTrash} />
//                 </Button>
//               </td>
//             )}
//             {onViewDetails && (
//               <td>
//                 <Button
//                   className="btn-custom with-border-radius"
//                   onClick={() => onViewDetails(item._id)}
//                 >
//                   <FontAwesomeIcon icon={faEye} />
//                 </Button>
//               </td>
//             )}
//             {onAddMenu && (
//               <td>
//                 <Button
//                   className="btn-custom"
//                   onClick={() => onAddMenu(item._id)}
//                 >
//                   Add Menu
//                 </Button>
//               </td>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

// export default ReusableTable;

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ReusableTable.css';

const ReusableTable = ({
  headers,
  data,
  onEdit,
  onUpdate,
  update,
  onDelete,
  onAddMenu,
  onViewDetails
}) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);

  const handleSort = (column) => {
    setSortOrder(
      column === sortedColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    );
    setSortedColumn(column);
  };
  const mapHeaderToProperty = (header) => {
    switch (header) {
      case 'Menu Name':
        return 'name';
      case 'Name':
        return 'name';
      case 'Price':
        return 'price';
      case 'Customer':
        return 'customer'; // Replace with the actual property name for 'Sl No'
      case 'Restaurant ID':
        return '_id'; // Replace with the actual property name for 'Restaurant ID'
      case 'Restaurant Branch':
        return 'restaurantBranch';
      // Add more cases as needed

      default:
        // Default to the header itself (converted to lowercase)
        return header.toLowerCase();
    }
  };

  const renderTableData = () => {
    const sortedData = data.slice().sort((a, b) => {
      if (sortedColumn === 'name') {
        const fullNameA = `${a.name} ${a.lastName}`;
        const fullNameB = `${b.name} ${b.lastName}`;

        return sortOrder === 'asc'
          ? fullNameA.localeCompare(fullNameB)
          : fullNameB.localeCompare(fullNameA);
      }
      if (sortedColumn === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sortedColumn === 'restaurantBranch') {
        return sortOrder === 'asc'
          ? a.restaurantBranch.localeCompare(b.restaurantBranch)
          : b.restaurantBranch.localeCompare(a.restaurantBranch);
      }
      if (sortedColumn === 'customer') {
        return sortOrder === 'asc'
          ? a.shipping.name.localeCompare(b.shipping.name)
          : b.shipping.name.localeCompare(a.shipping.name);
      }
      if (sortedColumn === 'role') {
        return sortOrder === 'asc'
          ? a.role.localeCompare(b.role)
          : b.role.localeCompare(a.role);
      }
      // Add additional cases for other columns if needed
      return 0;
    });

    return sortedData.map((item, i) => (
      <tr style={{backgroundColor:'transparent'}}  key={item._id}>
        {headers.map((header) => {
          if (header === 'Sl No') {
            return <td key={header}>{i + 1}</td>;
          }
          if (header === 'Restaurant Address') {
            return (
              <td key={header}>
                {item.address.line1}, {item.address.line2}, {item.address.city},{' '}
                {item.address.state}, {item.address.postalCode},{' '}
                {item.address.country}
              </td>
            );
          }
          if (header === 'Order ID') {
            return <td key={header}>{item._id}</td>;
          }
          if (header === 'Carousal Image') {
            return (
              <td key={header}>
                <img
                  src={item.images[0].image}
                  alt="Carousel"
                  style={{ width: '75px', height: 'auto' }}
                />
              </td>
            );
          }
          if (header === 'Carousal Text') {
            return <td key={header}>{item.text}</td>;
          }
          if (header === 'Branch ID') {
            return <td key={header}>{item.restaurantId}</td>;
          }
          if (header === 'Restaurant Branch ID') {
            return <td key={header}>{item.restaurantName}</td>;
          }
          if (header === 'Opening Hours') {
            return <td key={header}>{item.openingHours}</td>;
          }
          // if (header === 'Restaurant Branch') {
          //   return <td key={header}>{item.restaurantBranch}</td>;
          // }
          if (header === 'Restaurant Branch') {
            return (
              <td key={header} onClick={() => handleSort('restaurantBranch')}>
                {item.restaurantBranch}{' '}
                {/* {sortedColumn === 'restaurantBranch' && sortOrder === 'asc'
                  ? ' ↑'
                  : ' ↓'} */}
              </td>
            );
          }
          if (header === 'User ID') {
            return <td key={header}>{item._id}</td>;
          }
          if (header === 'Status') {
            return <td key={header}>{item.orderStatus}</td>;
          }
          if (header === 'Pickup/Delivery Time') {
            return <td key={header}>{item.selectedTimeSlot}</td>;
          }
          if (header === 'Order Date') {
            return <td key={header}>{item.createdAt}</td>;
          }
          if (header === 'Phone No') {
            return <td key={header}>{item.shipping.phone}</td>;
          }
          if (header === 'Email Address') {
            return <td key={header}>{item.shipping.email}</td>;
          }
          if (header === 'Category') {
            return (
              <td key={header}>
                <div>
                  {' '}
                  <b>MealType: </b> {item.mealTypeCategory},
                </div>
                <div>
                  {' '}
                  <b>Dietary Preference: </b> {item.dietaryPreferenceCategory}
                </div>
              </td>
            );
          }
          if (header === 'Menu Name') {
            return (
              <td  key={header} onClick={() => handleSort('name')}>
                {item.name}{' '}
                {/* {sortedColumn === 'name' && sortOrder === 'asc' ? ' ↑' : ' ↓'} */}
              </td>
            );
          }
          if (header === 'Name') {
            return (
              <div style={{backgroundColor:'transparent',border:'none'}} >
              <td  key={header} onClick={() => handleSort('name')}>
                {item.name} {item.lastName}
                {/* {sortedColumn === 'name' && sortOrder === 'asc' ? ' ↑' : ' ↓'} */}
              </td>
              </div>
            );
          }
          if (header === 'Role') {
            return (
              <td key={header} onClick={() => handleSort('role')}>
                {item.role}{' '}
                {/* {sortedColumn === 'role' && sortOrder === 'asc' ? ' ↑' : ' ↓'} */}
              </td>
            );
          }
          if (header === 'Customer') {
            return (
              <td key={header} onClick={() => handleSort('customer')}>
                {item.shipping.name}{' '}
                {/* {sortedColumn === 'customer' && sortOrder === 'asc'
                  ? ' ↑'
                  : ' ↓'} */}
              </td>
            );
          }
          // Use a fallback value if the property is not found
          return <td key={header}>{item[header.toLowerCase()] || 'N/A'}</td>;
        })}
        {onUpdate && (
          <td >
            <Button
              className="my-global-button"
              onClick={() => onUpdate(item._id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </td>
        )}
        {update && (
          <td>
            <Button
              className="my-global-button"
              onClick={() => update(item._id)}
            >
              Update
            </Button>
          </td>
        )}
        {onEdit && (
          <td>
            <Button
              className="my-global-button"
              onClick={() => onEdit(item._id)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </td>
        )}

        {onDelete && (
          <td>
            <Button
              className="my-global-button"
              onClick={() => onDelete(item._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </td>
        )}
        {onViewDetails && (
          <td>
            <Button
              className="my-global-button with-border-radius"
              onClick={() => onViewDetails(item._id)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </td>
        )}
        {onAddMenu && (
          <td>
            <Button
              className="my-global-button"
              onClick={() => onAddMenu(item._id)}
            >
              Add Menu
            </Button>
          </td>
        )}
      </tr>
    ));
  };

  return (
    <div >
    <Table bordered responsive className=" mt-4 text-center w-100 " >
      <thead className="table-head" id="CardBackIMg">
        <tr >
          {headers.map((header) => (
            <th
              key={header}
              onClick={() => handleSort(mapHeaderToProperty(header))}
            >
              {header}
              {/* {mapHeaderToProperty(header) !== 'Sl No' &&
              mapHeaderToProperty(header) !== 'Category' &&
              sortOrder === 'asc'
                ? ' ↑'
                : ' ↓'} */}
            </th>
          ))}
          {onEdit && <th>Update</th>}
          {onUpdate && <th> Update</th>}
          {update && <th> View</th>}
          {onViewDetails && <th> View</th>}
          {onDelete && <th>Delete</th>}
          {onAddMenu && <th>Add Menu</th>}
        </tr>
      </thead>
      <tbody >{renderTableData()}</tbody>
    </Table>
    </div>
  );
};

export default ReusableTable;
