import React, { Component } from 'react';
import logo from './sd_logo.png';
import './style/App.css';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const expenseIcon = <FontIcon className="material-icons">attach_money</FontIcon>;
const categoryIcon = <FontIcon className="material-icons">settings_applications</FontIcon>;
const aboutusIcon = <FontIcon className="material-icons">account_circle</FontIcon>;
const homeIcon = <FontIcon className="material-icons">home</FontIcon>;

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      selectedIndex: 0
    }
  }

  select = (index) => this.setState({selectedIndex: index});

  render() {
    var bodyHeight = window.innerHeight - this.props.appHeights.appHeaderHeight - this.props.appHeights.appFooterHeight
    return (
      <Paper zDepth={-1}>
        <AppBar 
          title="Expense App"
          style={{boxShadow: '0 4px 10px 0px rgba(0,0,0,0.8)',height: this.props.appHeights.appHeaderHeight}}
          iconElementLeft={ <img src={logo} alt="logo" style={styles.appLogo}/> }>
        </AppBar>
        <Paper style={{height: bodyHeight, overflowY: 'scroll', WebkitOverflowScrolling: 'touch',}}>
          {this.props.children}
        </Paper>
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={styles.bottomNavigation} >
          <Link to="/Home">
            <BottomNavigationItem
              label="Home"
              icon={homeIcon}
              onClick={() => this.select(0)} />
          </Link>
          <Link to="/Expense">
            <BottomNavigationItem
              label="Expenses"
              icon={expenseIcon}
              onClick={() => this.select(1)} />
          </Link>
          <Link to="/Category">
            <BottomNavigationItem
              label="Categories"
              icon={categoryIcon}
              onClick={() => this.select(2)} />
          </Link>
          <Link to="/About">
            <BottomNavigationItem
              label="About Me"
              icon={aboutusIcon}
              onClick={() => this.select(3)} />
          </Link>
        </BottomNavigation>
      </Paper>
    );
  }
}

export default App;

const styles = {
  appLogo: {
    height: 40,
    animation: 'App-logo-spin infinite 20s linear'
  },
  bottomNavigation: {
    backgroundColor: '#26C6DA',
    boxShadow: '0 -4px 10px 0px rgba(0,0,0,0.8)',
  }
}