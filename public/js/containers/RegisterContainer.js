import React from 'react';
import { bindActionCreators } from 'redux';
import Register from '../components/Register';
import {registerUser, registerUserSuccess, registerUserFailure, updateRegisterForm, resetRegisterForm} from '../actions/registerActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    newUser: state.register.newUser,
    message: state.register.message,
    registering: state.register.registering,
    registered: state.register.registered,
    error: state.register.error
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    registerUser: registerUser,
    registerUserSuccess: registerUserSuccess,
    registerUserFailure: registerUserFailure,
    updateRegisterForm: updateRegisterForm,
    resetRegisterForm: resetRegisterForm
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);