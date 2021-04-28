import React from 'react';
import UserProfileContainer from '../containers/UserProfileContainer';
import AdminNavBarContainer from '../containers/AdminNavBarContainer';

class UserProfilePage extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBarContainer/>
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <UserProfileContainer/>
          </div>
        </div>
      </div>
    );
  }
}


export default UserProfilePage;