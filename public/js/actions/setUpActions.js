export const SET_UP_USER = 'SET_UP_USER';
export const SET_UP_USER_SUCCESS = 'SET_UP_USER_SUCCESS';
export const SET_UP_USER_FAILURE = 'SET_UP_USER_FAILURE';
export const SET_UP_FORM_UPDATE = 'SET_UP_FORM_UPDATE';
export const SET_UP_SQ_UPDATE = 'SET_UP_SQ_UPDATE';
export const SET_UP_FORM_RESET = 'SET_UP_FORM_RESET';

export function updateSetUpForm(e) {
  const data = {
    name: e.target.name,
    value: e.target.value
  };

  return {
    type: SET_UP_FORM_UPDATE,
    payload: data
  }
}

export function updateSQSetUp(e) {
  const stringLength = e.target.name.length;
  const data = {
    name: e.target.name.substring(0, stringLength - 1),
    value: e.target.value,
    index: e.target.name.substring(stringLength - 1, stringLength)
  };

  return {
    type: SET_UP_SQ_UPDATE,
    payload: data
  }
}

export function resetSetUpForm() {
  return {
    type: SET_UP_FORM_RESET
  }
}

export function setUpUser() {

  return {
    type: SET_UP_USER
  }
}

export function setUpUserSuccess(data) {
  return {
    type: SET_UP_USER_SUCCESS,
    payload: data
  }
}

export function setUpUserFailure(data) {
  return {
    type: SET_UP_USER_FAILURE,
    payload: data
  }
}