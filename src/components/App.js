import React, { Component } from "react";
import "../Styles/App.css";
import NavBar from './NavBar';
import Articles from './Articles';
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
   };
  }
  

    render() {
        return ( <BrowserRouter>
            <div>
              <NavBar />
              <Switch>
              <Route path="/" exact component={Articles} />
              <Route path = "/login" exact component = {Login} /> 
              <Route path = "/register" exact component = {Register} />
              </Switch>
            </div>
          </BrowserRouter>
        );
    }
}

export default App;