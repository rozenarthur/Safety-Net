import React from 'react';
import {browserHistory} from 'react-router';

class Users extends React.Component {

  redirectRegister(e) {
    e.preventDefault();
    browserHistory.push('register');
  }

  redirectSearch(e) {
    e.preventDefault();
    browserHistory.push('search');
  }

  render() {
    const style = {
      paddingTop: '50px',
      paddingBottom: '50px',
      marginTop: '25px'
    };

    const margin = {
      marginTop: '30px'
    };

    return (
      <div className="panel panel-default" style={margin}>
        <div className="panel-heading">
          <i className="fa fa-users"></i> Users
        </div>
        <div className="panel-body" style={style}>
          <div className="row">
            <div className=" col-md-offset-1 col-md-5">
              <div className="well hoverwell text-center" onClick={this.redirectSearch}>
                <i className="fa fa-users fa-really-big"></i>
                <h3>View All Users</h3>
              </div>
            </div>
            <div className="col-md-5">
              <div className="well hoverwell text-center" onClick={this.redirectRegister}>
                <i className="fa fa-user-plus fa-really-big"></i>
                <h3>Register A New User</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Users;