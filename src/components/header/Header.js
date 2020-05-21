import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NotesIcon from '@material-ui/icons/Notes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user }) => {
  const isLoggedIn = Object.keys(user).length > 0;
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <div className="left-side">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <NotesIcon />
          </IconButton>
          <Typography variant="h6">
            Ritchie Notes
          </Typography>
        </div>
        <div className="right-side">
          <div className="userdrodown">
            <p className='username'>Alexander Dmitriev</p>
            <div className="img-ava" style={{
              backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/2/23/Dennis_Ritchie_2011.jpg)`,
              height: '35px',
              width: '35px',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: '50%',
            }}/>
          </div>
        </div>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
    // <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ marginBottom: '50px' }}>
    //   <Link to="/" className="navbar-brand">Ritchie Notes</Link>
    //   <div className="collapse navbar-collapse">
    //     {isLoggedIn ? (<ul className="navbar-nav mr-auto">
    //       <li className="nav-item">
    //         {/* <Link className="navbar-brand" to="/notes">Notes</Link> */}
    //         {/* <Link to="/profile" className="navbar-brand">Profile</Link> */}
    //       </li>
    //     </ul>) :
    //     (
    //       <ul className="nav navbar-nav ml-auto">
    //         <li className="nav-item">
    //           <Link to="/signin" className="navbar-brand">Sign In</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link to="/signup" className="navbar-brand">Sign Up</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link to="/signout" className="navbar-brand">Sign Out</Link>
    //         </li>                    
    //       </ul>
    //     )}
    //   </div>
    // </nav>
  );
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(Header);