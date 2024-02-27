/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card } from 'react-bootstrap';
import './index.css';

const OrderDetails = ({
  orderType,
  handleOrderTypeChange,
  handleText1,
  textBox1
}) => {
  return (
    <Card className="my-3 p-3"id='CardBackIMg'>
      <h4>Order Details</h4>
      <div className="mb-3 address-container">
        <label htmlFor="orderType" className="form-label" style={{color:'black',backgroundColor:'transparent',fontWeight:'500'}}>
          Order Type{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <select
          className="form-select form-select-sm col-xs-2 "
          id="orderType"
          value={orderType}
          onChange={handleOrderTypeChange}
          style={{color:'black',backgroundColor:'transparent'}}
          required
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Pickup"  style={{color:'black',backgroundColor:'transparent'}}>Pickup</option>
          <option value="Delivery" style={{color:'black',backgroundColor:'transparent'}}>Delivery</option>
        </select>
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="orderNotes" className="form-label" style={{color:'white',backgroundColor:'transparent'}}>
          Order Notes
        </label>
        <textarea
          type="text"
          style={{color:'black',backgroundColor:'transparent'}}
          className={`form-control `}
          name="orderNotes"
          value={textBox1}
          onChange={handleText1}
          placeholder="Order Notes"
        />
      </div>
    </Card>
  );
};

export default OrderDetails;
