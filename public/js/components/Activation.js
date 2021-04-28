import React from 'react';
import TextFieldGroup from './shared/TextFieldGroup';
import AlertContainer from 'react-alert';
import axios from 'axios';
import {alertOptions, ROOT_URL} from '../utils/Utils';
import {Link} from 'react-router';

class Activation extends React.Component {
  componentWillMount() {
    this.props.resetActivationForm();
  };

  activationRequest(e) {
    e.preventDefault();
    const {activateUser, activateUserSuccess, activateUserFailure, activation} = this.props;
    activateUser(); //Change to take in no parameters
    axios.post(ROOT_URL + 'activate', activation)
      .then((response) => {
        activateUserSuccess(response.data);
        msg.show(response.data.message, {
          time: 8000,
          type: 'success',
          icon: null
        })
      })
      .catch((err) => {
        activateUserFailure(err.response.data);
        console.log(err.response.data);
      })
  }

  render() {

    const {updateActivationForm, error, activation, activating} = this.props;

    return (
      <div>
        <img className="logo center-block" src="../../img/safetynetlogo2.png"/>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="text-center">Activate a User Account</h4>
          </div>
          <form>
            <div className="panel-body">
              <AlertContainer ref={(a) => global.msg = a} {...alertOptions} />
              {error && <span className="help-block err-message text-center">{error.message}</span>}
              < TextFieldGroup
                value={activation.username}
                label="Please enter's account username."
                onChange={updateActivationForm}
                placeholder="Username"
                field='username'
              />
              < TextFieldGroup
                value={activation.password}
                label="Please enter temporary password given by admin."
                onChange={updateActivationForm}
                type='password'
                placeholder="Password"
                field='password'
              />
              < TextFieldGroup
                value={activation.code}
                label="Please enter code received in email."
                onChange={updateActivationForm}
                placeholder="Activation Code"
                field='code'
              />
              <div className="form-group">
                <button className="btn btn-default center-block" onClick={this.activationRequest.bind(this)}>
                  {activating ? <span>Activating <i className="fa fa-spinner fa-spin"></i></span> : 'Activate User' }
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="center-block text-center">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    );
  }
}

export default Activation;