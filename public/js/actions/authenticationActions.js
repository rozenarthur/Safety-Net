export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE';
export const AUTHENTICATION_FORM_UPDATE = 'AUTHENTICATION_FORM_UPDATE';
export const AUTHENTICATION_FORM_RESET = 'AUTHENTICATION_FORM_RESET';
export const UNAUTHENTICATE_USER = 'UNAUTHENTICATE_USER';
export const UNAUTHENTICATE_USER_SUCCESS = 'UNAUTHENTICATE_USER_SUCCESS';
export const UNAUTHENTICATE_USER_FAILURE = 'UNAUTHENTICATE_USER_FAILURE';

export function updateAuthenticationForm(e) {
  const data = {
    name: e.target.name,
    value: e.target.value
  };

  return {
    type: AUTHENTICATION_FORM_UPDATE,
    payload: data
  }
}

export function resetAuthenticationForm() {
  return {
    type: AUTHENTICATION_FORM_RESET
  }
}

export function authenticateUser(data) {

  return {
    type: AUTHENTICATE_USER,
    payload: data
  }
}

export function authenticateUserSuccess(data) {
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    payload: data
  }
}

export function authenticateUserFailure(data) {
  return {
    type: AUTHENTICATE_USER_FAILURE,
    payload: data
  }
}

export function unauthenticateUser() {
  return {
    type: UNAUTHENTICATE_USER
  }
}

export function unauthenticateUserSuccess() {
  return {
    type: UNAUTHENTICATE_USER_SUCCESS
  }
}

export function unauthenticateUserFailure() {
  return {
    type: UNAUTHENTICATE_USER_FAILURE,
    payload: data
  }
}