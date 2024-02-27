/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
import './index.css';

const MenuList = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { restaurantId } = user;
  const { role } = user;
  const [menuData, setMenuData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(restaurantId || 'all');
  // const { id: productId } = useParams();
  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  // const {role} = user;
  const fetchOrders = async () => {
    try {
      let response;

      if (selectedBranch === 'all') {
        response = await axios.get('/api/admin/products');
      } else {
        const restaurantId = { restaurantId: selectedBranch };
        response = await axios.post('/api/admin/products/branch', restaurantId);
      }

      // Extract the menus array from the response, handling both object and array responses
      const menus = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      setMenuData(menus || []);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedBranch]);

  const handleAdd = () => {
    navigate('/admin/createMenu');
  };

  const handleEdit = (menuId) => {
    // Implement edit functionality here
    navigate(`/admin/updateMenu/${menuId}`);
    // console.log(`Edit menu item with ID ${menuId}`);
  };

  const handleDelete = async (menuId) => {
    try {
      // Make an Axios DELETE request to delete the product
      await axios.delete(`/api/admin/product/${menuId}`);
      fetchOrders();
      // Handle success, e.g., navigate to another page or show a success message
      toast('Product Deleted Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      // Optionally, navigate to another page after successful deletion
      // history.push('/some-other-page');
    } catch (error) {
      // Handle errors, e.g., show an error message
      toast(error.message || 'An error occurred', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  const headers = [
    'Sl No',
    'Menu Name',
    'Price',
    'Category',
    'Restaurant Branch'
  ];

  return (
    <div className="MenuHeaderMain">
      <div className='container-fluid'>
      <div className="row">
        <div className="col">
          {/* <SearchBar handleSearch={handleSearch} /> */}
          <div className="col-12 col-lg-3 mt-5">
            <div className="form-group">
              {role !== 'admin' && (
                <div className="form-group">
                  <h4 className="my-4 text-white">Select branch</h4>
                  <select
                    className="form-control"
                    name="status"
                    value={selectedBranch}
                    onChange={handleBranchChange}
                  >
                    <option value="all">All</option>
                    <option value="1000010">Branch-A</option>
                    <option value="1000011">Branch-B</option>
                    <option value="1000012">Branch-C</option>
                  </select>
                </div>
              )}
            </div>
            {/* Remove the Submit button as it's no longer needed */}
          </div>
          <Button className=" my-global-button" onClick={handleAdd}>
            Add Menu
          </Button>
          <ReusableTable
            headers={headers}
            data={menuData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default MenuList;
