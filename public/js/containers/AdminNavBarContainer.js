import React from 'react';
import { bindActionCreators } from 'redux';
import AdminNavBar from '../components/shared/AdminNavBar';
import {logoutUser, logoutUserSuccess, logoutUserFailure} from '../actions/loginActions';
import {unauthenticateUser, unauthenticateUserSuccess, unauthenticateUserFailure} from '../actions/authenticationActions';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutUser: logoutUser,
    logoutUserSuccess: logoutUserSuccess,
    logoutUserFailure: logoutUserFailure,
    unauthenticateUser: unauthenticateUser,
    unauthenticateUserSuccess: unauthenticateUserSuccess,
    unauthenticateUserFailure: unauthenticateUserFailure
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(AdminNavBar);