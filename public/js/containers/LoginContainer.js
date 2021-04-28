import React from 'react';
import { bindActionCreators } from 'redux';
import Login from '../components/Login';
import {loginUser, loginUserSuccess, loginUserFailure, updateLoginForm, resetLoginForm, checkUser, checkUserSuccess, updateLoginPassword} from '../actions/loginActions';
import {authenticateUser, authenticateUserSuccess, authenticateUserFailure, updateAuthenticationForm, resetAuthenticationForm} from '../actions/authenticationActions';
import {setUpUser, setUpUserSuccess, setUpUserFailure, resetSetUpForm, updateSetUpForm, updateSQSetUp} from '../actions/setUpActions';
import {fetchUser, fetchUserSuccess, fetchUserFailure, setRedirect} from '../actions/userActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    login: state.login.login,
    num_sqs: state.login.num_sqs,
    security_questions: state.login.security_questions,
    logging_in: state.login.logging_in,
    logged_in: state.login.logged_in,
    logged_out: state.login.logged_out,
    checking: state.login.checking,
    error: state.login.error,
    setUpError: state.setup.error,
    setUpSQs: state.setup.security_questions,
    setting_up: state.setup.setting_up,
    premade_security_questions: state.setup.premade_security_questions,
    password_set_up: state.setup.password_set_up,
    authentication: state.authentication.authentication,
    authenticating: state.authentication.authenticating,
    authenticated:  state.authentication.authenticated,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser: loginUser,
    loginUserSuccess: loginUserSuccess,
    loginUserFailure: loginUserFailure,
    updateLoginPassword: updateLoginPassword,
    updateLoginForm: updateLoginForm,
    resetLoginForm: resetLoginForm,
    checkUser: checkUser,
    checkUserSuccess: checkUserSuccess,
    fetchUser: fetchUser,
    fetchUserSuccess: fetchUserSuccess,
    fetchUserFailure: fetchUserFailure,
    setRedirect: setRedirect,
    authenticateUser: authenticateUser,
    authenticateUserSuccess: authenticateUserSuccess,
    authenticateUserFailure: authenticateUserFailure,
    updateAuthenticationForm: updateAuthenticationForm,
    resetAuthenticationForm: resetAuthenticationForm,
    setUpUser: setUpUser,
    setUpUserSuccess: setUpUserSuccess,
    setUpUserFailure: setUpUserFailure,
    resetSetUpForm: resetSetUpForm,
    updateSetUpForm: updateSetUpForm,
    updateSQSetUp: updateSQSetUp
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
