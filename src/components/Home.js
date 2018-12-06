import React from 'react';
import { Link } from 'react-router-dom';

import pic from '../images/wireless.jpg';

function Home() {
  return (
    <div className="row justify-content-lg-between align-items-lg-center py-5">
      <div className="col-lg-6">
        <h1 className="display-4">Never Compromise on Identity</h1>
        <p className="lead mb-4">
          We provide a universal authentication & authorization platform for
          web, mobile and legacy applications..
        </p>
        <Link className="btn btn-pill btn-primary" role="button" to="/app">
          Learn more
        </Link>
      </div>
      <div className="col-lg-6">
        <img
          className="d-none d-lg-block img-fluid img-thumbnail"
          alt="Workspace"
          src={pic}
        />
      </div>
    </div>
  );
}

export default Home;
