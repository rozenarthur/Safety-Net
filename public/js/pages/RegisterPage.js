import React from 'react';
import RegisterContainer from '../containers/RegisterContainer';
import AdminNavBarContainer from '../containers/AdminNavBarContainer';

class RegisterPage extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBarContainer/>
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <RegisterContainer/>
          </div>
        </div>
      </div>
    );
  }
}


export default RegisterPage;