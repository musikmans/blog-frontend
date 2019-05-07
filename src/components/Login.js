import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import "../Styles/Login.css";

const BASE_URL = `http://localhost:8000/api`;

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => {
      const cookies = new Cookies();
      if (res.status === 200) {
        const { action = () => {} } = this.props;
        res.json().then(content => {
          cookies.set('Authorization', content.api_token, { path: '/' });
          action();
        });
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

    render() {
        return ( <main className="loginPage">
        <div className="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                <div className="card-body">
                    <h1 className="card-title text-center">Login</h1>
                    <form className="form-signin" onSubmit={this.onSubmit}>
                    <div className="form-label-group">
                        <input type="email" id="email" name="email" className="form-control" placeholder="Email address" value={this.state.email}
          onChange={this.handleInputChange} required autoFocus />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <br />
                    <div className="form-label-group">
                        <input type="password" id="password" name="password" className="form-control" placeholder="Password" value={this.state.password}
          onChange={this.handleInputChange} required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <br />
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                    <hr className="my-4" />
                    <h5 className="text-center">Don't have an account yet? <Link to="/register" className="registerlink">Register here</Link></h5>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </main>
        );
    }
}

export default Login;