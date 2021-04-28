import {FETCH_SECURITY_QUESTIONS, FETCH_SECURITY_QUESTIONS_SUCCESS, FETCH_SECURITY_QUESTIONS_FAILURE}
        from '../actions/securityQuestionsActions';

const INITIAL_STATE = {
  security_questions: [],
  fetching: false,
  fetched: false,
  errors: {}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case FETCH_SECURITY_QUESTIONS: {
      return {...state, security_questions: [], fetching: true, fetched: false, errors: {}}
    }
    case FETCH_SECURITY_QUESTIONS_SUCCESS: {
      return {...state, security_questions: action.payload, fetching: false, fetched: true, errors: {}}
    }
    case FETCH_SECURITY_QUESTIONS_FAILURE: {
      error = action.payload;
      return {...state, security_questions: [], fetching: false, fetched: false, errors: error}
    }
  }
  return state;
}