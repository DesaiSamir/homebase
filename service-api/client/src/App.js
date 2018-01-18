import React, { Component } from 'react';
import logo from './sd_logo.png';
import './style/App.css';

class App extends Component {
  
  render() {
    var contentHeight = window.innerHeight - 50 ;
    
    const { children } = this.props;
    var childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { contentHeight: contentHeight }));

    return (
      <div className="App" >
        <header className="App-header">
          <div className="app-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="app-title">
            Expense App
          </div>
        </header>
        <div ref="content" style={{height: contentHeight}}>
          {childrenWithProps}
        </div>        
      </div>
    );
  }
}

export default App;
