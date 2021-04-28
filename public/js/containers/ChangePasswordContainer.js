import React from 'react';
import { bindActionCreators } from 'redux';
import ChangePassword from '../components/ChangePassword';
import {changeUserPassword, changeUserPasswordSuccess, changeUserPasswordFailure, updateChangeUserPasswordForm} from '../actions/userActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.user.user,
    forms: state.user.forms,
    updating_user: state.user.updating_user,
    updated_user: state.user.updated_user,
    error: state.user.error
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeUserPassword: changeUserPassword,
    changeUserPasswordSuccess: changeUserPasswordSuccess,
    changeUserPasswordFailure: changeUserPasswordFailure,
    updateChangeUserPasswordForm: updateChangeUserPasswordForm
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
