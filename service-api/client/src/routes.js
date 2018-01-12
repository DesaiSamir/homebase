var React = require('react');
var Router = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
// var hasHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router-dom').IndexRoute;
// var Redirect = require('react-router').Redirect;

var App = require('./App')
var Home = require('./component/Home')

var routes = <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home} />
        </Route>
    </Router>;

module.exports = routes;