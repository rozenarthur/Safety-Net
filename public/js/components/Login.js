import React from 'react';
import LoginForm from './LoginForm';
import AuthenticationForm from './AuthenticationForm';
import AccountSetUpForm from './AccountSetUpForm';
import axios from 'axios';
import {ROOT_URL} from '../utils/Utils';
import {browserHistory} from 'react-router';

class Login extends React.Component {
  componentWillMount() {
    const {logged_in, authenticated, loginUserSuccess, authenticateUserSuccess, checkUser, checkUserSuccess, num_sqs} = this.props;
    checkUser();
    if (logged_in && authenticated) {
      browserHistory.push('admin');
      checkUserSuccess();
      return;
    }
    if (num_sqs >= 3 && logged_in && authenticated) {
      console.log(authenticated);
      console.log(logged_in);
      axios.get(ROOT_URL + 'check')
        .then((response) => {
          if (response.data.message !== null) {
            browserHistory.push('admin');
            const security_questions = {
              security_questions: response.data.message.security_questions,
              count: response.data.message.count
            };
            loginUserSuccess(security_questions);
            authenticateUserSuccess();
          }
        });
    }
    checkUserSuccess();
    this.props.resetLoginForm();
  };

  login() {
    const {loginUser, loginUserSuccess, loginUserFailure, resetAuthenticationForm, login} = this.props;
    loginUser();
    axios.post(ROOT_URL + 'login', login)
      .then((response) => {
        resetAuthenticationForm();
        loginUserSuccess(response.data);
      })
      .catch((err) => {
        loginUserFailure(err.response.data);
        console.log(err.response.data);
      })
  }

  authenticate() {
    const {authenticateUser, authenticateUserSuccess, loginUserFailure, resetLoginForm, authentication, login,
          security_questions, fetchUser, fetchUserSuccess, fetchUserFailure, setRedirect} = this.props;
    const credentials = {
      username: login.username,
      password: login.password,
      security_answers: []
    };
    authenticateUser();

    let i = 1;
    security_questions.map((question) => {
      let answerString = 'answer';
      answerString += i;
      const answer = {
        id: question.id,
        answer: authentication[answerString]
      };
      i++;
      credentials.security_answers.push(answer);
    });


    console.log(credentials);
    axios.post(ROOT_URL + 'authenticate', credentials)
      .then((response) => {
        authenticateUserSuccess(response.data);
        fetchUser();
        fetchUserSuccess(response.data);
        setRedirect(true);
        browserHistory.push('/admin');
      })
      .catch((err) => {
        resetLoginForm();
        loginUserFailure(err.response.data);
        fetchUserFailure(err.response.data);
      })
  }

  loginRequest(e) {
    e.preventDefault();
    this.login();
  }

  authenticationRequest(e) {
    e.preventDefault();
    this.authenticate();
  }

  setUpRequest(e) {
    e.preventDefault();
    const {setUpUser, setUpUserSuccess, setUpUserFailure, resetSetUpForm, setUpSQs, password_set_up, login, updateLoginPassword} = this.props;
    const data = {
      security_questions: setUpSQs,
      new_pass: password_set_up,
      login: login
    };
    console.log(data);
    setUpUser();
    axios.post(ROOT_URL + 'setup', data)
      .then((response) => {
        updateLoginPassword(password_set_up.password);
        console.log(response.data);
        this.login();
        setUpUserSuccess();
        resetSetUpForm();
        console.log(this.props);
      })
      .catch((err) => {
        setUpUserFailure(err.response.data);
      })

  }

  render() {
    const {error, login, updateLoginForm, logging_in, logged_in, logged_out, checking, num_sqs, setting_up} = this.props;
    if (!logged_in && !checking) {
      return <LoginForm
        error={error}
        login={login}
        logging_in={logging_in}
        logged_out={logged_out}
        updateLoginForm={updateLoginForm}
        loginRequest={this.loginRequest.bind(this)}
      />;
    } else if (logged_in && !checking && num_sqs >= 3 && !setting_up) {
      const {authentication, updateAuthenticationForm, authenticating, security_questions} = this.props;
      return <AuthenticationForm
        authentication={authentication}
        authenticating={authenticating}
        updateAuthenticationForm={updateAuthenticationForm}
        authenticateRequest={this.authenticationRequest.bind(this)}
        securityQuestions={security_questions}
      />;
    } else if (logged_in && num_sqs < 3) {
      const {setUpError, setUpSQs, setting_up, premade_security_questions, password_set_up, updateSetUpForm, updateSQSetUp} = this.props;
      return <AccountSetUpForm
        error={setUpError}
        security_questions={setUpSQs}
        updateSetUpForm={updateSetUpForm}
        updateSQSetUp={updateSQSetUp}
        setting_up={setting_up}
        setUpRequest={this.setUpRequest.bind(this)}
        premade_security_questions={premade_security_questions}
        password_set_up={password_set_up}
      />
    } else {
      return <h2 className="text-center"><i className="fa fa-spinner fa-spin"></i></h2>
    }
  }
}

export default Login;