import React, { Component } from 'react';
import logo from './sd_logo.png';
import './style/App.css';
import { Link } from 'react-router-dom';
import Sidebar from './common/Sidebar'

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      sidebarOpen: false
    }
  }

  componentDidMount(){

    // this.setState({
    //   sidebarOpen: false
    // });
  }

  handleViewSidebar(){
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  render() {
    

    return (
      <div className="App" >
        <header className="App-header" style={{height: this.props.appHeights.appHeaderHeight - 10}}>
          <div className="app-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="app-title">
            Expense App
          </div>
          <div className="menu" onClick={this.handleViewSidebar.bind(this)}><i className="material-icons">reorder</i>
            <Sidebar isOpen={this.state.sidebarOpen} toggleSidebar={this.handleViewSidebar.bind(this)} >
              <Link to="/Home"><div className="menu-item">Home</div></Link>
              <Link to="/Expense"><div className="menu-item">Expenses</div></Link>
              <Link to="/Category"><div className="menu-item">Category</div></Link>
              <Link to="/About"><div className="menu-item">About Us</div></Link>
            </Sidebar>
          </div>
        </header>
        <div ref="content">
          {this.props.children}
        </div>        
      </div>
    );
  }
}

export default App;
