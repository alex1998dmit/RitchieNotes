import React from 'react';
import './App.css';
import ListEditor from '../note.edit/list';
import MindTable from '../note.edit/mind.table';
import { Route, Switch } from 'react-router-dom';
import Header from '../header';
import SignUp from '../auth/signup';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/notes/editors/list" component={ListEditor} />
          <Route exact path="/notes/editors/list" component={MindTable} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
