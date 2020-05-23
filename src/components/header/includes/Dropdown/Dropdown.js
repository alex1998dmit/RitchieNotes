import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    border: '1px solid white',
    borderRadius: '64px',
  },
  button: {
    outline: 'none !important',
    minWidth: 'auto',
    padding: '2px'
  },
  username: {
    margin: '0',
    // marginRight: '1em',
    color: 'white',
    fontSize: '0.9em',
  },
});

const UserDropdown = ({ user, history }) => {
  console.log(user);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenDashboard = e => {
    handleClose();
    history.push('/dashboard');
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        onClick={handleClick}
        aria-controls="user-menu"
        aria-haspopup="true"
        className={classes.button}
      >
        <div className="img-ava" style={{
          backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/2/23/Dennis_Ritchie_2011.jpg)`,
          height: '35px',
          width: '35px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderRadius: '50%',
        }}/>
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenDashboard}>Dashboard</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(UserDropdown);
