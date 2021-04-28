export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_FORM_UPDATE = 'LOGIN_FORM_UPDATE';
export const LOGIN_FORM_RESET = 'LOGIN_FORM_RESET';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';
export const CHECKING_USER = 'CHECK_USER';
export const CHECKING_USER_SUCCESS = 'CHECKING_USER_SUCCESS';
export const UPDATE_LOGIN_PASSWORD = 'UPDATE_LOGIN_PASSWORD';

export function updateLoginForm(e) {
  const data = {
    name: e.target.name,
    value: e.target.value
  };

  return {
    type: LOGIN_FORM_UPDATE,
    payload: data
  }
}

export function resetLoginForm() {
  return {
    type: LOGIN_FORM_RESET
  }
}

export function loginUser(data) {

  return {
    type: LOGIN_USER,
    payload: data
  }
}

export function loginUserSuccess(data) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data
  }
}

export function loginUserFailure(data) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: data
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}

export function logoutUserSuccess(data) {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: data
  }
}

export function logoutUserFailure(data) {
  return {
    type: LOGOUT_USER_FAILURE,
    payload: data
  }
}

export function checkUser() {
  return {
    type: CHECKING_USER
  }
}

export function checkUserSuccess() {
  return {
    type: CHECKING_USER_SUCCESS
  }
}

export function updateLoginPassword(data) {
  return {
    type: UPDATE_LOGIN_PASSWORD,
    payload: data
  }
}