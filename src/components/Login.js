import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../Styles/Login.css";

class Login extends Component {
    render() {
        return ( <main className="loginPage">
        <div className="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                <div className="card-body">
                    <h1 className="card-title text-center">Login</h1>
                    <form className="form-signin">
                    <div className="form-label-group">
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="inputEmail">Email address</label>
                    </div>
                    <br />
                    <div className="form-label-group">
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <label htmlFor="inputPassword">Password</label>
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