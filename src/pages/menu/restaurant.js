import React from 'react';
import { Link } from 'react-router-dom';

const Restaurant = () => {
  return (
    <div>
      <div id="products" className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4 my-3">
            <div className="card p-3 rounded shadow">
              <img
                className="card-img-top mx-auto"
                src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"
                alt="Product"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3">
                  <a href="#product-details">Branch1</a>
                </h5>
                <div className="ratings mb-2">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{ width: '80%' }} />
                  </div>
                  <span className="text-muted ml-2">(5 Reviews)</span>
                  <h5>Location</h5>
                </div>

                <Link to="/menus" className="btn btn-primary">
                  View Menus
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-3">
            <div className="card p-3 rounded shadow">
              <img
                className="card-img-top mx-auto"
                src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"
                alt="Product"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3">
                  <a href="#product-details">Branch1</a>
                </h5>
                <div className="ratings mb-2">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{ width: '80%' }} />
                  </div>
                  <span className="text-muted ml-2">(5 Reviews)</span>
                  <h5>Location</h5>
                </div>

                <Link to="/menus" className="btn btn-primary">
                  View Menus
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-3">
            <div className="card p-3 rounded shadow">
              <img
                className="card-img-top mx-auto"
                src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"
                alt="Product"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3">
                  <a href="#product-details">Branch1</a>
                </h5>
                <div className="ratings mb-2">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{ width: '80%' }} />
                  </div>
                  <span className="text-muted ml-2">(5 Reviews)</span>
                  <h5>Location</h5>
                </div>

                <Link to="/menus" className="btn btn-primary">
                  View Menus
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-3">
            <div className="card p-3 rounded shadow">
              <img
                className="card-img-top mx-auto"
                src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"
                alt="Product"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3">
                  <a href="#product-details">Branch1</a>
                </h5>
                <div className="ratings mb-2">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{ width: '80%' }} />
                  </div>
                  <span className="text-muted ml-2">(5 Reviews)</span>
                  <h5>Location</h5>
                </div>

                <Link to="/menus" className="btn btn-primary">
                  View Menus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
