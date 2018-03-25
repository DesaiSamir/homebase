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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';


const appHeights = {
    appHeaderHeight : 60,
    pageHeaderHeight: 0,
    pageFooterHeight: 0,
    tableHeight: 115
};

const routes = <Router>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <App appHeights={appHeights}>
                <Route exact path="/" render={(props) => <Home {...props} appHeights={appHeights}/>} />
                <Route path="/Home" render={(props) => <Home {...props} appHeights={appHeights}/>} />
                <Route path="/About" render={(props) => <About {...props} appHeights={appHeights}/>} />
                <Route path="/Category" render={(props) => <Category {...props} appHeights={appHeights}/>} />
                <Route path="/Expense" render={(props) => <Expense {...props} appHeights={appHeights}/>} />
            </App>
        </MuiThemeProvider>
    </Router>;

ReactDOM.render(
    routes,
    document.getElementById('root')
);

registerServiceWorker();
