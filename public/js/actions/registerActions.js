export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const REGISTER_FORM_UPDATE = 'REGISTER_FORM_UPDATE';
export const REGISTER_FORM_RESET = 'REGISTER_FORM_RESET';

export function updateRegisterForm(e) {
  const data = {
    name: e.target.name,
    value: e.target.value
  };

  return {
    type: REGISTER_FORM_UPDATE,
    payload: data
  }
}

export function resetRegisterForm() {
  return {
    type: REGISTER_FORM_RESET
  }
}

export function registerUser(data) {

  return {
    type: REGISTER_USER,
    payload: data
  }
}

export function registerUserSuccess(data) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: data
  }
}

export function registerUserFailure(data) {
  return {
    type: REGISTER_USER_FAILURE,
    payload: data
  }
}