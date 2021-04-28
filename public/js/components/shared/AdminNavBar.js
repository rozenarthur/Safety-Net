import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import {ROOT_URL} from '../../utils/Utils';
import {browserHistory} from 'react-router';

class AdminNavBar extends React.Component {

  logout() {
    const {logoutUser, logoutUserSuccess, logoutUserFailure, unauthenticateUser, unauthenticateUserSuccess,
            unauthenticateUserFailure} = this.props;
    logoutUser();
    unauthenticateUser();
    axios.post(ROOT_URL + 'logout')
      .then((response) => {
        logoutUserSuccess(response.data);
        unauthenticateUserSuccess();
        browserHistory.push('/');
      })
      .catch((err) => {
        logoutUserFailure(err.response.data);
        unauthenticateUserFailure(err.response.data);
      })
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand"><img src="../../img/safetynetlogo2.png"/></Link>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="admin">Home</Link></li>
              <li><Link to="users">Users</Link></li>
              <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default AdminNavBar;