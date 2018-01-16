import React, { Component } from 'react';
import logo from './sd_logo.png';
import './style/App.css';

class App extends Component {

  render() {
    return (
      <div className="App" >
        <header className="App-header" style={{height: 60}}>
          <div className="app-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="app-title">
            Expense App
          </div>
        </header>
        <div className="content" style={{height: window.innerHeight - 80}}>
          {this.props.children}
        </div>        
      </div>
    );
  }
}

export default App;
