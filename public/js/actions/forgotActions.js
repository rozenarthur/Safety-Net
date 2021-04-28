export const FORGOT_REQUEST = 'FORGOT_REQUEST';
export const FORGOT_REQUEST_SUCCESS = 'FORGOT_REQUEST_SUCCESS';
export const FORGOT_REQUEST_FAILURE = 'FORGOT_REQUEST_FAILURE';
export const FORGOT_FORM_UPDATE = 'FORGOT_FORM_UPDATE';
export const FORGOT_FORM_RESET = 'FORGOT_FORM_RESET';
export const FETCH_FORGOT_REQUESTS = 'FETCH_FORGOT_REQUESTS';
export const FETCH_FORGOT_REQUESTS_SUCCESS = 'FETCH_FORGOT_REQUESTS_SUCCESS';
export const FETCH_FORGOT_REQUESTS_FAILURE = 'FETCH_FORGOT_REQUESTS_FAILURE';

export function updateForgotForm(e) {
  const data = {
    name: e.target.name,
    value: e.target.value
  };

  return {
    type: FORGOT_FORM_UPDATE,
    payload: data
  }
}

export function resetForgotForm() {
  return {
    type: FORGOT_FORM_RESET
  }
}

export function forgotRequest() {
  return {
    type: FORGOT_REQUEST
  }
}

export function forgotRequestSuccess(data) {
  return {
    type: FORGOT_REQUEST_SUCCESS,
    payload: data
  }
}

export function forgotRequestFailure(data) {
  return {
    type: FORGOT_REQUEST_FAILURE,
    payload: data
  }
}

export function fetchForgotRequests() {
  return {
    type: FETCH_FORGOT_REQUESTS,
  }
}

export function fetchForgotRequestsSuccess(data) {
  return {
    type: FETCH_FORGOT_REQUESTS_SUCCESS,
    payload: data
  }
}

export function fetchForgotRequestsFailure(data) {
  return {
    type: FETCH_FORGOT_REQUESTS_FAILURE,
    payload: data
  }
}