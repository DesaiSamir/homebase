import React, { Component } from 'react';
import logo from './logo.svg';
import './style/App.css';
import Home from './modules/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Home />
        </p>
      </div>
    );
  }
}

export default App;
