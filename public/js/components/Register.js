import React from 'react';
import TextFieldGroup from './shared/TextFieldGroup';
import Dropdown from './shared/Dropdown';
import AlertContainer from 'react-alert';
import axios from 'axios';
import {alertOptions, ROOT_URL} from '../utils/Utils';


class Register extends React.Component {

  componentWillMount() {
    this.props.resetRegisterForm();
  };

  registerRequest(e) {
    e.preventDefault();
    const {registerUser, registerUserSuccess, registerUserFailure, newUser} = this.props;
    registerUser();
    axios.post(ROOT_URL + 'register', newUser)
      .then((response) => {
        registerUserSuccess(response.data);
        msg.show(response.data.message, {
          time: 8000,
          type: 'success',
          icon: null
        })
      })
      .catch((err) => {
        registerUserFailure(err.response.data);
      })
  }

  render() {
    //TODO: Move to state
    const types = [
      {
        id: 1,
        value: 'Admin'
      },
      {
        id: 2,
        value: 'User'
      }
    ];

    const style = {
      paddingTop: '50px'
    };

    const {updateRegisterForm, newUser, error, registering} = this.props;


    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <i className="fa fa-user-plus"></i> Register A New User
        </div>
        <form>
          <div className="panel-body row" style={style}>
            <div className="col-md-offset-1 col-md-10">
              <AlertContainer ref={(a) => global.msg = a} {...alertOptions} />
              < TextFieldGroup
                error={error.first_name}
                value={newUser.first_name}
                label="Please enter the user's first name."
                onChange={updateRegisterForm}
                placeholder="First Name"
                field='first_name'
              />
              <TextFieldGroup
                error={error.last_name}
                value={newUser.last_name}
                label="Please enter the user's last name."
                onChange={updateRegisterForm}
                placeholder="Last Name"
                field='last_name'
              />
              <TextFieldGroup
                error={error.username}
                value={newUser.username}
                onChange={updateRegisterForm}
                label="Please enter a username for the new user. Alphanumeric, 6-14 characters. Must start with letter."
                placeholder="Username"
                field='username'
              />
              <TextFieldGroup
                error={error.email}
                value={newUser.email}
                onChange={updateRegisterForm}
                label="Please enter a valid email for the user. Their activation code will be sent to this email."
                placeholder="Email"
                type='email'
                field='email'
              />
              <TextFieldGroup
                error={error.password || error.message}
                value={newUser.password}
                onChange={updateRegisterForm}
                label="Please enter a password for the user."
                placeholder="Password"
                type='password'
                field='password'
              />
              <TextFieldGroup
                error={error.password_confirmation}
                value={newUser.password_confirmation}
                onChange={updateRegisterForm}
                label="Please re-enter the user's password."
                placeholder="Confirm Password"
                type='password'
                field='password_confirmation'
              />
              <Dropdown
                field='type'
                label='Choose the type of account this user will be.'
                error={error.type}
                onChange={updateRegisterForm}
                selections={types}
                placeholder='Account Type'
                lowercase={true}
              />
              <div className="form-group" style={style}>
                <button className="btn btn-default pull-right" onClick={this.registerRequest.bind(this)}>
                  {registering ? <span>Registering <i className="fa fa-spinner fa-spin"></i></span> : 'Register User' }
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;