import React from 'react';
import Users from '../components/Users';
import AdminNavBarContainer from '../containers/AdminNavBarContainer';

class UsersPage extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBarContainer/>
        <div className="row">
          <div className="col-md-12">
            <Users/>
          </div>
        </div>
      </div>
    );
  }
}


export default UsersPage;
