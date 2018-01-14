import React from 'react';
import './style/index.css';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';

var App = require('./App')
var Home = require('./component/Home')
var About = require('./component/About')

const routes = <Router>
        <div>
            <Route path="/" component={App} ></Route>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/About" component={About} />
            
        </div>
    </Router>;

module.exports = routes;