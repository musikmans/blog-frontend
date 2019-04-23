import React, { Component } from "react";
import "../Styles/App.css";
import NavBar from './NavBar';
import Articles from './Articles';
import Login from './Login';
import Register from './Register';
import { Session, User } from '../requests';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
      currentUser: null
    });

    Session.destroy();
  }

  getCurrentUser() {
    User.current().then(data => {
      const { current_user: currentUser } = data;

      if (currentUser) {
        this.setState({ currentUser });
      }
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.getCurrentUser();
  }

    render() {
      const { currentUser, loading } = this.state;

        return ( <BrowserRouter>
            <div>
              <NavBar currentUser={currentUser} onSignOut={this.destroySession} />
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
                <Route path = "/login" exact component = {Login} /> 
                <Route path = "/register" exact component = {Register} />
                </>
              )}
              
              </Switch>
            </div>
          </BrowserRouter>
        );
    }
}

export default App;