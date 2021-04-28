import React from 'react';
import { bindActionCreators } from 'redux';
import UsersSearch from '../components/UsersSearch/UsersSearch';
import {fetchUsers, fetchUsersSuccess, fetchUsersFailure, updateUsersList, toggleSearchFilter, userSearchFormUpdate,
        selectUser} from '../actions/usersActions';
import { connect } from 'react-redux';


function mapStateToProps(state) {
  return {
    users: state.users.users,
    search: state.users.search,
    fetching: state.users.fetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUsers: fetchUsers,
    fetchUsersSuccess: fetchUsersSuccess,
    fetchUsersFailure: fetchUsersFailure,
    updateUsersList: updateUsersList,
    toggleSearchFilter: toggleSearchFilter,
    userSearchFormUpdate: userSearchFormUpdate,
    selectUser: selectUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersSearch);