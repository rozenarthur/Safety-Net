import React from 'react';
import { bindActionCreators } from 'redux';
import Forgot from '../components/Forgot';
import {forgotRequest, forgotRequestSuccess, forgotRequestFailure, resetForgotForm, updateForgotForm} from '../actions/forgotActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    logged_in: state.login.logged_in,
    authenticated: state.authentication.authenticated,
    email: state.forgot.email,
    sending: state.forgot.sending,
    sent: state.forgot.sent,
    message: state.forgot.message,
    errors: state.forgot.errors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    forgotRequest: forgotRequest,
    forgotRequestSuccess: forgotRequestSuccess,
    forgotRequestFailure: forgotRequestFailure,
    resetForgotForm: resetForgotForm,
    updateForgotForm: updateForgotForm
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
