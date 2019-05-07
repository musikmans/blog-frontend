import React, { Component } from "react";
import Cookies from 'universal-cookie';
import "../Styles/Register.css";

const BASE_URL = `http://localhost:8000/api`;

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          errors: [],
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
        fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(res => {
            const cookies = new Cookies();
            if (res.status === 201) {
                const { action = () => {} } = this.props;
                res.json().then(content => {
                    cookies.set('Authorization', content.data.api_token, { path: '/' });
                    action();
                });
              this.props.history.push('/confirmation');
            } else {
              const error = new Error(res.error);
              res.json().then(content => {
                this.setState({
                    errors: [content.errors]
                });
              });
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
          });
      }

    render() {
        const todoItems = this.state.errors.map((content) => 
        Object.keys(content).map(function(key) {
            return <li>{content[key]}</li>;
        })
        );
        return ( <main className="registerPage">
        <div className="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                <div className="card-body">
                    <h1 className="card-title text-center">Registration</h1>
                    {this.state.errors.length > 0 ? (
                <div className="errors">
                 There's an error with the registration:
                 <ul>
                        {todoItems}
                 </ul>
                </div>
              ) : (
                <></>
              )}
                    <form className="form-signin" onSubmit={this.onSubmit}>
                    <div className="form-label-group">
                        <input type="text" id="name" name="name" className="form-control" placeholder="Full Name" value={this.state.name}
          onChange={this.handleInputChange} required autoFocus />
                        <label htmlFor="name">Full Name</label>
                    </div>
                    <br />
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
                    <div className="form-label-group">
                        <input type="password" id="password_confirmation" name="password_confirmation" className="form-control" placeholder="Retype Password" value={this.state.password_confirmation}
          onChange={this.handleInputChange} required />
                        <label htmlFor="password_confirmation">Retype Password</label>
                    </div>
                    <br />
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
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

export default Register;