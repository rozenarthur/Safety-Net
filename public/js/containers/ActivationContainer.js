import React from 'react';
import { bindActionCreators } from 'redux';
import Activation from '../components/Activation';
import {activateUser, activateUserSuccess, activateUserFailure, updateActivationForm, resetActivationForm} from '../actions/activationActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    activation: state.activation.activation,
    activating: state.activation.activating,
    activated: state.activation.activated,
    error: state.activation.error
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    activateUser: activateUser,
    activateUserSuccess: activateUserSuccess,
    activateUserFailure: activateUserFailure,
    updateActivationForm: updateActivationForm,
    resetActivationForm: resetActivationForm
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Activation);
