import React from 'react';
import {Link} from 'react-router';
import TextFieldGroup from '../components/shared/TextFieldGroup';
import axios from 'axios';
import {ROOT_URL, alertOptions} from '../utils/Utils';
import AlertContainer from 'react-alert';

class Forgot extends React.Component {
  componentWillMount() {
    this.props.resetForgotForm();
  };

  forgotRequest(e) {
    e.preventDefault();
    const { forgotRequest, forgotRequestSuccess, email } = this.props;
    forgotRequest();
    const request = {
      email: email
    };
    axios.post(ROOT_URL + 'forgot', request)
      .then((response) => {
        forgotRequestSuccess(response.data);
        msg.show(response.data.message, {
          time: 8000,
          type: 'success',
          icon: null
        })
      });
  }

  render() {

    const {message, error, email, sending, updateForgotForm} = this.props;
    return (
      <div>
        <img className="logo center-block" src="../../img/safetynetlogo2.png"/>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="text-center">Reset Password</h4>
          </div>
          <form onSubmit={this.forgotRequest.bind(this)}>
            <div className="panel-body">
              <AlertContainer ref={(a) => global.msg = a} {...alertOptions} />
              {message && <span className="help-block text-center">{message.message}</span>}
              {error && <span className="help-block err-message text-center">{error.message}</span>}
              < TextFieldGroup
                value={email}
                label="Enter your email address"
                type='email'
                onChange={updateForgotForm}
                placeholder="Email"
                field='email'
              />
              <div className="form-group">
                <button className="btn btn-default center-block" >
                  {sending ? <span>Submitting <i className="fa fa-spinner fa-spin"></i></span> : 'Submit' }
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

export default Forgot;