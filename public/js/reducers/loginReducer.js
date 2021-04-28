import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_FORM_UPDATE, LOGIN_FORM_RESET,
        LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, CHECKING_USER, CHECKING_USER_SUCCESS,
        UPDATE_LOGIN_PASSWORD} from '../actions/loginActions';

const INITIAL_FORM_STATE = {
  username: '',
  password: ''
};

const INITIAL_STATE = {
  login: INITIAL_FORM_STATE,
  num_sqs: 0,
  security_questions: {},
  logging_in: false,
  logging_out: false,
  logged_in: false,
  logged_out: {},
  checking: false,
  error: {}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case LOGIN_FORM_UPDATE: {
      const {name, value} = action.payload;
      const login = {...state.login};
      login[name] = value;
      return {...state, login: login, num_sqs: {...state.num_sqs}, security_questions: {}, logging_in: false, logged_in: false, error: {}};
    }
    case LOGIN_FORM_RESET: {
      return {...state, login: INITIAL_FORM_STATE, num_sqs: 0, security_questions: {}, logging_in: false, logged_in: false, error: {}};
    }
    case LOGIN_USER: {
      return {...state, login: {...state.login}, num_sqs: 0, security_questions: {}, logging_in: true, logged_in: false, logged_out: {}, error: {}};
    }
    case LOGIN_USER_SUCCESS: {
      return {...state, login: {...state.login}, num_sqs: action.payload.count, security_questions: action.payload.security_questions, logging_in: false, logged_in: true, error: {}};
    }
    case LOGIN_USER_FAILURE: {
      error = action.payload;
      return {...state, login: {...state.login}, num_sqs: 0,security_questions: {}, logging_in: false, logged_in: false, error: error};
    }
    case LOGOUT_USER: {
      return {...state, logging_out: true}
    }
    case LOGOUT_USER_SUCCESS: {
      return {...state, logging_out: false, login: INITIAL_FORM_STATE, num_sqs: 0, security_questions: {}, logged_in: false, logged_out: action.payload}
    }
    case LOGOUT_USER_FAILURE: {
      error = action.payload;
      return {...state, logging_out: false, login: INITIAL_FORM_STATE, num_sqs: 0,security_questions: {}, logged_in: false, error: error}
    }
    case CHECKING_USER: {
      return {...state, checking: true}
    }
    case CHECKING_USER_SUCCESS: {
      return {...state, checking: false}
    }
    case UPDATE_LOGIN_PASSWORD: {
      const newPass = action.payload;
      const login = {...state.login};
      login.password = newPass;
      return {...state, login: login}
    }
  }

  return state;
}