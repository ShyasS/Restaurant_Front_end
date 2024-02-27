// // Assume this is a React component
// import React, { useState, useEffect } from 'react';

// const LocationComponent = () => {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ latitude, longitude });
//         },
//         (error) => {
//           console.error('Error getting location:', error.message);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by your browser');
//     }
//   }, []);

//   return (
//     <div>
//       {userLocation ? (
//         <p>
//           Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}
//         </p>
//       ) : (
//         <p>Loading location...</p>
//       )}
//     </div>
//   );
// };

// export default LocationComponent;
// Assume this is a React component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocationComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [toastShown, setToastShown] = useState(false);
  const [distance, setDistance] = useState(null);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const findMyCoordinates = async () => {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        // Assuming you want to fetch additional data using the obtained coordinates
        // const bdcAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`;
        const address = ` https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=70348c75b2aa4bd0b91fcba1f9e3a0dc`;
        const response = await axios.get(address);
        const { data } = response;

        console.log(data);
        notifySuccess('Location fetched successfully.');
        setToastShown(true); // Set toastShown to true after displaying the toast

        // Now, make a request to your server for distance calculation
        const distanceResponse = await axios.post('/api/calculate-distance', {
          latitude,
          longitude
        });
        const { distanceInKilometers } = distanceResponse.data;

        setDistance(distanceInKilometers);
      } else {
        notifyError('Geolocation is not supported by your browser');
      }
    } catch (error) {
      console.error('Error getting location:', error.message);
      notifyError(error.message);
    }
  };

  useEffect(() => {
    if (!toastShown) {
      findMyCoordinates();
    }
  }, [toastShown]);

  return (
    <div>
      {userLocation ? (
        <div>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
          {distance !== null && <p>Distance: {distance} kilometers</p>}
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default LocationComponent;
