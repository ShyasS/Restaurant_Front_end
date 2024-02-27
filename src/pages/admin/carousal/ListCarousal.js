import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReusableTable from '../../../components/ReusableTable';
import '../index.css';
// import Sidebar from './Sidebar';

const CarousalTable = () => {
  const headers = ['Sl No', 'Carousal Image', 'Carousal Text'];
  const navigate = useNavigate();
  const [carousals, setCarousals] = useState([]);
  const [loading, setLoading] = useState(true);

  const onEdit = (id) => {
    console.log(`Edit restaurant with ID ${id}`);
    navigate(`/admin/updateCarousal/${id}`);
    // navigate(`/admin/updateRestaurant/${id}`);
  };
  const handleAdd = () => {
    navigate('/admin/carousel/new');
  };
  const onDelete = async (id) => {
    try {
      // Make an Axios DELETE request to delete the product
      await axios.delete(`/api/admin/carousel/${id}`);

      // Handle success, e.g., navigate to another page or show a success message
      toast('Product Deleted Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });
    } catch (error) {
      // Handle errors, e.g., show an error message
      toast(error.message || 'An error occurred', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/carousel');
        const { data } = response;

        // Check if the response is successful and contains the expected structure
        if (data.success && Array.isArray(data.data)) {
          setCarousals(data.data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Button onClick={handleAdd} className="btn-custom">
                Add Carosal
              </Button>
              <ReusableTable
                headers={headers}
                data={carousals}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarousalTable;
