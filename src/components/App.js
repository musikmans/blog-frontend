import React, { Component } from "react";
import "../Styles/App.css";
import NavBar from './NavBar';
import Articles from './Articles';
import Login from './Login';
import Register from './Register';
import { User, Session } from '../requests';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      loading: true
    };

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.destroySession = this.destroySession.bind(this);
  }
  destroySession() {
    this.setState({
      currentUser: null,
      loggedIn: false
    });

    Session.destroy();
  }

  getCurrentUser() {
    const cookies = new Cookies();
    const key = cookies.get('Authorization');
    if (typeof(key) !== 'undefined' || key != null) {
    User.current().then(data => {
      const currentUser = data;
      if (currentUser) {
        this.setState({ currentUser });
        this.setState({ loading: false });
      }
    });
    } else {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.getCurrentUser();
  }

    render() {
      const { currentUser, loading } = this.state;
        return ( <BrowserRouter>
            <div>
              <NavBar currentUser={currentUser} onSignOut={this.destroySession} />
              {loading ? (
            <main>{/* <h1>Loading...</h1> */}</main>
          ) : (
              <Switch>
              <Route path="/" exact component={Articles} />
              {currentUser ? (
                <>
                  <span>👩‍💻 {currentUser.name}</span>
                  <a href="/logout">
                    Sign Out
                  </a>
                </>
              ) : (
                <>
                <Route
                path="/login"
                render={routeProps => (
                  <Login {...routeProps} action={this.getCurrentUser} />
                )}
              />
                <Route path = "/register" exact component = {Register} />
                </>
              )}
              
              </Switch>
          )}
            </div>
          </BrowserRouter>
        );
    }
}

export default App;