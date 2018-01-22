import React, { Component } from 'react';
import '../style/sidebar.css';

export default class Sidebar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        visible: false
      };
    }

    render(){
      var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
      return <div className={sidebarClass} >
        <div className="sidebar-toggle">
          <div className="menu-title">Menu Items</div>
          {this.props.children.map((item, index) => {
            return <div key={index} className="menu-item">{item}</div>
            })
          }
        </div>
      </div>;
    }

}