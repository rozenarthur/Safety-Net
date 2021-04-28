import React from 'react';
import axios from 'axios';
import {ROOT_URL} from '../../utils/Utils';
import UsersSearchBar from './UsersSearchBar';
import UsersTable from './UsersTable';

class UsersSearch extends React.Component {

  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    const {fetchUsers, fetchUsersSuccess, fetchUsersFailure} = this.props;
    fetchUsers();
    axios.get(ROOT_URL + 'users')
      .then((response) => {
        fetchUsersSuccess(response.data);
      })
      .catch((err) => {
        fetchUsersFailure(err.response.data);
      })
  }

  render() {
    const style = {
      paddingTop: '25px',
      paddingBottom: '25  px',
      marginTop: '25px'
    };

    const margin = {
      marginTop: '15px'
    };

    const {users, fetching, updateUsersList, toggleSearchFilter, userSearchFormUpdate, search, selectUser} = this.props;
    return (
      <div className="panel panel-default" style={margin}>
        <div className="panel-heading">
          <i className="fa fa-users"></i> Users
        </div>
        <div className="panel-body" style={style}>
          <UsersSearchBar
            toggleSearchFilter = {toggleSearchFilter}
            updateUsersList={updateUsersList}
            userSearchFormUpdate={userSearchFormUpdate}
            users={users}
            search={search}
          />
          <UsersTable
            users={search.users}
            fetching={fetching}
            selectUser={selectUser}
          />
        </div>
      </div>
    )
  }
}

export default UsersSearch;