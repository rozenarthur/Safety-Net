import React from 'react';
import {browserHistory} from 'react-router';
import {ROOT_URL} from '../../utils/Utils';
import axios from 'axios';

const LogoutPanel = ({logoutUser, logoutUserSuccess, logoutUserFailure, unauthenticateUser, unauthenticateUserSuccess, unauthenticateUserFailure}) => {

  const height = {
    height: '200px'
  };

  const fontSize = {
    fontSize: '100px',
  };

  const left = {
    left: '45%'
  };

  const logout = (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="panel panel-default" style={height}>
      <div className="panel-heading">
        <i className="fa fa-window-close"></i> Logout
      </div>
      <div className="dashpanel" onClick={logout}>
        <h3 className="center-block hovertext" style={left}>Logout</h3>
        <div className="panel-body text-center hover">
          <i className="fa fa-sign-out" style={fontSize}></i>
          <p>Exit Safety Net</p>
        </div>
      </div>
    </div>
  );
};

LogoutPanel.Proptype = {
  logoutUser: React.PropTypes.func.isRequired,
  logoutUserSuccess: React.PropTypes.func.isRequired,
  logoutUserFailure: React.PropTypes.func.isRequired,
  unauthenticateUser: React.PropTypes.func.isRequired,
  unauthenticateUserSuccess: React.PropTypes.func.isRequired,
  unauthenticateUserFailure: React.PropTypes.func.isRequired,
};

export default LogoutPanel;