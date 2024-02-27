/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useState } from 'react';
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
// import '../../pages/order/shippingInfo/index.css';

// const MyTimePicker = () => {
//   const [time, setTime] = useState('12:00');

//   const handleTimeChange = (newTime) => {
//     setTime(newTime);
//     sessionStorage.setItem('time', JSON.stringify(newTime));
//   };

//   return (
//     <div
//       className="row address-container"
//       style={{ margin: '20px auto', textAlign: 'center' }}
//     >
//       <label>
//         Choose a time:{' '}
//         <span className="text-danger">
//           {' '}
//           <b>*</b>
//         </span>
//       </label>
//       <TimePicker onChange={handleTimeChange} value={time} />
//       <div className="address-container">
//         <label>Selected time: {time}</label>
//       </div>
//     </div>
//   );
// };

// export default MyTimePicker;
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import '../../pages/order/shippingInfo/index.css';

const MyTimePicker = ({ handleTimeChange, time, isTimeWithinSlot }) => {
  return (
    <div
      className="row address-container"
      style={{ margin: '20px auto', textAlign: 'center' }}
    >
      <label>
        Choose a time:{' '}
        <span className="text-danger">
          {' '}
          <b>*</b>
        </span>
      </label>
      <TimePicker onChange={handleTimeChange} value={time} />
      <div className="address-container">
        <label>Selected time: {time}</label>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => isTimeWithinSlot()}
      >
        Confirm Time
      </button>
    </div>
  );
};

export default MyTimePicker;
