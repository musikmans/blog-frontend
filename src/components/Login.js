import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Session } from "../requests";
import "../Styles/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          errors: []
        };
    
        this.createSession = this.createSession.bind(this);
      }
    
      createSession(event) {
        event.preventDefault();
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);
    
        Session.create({
          email: formData.get("email"),
          password: formData.get("password"),
        }).then(data => {
          const { onSignIn = () => {} } = this.props;
    
          if (typeof data.id === "number") {
            this.props.history.push("/");
    
            onSignIn();
          } else {
            this.setState({ errors: [{ message: "Wrong email or password!" }] });
          }
          // The `history` prop is passed to components rendenred by the
          // <Route> component. This `history` allows us to manipulate
          // the history of the browser including simulating redirects,
          // pressing back or forward, etc.
        });
      }

    render() {
        const { errors } = this.state;

        return ( <main className="loginPage">
        <div className="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                <div className="card-body">
                    <h1 className="card-title text-center">Login</h1>
                    <form className="form-signin" onSubmit={this.createSession}>
                    {errors.length > 0 ? (
                        <div className="FormErrors">
                        {errors.map(e => e.message).join(", ")}
                        </div>
                    ) : null}
                    <div className="form-label-group">
                        <input type="email" id="email" name="email" className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <br />
                    <div className="form-label-group">
                        <input type="password" id="password" name="password" className="form-control" placeholder="Password" required />
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