import React, { Component } from 'react';
import logo from './sd_logo.png';
import './style/App.css';
// import Home from './component/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="app-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="app-title">
            Expense App
          </div>
        </header>
        {/* <div id="content" className="content">
          <Home />      
          <NavLink to="/home" />
          {this.props.children}
        </div>         */}
      </div>
    );
  }
}

export default App;
