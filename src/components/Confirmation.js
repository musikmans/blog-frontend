import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../Styles/Confirmation.css";

class Confirmation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            redirect: false
        }
      }
    
      componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 2000)
      }
    
      componentWillUnmount() {
        clearTimeout(this.id)
      }

    render() {
            return this.state.redirect
              ? <Redirect to="/" />
              : <main className="confirmationPage">
              <div className="container">
                  <div className="row">
                  <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                      <div className="card card-signin my-5">
                      <div className="card-body">
                          <h1 className="card-title text-center">Welcome!</h1>
                          <div className="card-text"><FontAwesomeIcon icon={faCheckCircle} />&nbsp;You are now registered!</div>
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
              </main>
    }
}

export default Confirmation;