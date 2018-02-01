import React, { Component } from 'react';
import requests from '../utils/requestHelper'
import '../style/login.css';

export default class Login extends Component{
    constructor(props, contentHeight){
        super(props);
        // console.log(props)
    }

    onSubmit(e){
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        requests.postData('/login', { username, password })
            .then(({ status }) => {
            if (status === 200) {
                window.location= "/Expense";
            }
            else 
                alert('login failed')
            })
    }

    renderLoginForm(){
        let loginForm = (
            <form className="Login" id="Login" onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <div className="form-input">
                    <input type="text" id="username" ref="username" placeholder="username" />
                    <input type="password" id="password" ref="password" placeholder="password" />
                    <button type="submit" className="loginButton" value="Login">Login</button>
                </div>
            </form>
        );

        return loginForm;
    }

    render(){
        return this.renderLoginForm()
    }
}


