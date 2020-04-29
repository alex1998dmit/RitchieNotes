import React, { useEffect } from 'react';
import to from 'await-to-js';
import { connect } from 'react-redux';
import './App.css';
import ListEditor from '../note.edit/list';
import MindTable from '../note.edit/mind.table';
import { Route, Switch } from 'react-router-dom';
import Header from '../header';
import SignUp from '../auth/signup';
import Dashboard from '../auth/dashboard';
import { authActions } from '../../store/actions';

function App({ user, aboutUser }) {
  useEffect(() => {
    const asyncFunctions = async () => {
      const token = localStorage.getItem('token');
      const [err] = await to(aboutUser(token));
      if (err) {
        console.log(err);
        throw err;
      }
    }
    if (localStorage.getItem('token')) {
      asyncFunctions();
      console.log('call user');
    }
  }, [aboutUser]);
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/notes/editors/list" component={ListEditor} />
          <Route exact path="/notes/editors/list" component={MindTable} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user,
  }
};

const mapDispatchToProps = dispatch => ({
  aboutUser: token => dispatch(authActions.aboutUser(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
