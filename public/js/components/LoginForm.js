import React from 'react';
import TextFieldGroup from './shared/TextFieldGroup';
import {Link} from 'react-router';

const LoginForm = ({error, login, updateLoginForm, logging_in, loginRequest, logged_out}) => {
  return (
    <div>
      <form onSubmit={loginRequest}>
        <img className="logo center-block" src="../../img/safetynetlogo2.png"/>
        <div className="panel panel-default">
          <div className="panel-body">
            {logged_out && <span className="help-block text-success text-center">{logged_out.message}</span>}
            {error && <span className="help-block err-message text-center">{error.message}</span>}
            < TextFieldGroup
              value={login.username}
              label="Username:"
              onChange={updateLoginForm}
              placeholder="Enter Username"
              field='username'
            />
            {error && <span className="help-block err-message text-center">{error.username}</span>}
            < TextFieldGroup
              value={login.password}
              label="Password:"
              onChange={updateLoginForm}
              type='password'
              placeholder="Enter Password"
              field='password'
            />
            {error && <span className="help-block err-message text-center">{error.password}</span>}
            <br/>
            <div className="form-group">
              <button className="btn btn-default center-block" type="submit" >
                {logging_in ? <span>Logging in <i className="fa fa-spinner fa-spin"></i></span> : 'Login' }
              </button>
            </div>

          </div>
        </div>
        <div className="center-block text-center">
          <div>
            <span> <Link to="/forgot">Forgot Password? </Link> | <Link to="activate"> Activate Account</Link></span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;