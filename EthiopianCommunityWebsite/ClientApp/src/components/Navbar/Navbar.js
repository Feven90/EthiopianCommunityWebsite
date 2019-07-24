import React from 'react';
import {Link} from 'react-router-dom';

import authRequests from  '../../firebaseRequests/auth';

import './Navbar.scss';

class Navbar extends React.Component {
  render () {
    const {authed, runAway} = this.props;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      runAway();
    };

    return (
      <div className="Navbar">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar">Events</span>
                <span className="icon-bar">Information</span>
                <span className="icon-bar"></span>
              </button>
              <Link  to="/" className="navbar-brand">Ethiopian Community</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {
                authed ? (
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to="/userProfile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/informationPage">Information Page</Link>
                    </li>
                    <li>
                      <Link to="/event">Events</Link>
                    </li>
                    <li className="navbar-form">
                      <button
                        onClick={logoutClickEvent}
                        className="btn btn-danger"
                      >
                        <p className="logout">Logout</p>
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="nav navbar-nav navbar-right">
                       <li>
                      <Link to="/informationPage">Information Page</Link>
                    </li>
                    <li>
                      <Link to="/event">Events</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </ul>
                )
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;