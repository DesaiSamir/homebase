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
// import routes from './routes';
import registerServiceWorker from './service/registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" component={App} ></Route>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Category" component={Category} />
        </div>
    </Router>,
    // <Router routes={routes} />,
    document.getElementById('root')
);

registerServiceWorker();
