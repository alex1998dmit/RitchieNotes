import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

 const Header = ({ user }) => {
  const isLoggedIn = Object.keys(user).length > 0;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '50px' }}>
      <Link to="/" className="navbar-brand">Ritchie Notes</Link>
      <div className="collapse navbar-collapse">
        {isLoggedIn ? (<ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="navbar-brand" to="/notes">Notes</Link>
            <Link to="/profile" className="navbar-brand">Profile</Link>
          </li>
        </ul>) :
        (
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/signin" className="navbar-brand">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="navbar-brand">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link to="/signout" className="navbar-brand">Sign Out</Link>
            </li>                    
          </ul>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(Header);