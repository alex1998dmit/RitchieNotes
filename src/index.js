import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <App />
      </Router>        
  </Provider>,
  document.getElementById('root')
);
