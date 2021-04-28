import {FORGOT_REQUEST, FORGOT_REQUEST_SUCCESS, FORGOT_REQUEST_FAILURE, FORGOT_FORM_RESET, FORGOT_FORM_UPDATE,
        FETCH_FORGOT_REQUESTS, FETCH_FORGOT_REQUESTS_SUCCESS, FETCH_FORGOT_REQUESTS_FAILURE} from '../actions/forgotActions';

const INITIAL_STATE = {
  email: '',
  requests: [],
  fetching: false,
  fetched: false,
  sending: false,
  sent: false,
  message: {},
  errors: {},
  fetchingErrors: {}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case FORGOT_FORM_UPDATE: {
      const {value} = action.payload;
      let email = {...state.email};
      email = value;
      return {...state, email: email}
    }
    case FORGOT_FORM_RESET: {
      return {...state, email: '', sending: false, sent: false, message: {}, errors: {}}
    }
    case FORGOT_REQUEST: {
      return {...state, sending: true}
    }
    case FORGOT_REQUEST_SUCCESS: {
      return {...state, sending: false, sent: true, message: action.payload.message}
    }
    case FORGOT_REQUEST_FAILURE: {
      error = action.payload;
      return {...state, sending: false, sent: false, errors: error}
    }
    case FETCH_FORGOT_REQUESTS: {
      return {...state, requests: {}, fetching: true, fetched: false, fetchingErrors: {}}
    }
    case FETCH_FORGOT_REQUESTS_SUCCESS: {
      return {...state, requests: action.payload, fetching: false, fetched: true, fetchingErrors: {}}
    }
    case FETCH_FORGOT_REQUESTS_FAILURE: {
      error = action.payload;
      return {...state, requests: {}, fetching: false, fetched: false, fetchingErrors: error.message}
    }
  }
  return state;
}