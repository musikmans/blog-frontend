import React from 'react';
import { NavLink, /* Link */ } from 'react-router-dom';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/Navbar.css";

const NavBar = props => {
  const { currentUser, onSignOut = () => {} } = props;

  const handleSignOutClick = event => {
    event.preventDefault();

    onSignOut();
  };
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
        {currentUser ? (
        <>
          <li className="nav-item">
          <span>👩‍💻 Hello, {currentUser.name}</span><span className="menuseperator">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </li>
        </>
      ) : (
        null
      )}
        <li className="nav-item">
        <NavLink to="/" className="menulink" activeClassName="menulink-active" exact path="/">Home</NavLink><span className="menuseperator">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        </li>
        {currentUser!==null &&  currentUser.canPostBlog===1 ? (
        <>
        <li className="nav-item">
          <NavLink exact to="/posts" className="menulink" activeClassName="menulink-active">
          Post a Blog
        </NavLink><span className="menuseperator">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        </li>
        </>
      ) : (
        null
      )}
        <li className="nav-item">
        {currentUser ? (
        <>
          <a href="#not-used" onClick={handleSignOutClick} className="menulink">
            Logout
          </a>
        </>
      ) : (
        <>
        <NavLink exact to="/login" className="menulink" activeClassName="menulink-active">
          Login
        </NavLink><span className="menuseperator">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        </>
      )}
        </li>
        {currentUser? (
        null
      ) : (
        <>
        <li className="nav-item">
          <NavLink exact to="/register" className="menulink" activeClassName="menulink-active">
          Register
        </NavLink>
        </li>
        </>
      )}
      </ul>
    </div>
  </nav>
    )
}

export default NavBar;