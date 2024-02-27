import { Link } from 'react-router-dom';
// import Sidebar from './Sidebar';
import './dashboard.css';

const DashboardPage = () => {
  return (
    <div className='dashboardMainImg'>
      <div className='container-fluid'>
      <div className="row">
        <div className="col">
          <h1 className="my-4 text-white">Dashboard</h1>
          <div className="row pr-4">
            <div className="col-xl-12 col-sm-12  mb-3">
              <div
                className="card text-white bg-transparent"
              >
                <div className="card-body">
                  <div className="text-center card-font-size">       
                    <h1>Total Amount</h1>
                    {/* <br /> <b>$3425</b> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row  h-100">
            <div className="col-xl-3 col-sm-6 col-lg-6 mb-3">
              <div
                className="card  h-100"
                style={{ backgroundColor: '#D22B2B' }}
              >
                <div className="card-body"  id='Menu' >
                  <div className="text-center text-white card-font-size mt-4">
                    <h2>Menus</h2>
                    {/* <br /> <b>23</b> */}
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/menus" 
                  id="CardBackIMg"
                >
                 <span className="float-center"><h5>View Details</h5></span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div
                className="card text-white o-hidden h-100"
                style={{ backgroundColor: '#D22B2B' }}
              >
                <div className="card-body" id="Order">
                  <div className="text-center card-font-size mt-4">
                    <h2>Orders</h2>
                    {/* <br /> <b>345</b> */}
                  </div>
                </div>
                <Link
                  to="/admin/orders"
                  className="card-footer text-white clearfix small z-1"
                  id="CardBackIMg"
                >
                  <span className="float-left"><h5>View Details</h5></span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div
                className="card text-white o-hidden h-100"
                style={{ backgroundColor: '#D22B2B' }}
              >
                <div className="card-body" id="Users">
                  <div className="text-center card-font-size mt-4"  >
                  <h2>Users</h2>
                    {/* <br /> <b>55</b> */}
                  </div>
                </div>
                <Link
                  to="/admin/users"
                  id="CardBackIMg"
                  className="card-footer text-white clearfix small z-1"
                >
                  <span className="float-left"><h5>View Details</h5></span>
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div
                className="card text-white o-hidden h-100"
                style={{ backgroundColor: '#D22B2B' }}
              >
                <div className="card-body" id="Restaurants">
                  <div className="text-center card-font-size mt-4">
                  <h2>Restaurants</h2>
                    {/* <br /> <b>5</b> */}
                  </div>
                </div>
                <Link
                  to="/admin/restaurants"
                  id="CardBackIMg"
                  className="card-footer text-white clearfix small z-1"
                >
                  <span className="float-left"><h5>View Details</h5>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default DashboardPage;
