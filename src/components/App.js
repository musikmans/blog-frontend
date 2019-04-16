import React, { Component } from "react";
import "../Styles/App.css";
import NavBar from './NavBar';
import Articles from './Articles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
          <Route path="/" exact component={Articles} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
