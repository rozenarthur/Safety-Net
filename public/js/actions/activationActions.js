export const ACTIVATE_USER = 'ACTIVATE_USER';
export const ACTIVATE_USER_SUCCESS = 'ACTIVATE_USER_SUCCESS';
export const ACTIVATE_USER_FAILURE = 'ACTIVATE_USER_FAILURE';
export const ACTIVATE_FORM_UPDATE = 'ACTIVATE_FORM_UPDATE';
export const ACTIVATE_FORM_RESET = 'ACTIVATE_FORM_RESET';

export function updateActivationForm(e) {
  const data = {
    name: e.target.name,
    value: e.target.value
  };

  return {
    type: ACTIVATE_FORM_UPDATE,
    payload: data
  }
}

export function resetActivationForm() {
  return {
    type: ACTIVATE_FORM_RESET
  }
}

export function activateUser(data) {

  return {
    type: ACTIVATE_USER,
    payload: data
  }
}

export function activateUserSuccess(data) {
  return {
    type: ACTIVATE_USER_SUCCESS,
    payload: data
  }
}

export function activateUserFailure(data) {
  return {
    type: ACTIVATE_USER_FAILURE,
    payload: data
  }
}