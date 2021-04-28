import React from 'react';
import { bindActionCreators } from 'redux';
import UserProfile from '../components/UserProfile';
import {updateUser, updateUserSuccess, updateUserFailure, selectUser} from '../actions/usersActions';
import { connect } from 'react-redux';


function mapStateToProps(state) {
  return {
    selected: state.users.selected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser: updateUser,
    updateUserSuccess: updateUserSuccess,
    updateUserFailure: updateUserFailure,
    selectUser: selectUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);