import React from 'react';
import TextFieldGroup from '../components/shared/TextFieldGroup';
import axios from 'axios';
import {ROOT_URL, alertOptions} from '../utils/Utils';
import AlertContainer from 'react-alert';
import {browserHistory} from 'react-router';

class ChangePassword extends React.Component {

  changePasswordRequest(e) {
    e.preventDefault();
    const { changeUserPassword, changeUserPasswordSuccess, changeUserPasswordFailure, forms} = this.props;
    changeUserPassword();
    const request = {
      old_password: forms.change_password.old_password,
      password: forms.change_password.new_password,
      password_confirmation: forms.change_password.new_password_confirmation
    };
    axios.put(ROOT_URL + 'change-pass', request)
      .then((response) => {
        changeUserPasswordSuccess(response.data);
        browserHistory.push('/admin');
      }).catch((err) => {
        changeUserPasswordFailure(err.response.data);
    });
  }

  render() {
    const {forms, error, updateChangeUserPasswordForm, updating_user} = this.props;
    return (
      <div>
        <img className="logo center-block" src="../../img/safetynetlogo2.png"/>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="text-center">Update Your Password</h4>
          </div>
          <form onSubmit={this.changePasswordRequest.bind(this)}>
            <div className="panel-body">
              <AlertContainer ref={(a) => global.msg = a} {...alertOptions} />
              <span className="help-block text-center">Your password has expired. Please change it below to access Safety Net.</span>
              {error && <span className="help-block err-message text-center">{error.message}</span>}
              < TextFieldGroup
                value={forms.change_password.old_password}
                label="Enter your old password:"
                type='password'
                onChange={updateChangeUserPasswordForm}
                placeholder="Old Password"
                field='old_password'
                error={error.old_password}
              />
              < TextFieldGroup
                value={forms.change_password.new_password}
                label="Enter your new password:"
                type='password'
                onChange={updateChangeUserPasswordForm}
                placeholder="New Password"
                field='new_password'
                error={error.password}
              />
              < TextFieldGroup
                value={forms.change_password.new_password_confirmation}
                label="Confirm your new password:"
                type='password'
                onChange={updateChangeUserPasswordForm}
                placeholder="New Password Confirmation"
                field='new_password_confirmation'
                error={error.password_confirmation}
              />
              <div className="form-group">
                <button className="btn btn-default center-block" >
                  {updating_user ? <span>Updating <i className="fa fa-spinner fa-spin"></i></span> : 'Update' }
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePassword;