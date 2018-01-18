import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';
import App from './App'
import Home from './component/Home'
import About from './component/About';
import Category from './component/Category';
import Expense from './component/Expense';
import registerServiceWorker from './service/registerServiceWorker';


const routes = <Router>
        <App>
            <Route exact path="/" component={Home} />
            <Route path="/About" component={About} />
            <Route path="/Category" component={Category} />
            <Route path="/Expense" component={Expense} />
        </App>
    </Router>;

ReactDOM.render(
    routes,
    document.getElementById('root')
);

registerServiceWorker();
