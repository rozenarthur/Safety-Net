import React from 'react';

const UsersTableRow = ({role, first_name, last_name, username, email, exp, activated, locked, id, selectUser}) => {

  const handleSelectUser = () => {
    selectUser(id);
  };

  return (
    <tr>
      <td>{role}</td>
      <td>{first_name + ' ' + last_name}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{exp}</td>
      <td><i className={activated === 1 ? 'fa fa-check' : 'fa fa-times'}></i></td>
      <td><i className={locked === 1 ? 'fa fa-check' : 'fa fa-times'}></i></td>
      <td><a href="#" onClick={handleSelectUser}><i className="fa fa-pencil-square-o fa-2x"></i></a></td>
    </tr>
  );
};

UsersTableRow.Proptypes = {
  first_name: React.PropTypes.string.isRequired,
  last_name: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  exp: React.PropTypes.string.isRequired,
  activated: React.PropTypes.number.isRequired,
  locked: React.PropTypes.number.isRequired,
  selectUser:React.PropTypes.func.isRequired,
  id: React.PropTypes.number.isRequired
};


export default UsersTableRow;