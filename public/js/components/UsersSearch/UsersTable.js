import React from 'react';
import UsersTableRow from './UsersTableRow';
import {browserHistory} from 'react-router';
//firstName, username, lastPassUpdate, passExp
const UsersTable = ({users, fetching, selectUser}) => {

  const handleSelectUser = (id) => {
    const selectedUser = users.find((user) => {
      return user.id === id;
    });
    selectUser(selectedUser);
    browserHistory.push('profile');
  };

  const displayUsers = users.map((user) => {
    return <UsersTableRow
      key={user.id}
      id={user.id}
      role={user.role[0].name}
      first_name={user.first_name}
      last_name={user.last_name}
      username={user.username}
      email={user.email}
      exp={user.password_expiration}
      activated={user.completed}
      locked={user.locked}
      selectUser={handleSelectUser.bind(this)}
    />
  });

  if (fetching) {
    return <div className="center-block text-center"><i className="fa fa-spinner fa-spin fa-3x"></i></div>
  } else {
    return (
      <div className="well searchdiv">
        <table className="table">
          <thead>
          <tr>
            <th>Role</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password Expiration</th>
            <th>Activated</th>
            <th>Locked</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {displayUsers.length !== 0 ? displayUsers : <div className="center-block"><br/><p>No users to display. <i className="fa fa-frown-o"></i></p></div>}
          </tbody>
        </table>
      </div>
    );
  }
};

UsersTable.PropTypes = {
  users: React.PropTypes.array.isRequired,
  fetching: React.PropTypes.bool.isRequired,
  selectUser: React.PropTypes.func.isRequired
};

export default UsersTable;