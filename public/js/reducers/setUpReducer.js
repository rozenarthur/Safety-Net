import {SET_UP_USER, SET_UP_USER_SUCCESS, SET_UP_USER_FAILURE, SET_UP_FORM_UPDATE, SET_UP_SQ_UPDATE,
        SET_UP_FORM_RESET} from '../actions/setUpActions';
import {PREMADE_SECURITY_QUESTIONS} from '../utils/Utils';

const INITIAL_FORM_STATE = {
  old_password: '',
  password: '',
  password_confirmation: ''
};

const INITIAL_SECURITY_QUESTION_STATE = [
  {
    security_question: '',
    security_answer: '',
    is_set: 1,
    is_approved: 1
  },
  {
    security_question: '',
    security_answer: '',
    is_set: 1,
    is_approved: 1
  },
  {
    security_question: '',
    security_answer: '',
    is_set: 1,
    is_approved: 1
  }
];

const INITIAL_STATE = {
  security_questions: INITIAL_SECURITY_QUESTION_STATE,
  password_set_up: INITIAL_FORM_STATE,
  premade_security_questions: PREMADE_SECURITY_QUESTIONS,
  setting_up: false,
  set_up: false,
  error: {}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case SET_UP_FORM_UPDATE: {
      const {name, value} = action.payload;
      const password_set_up = {...state.password_set_up};
      password_set_up[name] = value;
      return {...state, password_set_up: password_set_up};
    }
    case SET_UP_SQ_UPDATE: {
      const {name, value, index} = action.payload;
      const security_questions = [...state.security_questions];
      const security_question_to_update = security_questions[index];
      security_question_to_update[name] = value;
      security_questions[index] = security_question_to_update;
      return {...state, security_questions: security_questions}
    }
    case SET_UP_FORM_RESET: {
      return {...state, password_set_up: INITIAL_FORM_STATE, security_questions: INITIAL_SECURITY_QUESTION_STATE, setting_up: false, set_up: false, errors: {}};
    }
    case SET_UP_USER: {
      return {...state, setting_up: true, set_up: false};
    }
    case SET_UP_USER_SUCCESS: {
      return {...state, setting_up: false, set_up: true, security_questions: []};
    }
    case SET_UP_USER_FAILURE: {
      error = action.payload;
      return {...state, setting_up: false, set_up: true, security_questions: [], error: error};
    }
  }
  return state;
}