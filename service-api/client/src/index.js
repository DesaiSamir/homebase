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

const appHeights = {
    appHeaderHeight : 50,
    pageHeaderHeight: 50,
    pageFooterHeight: 50,
    tableHeight: 153
};

const routes = <Router>
        <App appHeights={appHeights}>
            <Route exact path="/" render={(props) => <Home {...props} appHeights={appHeights}/>} />
            <Route path="/Home" render={(props) => <Home {...props} appHeights={appHeights}/>} />
            <Route path="/About" render={(props) => <About {...props} appHeights={appHeights}/>} />
            <Route path="/Category" render={(props) => <Category {...props} appHeights={appHeights}/>} />
            <Route path="/Expense" render={(props) => <Expense {...props} appHeights={appHeights}/>} />
        </App>
    </Router>;

ReactDOM.render(
    routes,
    document.getElementById('root')
);

registerServiceWorker();
