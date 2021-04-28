import React from 'react';
import UsersSearchContainer from '../containers/UsersSearchContainer';
import AdminNavBarContainer from '../containers/AdminNavBarContainer';

class UsersPage extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBarContainer/>
        <div className="row">
          <div className="col-md-12">
            <UsersSearchContainer/>
          </div>
        </div>
      </div>
    );
  }
}


export default UsersPage;
