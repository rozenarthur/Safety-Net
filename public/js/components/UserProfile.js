import React from 'react';
import axios from 'axios';
import {ROOT_URL} from '../utils/Utils';
import moment from 'moment';

class UserProfile extends React.Component {

  lockOrUnlockUser(e) {
    e.preventDefault();
    const {selected, updateUser, updateUserSuccess, updateUserFailure, selectUser} = this.props;
    updateUser();
    if(selected.locked) {
      axios.delete(ROOT_URL + 'users/unlock/' + selected.id)
        .then((response) => {
          const user = response.data.user;
          updateUserSuccess(user);
          selectUser(user);
        })
        .catch((err) => {
          updateUserFailure(err.response.data);
        })
    } else {
      axios.put(ROOT_URL + 'users/lock/' + selected.id)
        .then((response) => {
          const user = response.data.user;

          updateUserSuccess(user);
          selectUser(user);
        })
        .catch((err) => {
          updateUserFailure(err.response.data);
        })
    }
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

    const faSize = {
      fontSize: '175px',
    };

    const selectedUser = this.props.selected;

    return (
      <div className="panel panel-default" style={margin}>
        <div className="panel-heading">
          <i className="fa fa-user-circle"></i> {selectedUser.first_name + ' ' + selectedUser.last_name}
        </div>
        <div className="panel-body" style={style}>
          <div className="row">
            <div className="col-md-12 text-center">
              <i className="fa fa-user-circle" style={faSize}></i>
              <h3>{selectedUser.first_name + ' ' + selectedUser.last_name}</h3>
              <h5><label>Last Login:</label> {moment(selectedUser.last_login).fromNow()}</h5>
            </div>
            <div className="row">
              <div className="col-md-offset-1 col-md-10">
                <div className="well" style={margin}>
                  <div className="row">
                    <div className="col-md-6">
                      <p><label>User ID:</label> {selectedUser.id}</p>
                      <p><label>Role:</label> {selectedUser.role[0].name}</p>
                      <p><label>Username:</label> {selectedUser.username}</p>
                      <p><label>Email:</label> {selectedUser.email}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p><label>Activated:</label> {selectedUser.completed ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i>}</p>
                        <p><label>Locked:</label> {selectedUser.locked ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i>}</p>
                        <p><label>Joined:</label> { moment(selectedUser.created_at).format("MMMM Do YYYY, h:mm:ss a")}</p>
                        <p><label>Password Expiration:</label> {moment(selectedUser.password_expiration).format("MMMM Do YYYY") }</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-offset-1 col-md-10">
                  <button type="button" className="btn btn-default btn-block center-block" onClick={this.lockOrUnlockUser.bind(this)}>{selectedUser.locked ? <span>Unlock <i className="fa fa-unlock"></i></span> : <span>Lock <i className="fa fa-lock"></i></span> }</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile;