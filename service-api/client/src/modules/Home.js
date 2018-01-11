import React, { Component } from 'react';
import requests from '../utils/requestHelper'

class Home extends Component{
    constructor(props){
        super(props);
    }

    onSubmit(e){
        e.preventDefault();
        console.log("Button Clicked!!")
        const username = ""//Login.querySelector('.username').value
        const password = ""//Login.querySelector('.password').value
        requests.postData('/login', { username, password })
            .then(({ status }) => {
            if (status === 200) alert('login success')
            else alert('login failed')
            })
    }

    renderLoginForm(){
        console.log("Rendering Login Form");
        let loginForm = (
            <form class="Login" id="Login" onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <input type="text" class="username" placeholder="username" />
                <input type="password" class="password" placeholder="password" />
                <input type="submit" value="Login"/>
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

