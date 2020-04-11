import React from 'react';
import './App.css';
import ListEditor from './components/note.edit/list';
import MindTable from './components/note.edit/mind.table';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/notes/editors/list" component={ListEditor} />
          <Route exact path="/notes/editors/list" component={MindTable} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
