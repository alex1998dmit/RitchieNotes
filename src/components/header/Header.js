import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotesIcon from '@material-ui/icons/Notes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserDropdown from './includes/Dropdown';

const useStyles = makeStyles({
  root: {
    marginBottom: '3em',
    display: 'flex',
    padding: '0 1em',
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    width: '50%',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'flex-end',
    '& .auth-links': {
      width: '100%',
      textAlign: 'right',
      '& .auth-link': {
        color: 'white',
        paddingLeft: '1em',
      },
    }
  },
});

const Header = ({ user }) => {
  const isLoggedIn = Object.keys(user).length > 0;
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <div className={classes.leftSide}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <NotesIcon />
          </IconButton>
          <Typography variant="h6">
            Ritchie Notes
          </Typography>
        </div>
        <div className={classes.rightSide}>
          {isLoggedIn ?
            <UserDropdown user={user} /> :
            (
              <div className="auth-links">
                <Link className="auth-link" to="/signin">SignIn</Link>
                <Link className="auth-link" to="/signup">SignUp</Link>
              </div>
            )
          }
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(Header);