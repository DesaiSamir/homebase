import React, { Component } from 'react';
import requests from '../utils/requestHelper'
import '../style/home.css';

class Home extends Component{
    // constructor(props){
    //     super(props);
    // }

    onSubmit(e){
        e.preventDefault();
        console.log("Button Clicked!!")
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        requests.postData('/login', { username, password })
            .then(({ status }) => {
            if (status === 200) {
                alert('login success')
                window.location = "/home";
            }
            else 
                alert('login failed')
            })
    }

    renderLoginForm(){
        console.log("Rendering Login Form");
        let loginForm = (
            <form class="Login" id="Login" onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <div class="form-input">
                    <input type="text" id="username" ref="username" placeholder="username" />
                    <input type="password" id="password" ref="password" placeholder="password" />
                    <input type="submit" value="Login"/>
                </div>
            </form>
        );

        return loginForm;
    }

    render(){
        console.log("Rendering Home");
        return  <div>
            {this.renderLoginForm()}
        </div>
    }
}

export default Home

