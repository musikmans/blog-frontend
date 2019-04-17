import React from 'react';
import { NavLink, /* Link */ } from 'react-router-dom';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/Navbar.css";

const NavBar = props => {
    let hrefLink = '#';
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">

    <a className="navbar-brand" href={hrefLink}><img src="/images/logo_color.svg"
        alt="Francois Tremblay's Blog - Full-Stack Web Developer" /></a>
    <button className="navbar-toggler toggler-example" type="button" data-toggle="collapse"
      data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false"
      aria-label="Toggle navigation"><FontAwesomeIcon icon={faBars} className="hamburger" /></button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent1">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <NavLink to="/" className="menulink" activeClassName="menulink-active" exact path="/">Home</NavLink><span className="menuseperator">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        </li>
        <li className="nav-item">
        <NavLink to="/login" className="menulink" activeClassName="menulink-active">Login</NavLink><span className="menuseperator">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        </li>
        <li className="nav-item">
        <NavLink to="/register" className="menulink" activeClassName="menulink-active">Register</NavLink>
        </li>
      </ul>
    </div>
  </nav>
    )
}

export default NavBar;