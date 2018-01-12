import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import App from './App'
import Home from './component/Home'
// import routes from './routes';
import registerServiceWorker from './service/registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} ><Route path="/home" children={Home} /></Route>
                {/* <Route path="/home" component={Home} /> */}
            
        </div>
    </Router>,
    // routes,
    document.getElementById('root')
);

registerServiceWorker();
