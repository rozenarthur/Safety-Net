import moment from 'moment';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
// export const UPDATE_PASSWORD_EXPIRATION = 'UPDATE_LAST_PASSWORD_EXPIRATION';
// export const UPDATE_PASSWORD_EXPIRATION_FAILURE = 'UPDATE_LAST_PASSWORD_EXPIRATION_FAILURE';
// export const UPDATE_PASSWORD_EXPIRATION_SUCCESS = 'UPDATE_LAST_PASSWORD_EXPIRATION_SUCCESS';
export const CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD';
export const CHANGE_USER_PASSWORD_SUCCESS = 'CHANGE_USER_PASSWORD_SUCCESS';
export const CHANGE_USER_PASSWORD_FAILURE = 'CHANGE_USER_PASSWORD_FAILURE';
export const UPDATE_CHANGE_USER_PASSWORD_FORM = 'UPDATE_CHANGE_USER_PASSWORD_FORM';
export const SET_REDIRECT = 'SET_REDIRECT';

export function fetchUser() {
  return {
    type: FETCH_USER
  }
}

export function fetchUserSuccess(data) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data
  }
}

export function fetchUserFailure(data) {
  return {
    type: FETCH_USER_FAILURE,
    payload: data
  }
}
//
// export function updatePasswordExpiration() {
//   return {
//     type: UPDATE_PASSWORD_EXPIRATION
//   }
// }
//
// export function updatePasswordExpirationSuccess(data) {
//   return {
//     type: UPDATE_PASSWORD_EXPIRATION_SUCCESS,
//     payload: data
//   }
// }
//
// export function updatePasswordExpirationFailure(data) {
//   return {
//     type: UPDATE_PASSWORD_EXPIRATION_FAILURE,
//     payload: data
//   }
// }

export function changeUserPassword() {
  return {
    type: CHANGE_USER_PASSWORD
  }
}

//Perhaps change this to take in new dates from backend?
export function changeUserPasswordSuccess() {
  return {
    type: CHANGE_USER_PASSWORD_SUCCESS,
    payload: {
      password_expiration: moment().add(6, 'months').format('YYYY-MM-DD'),
      last_password_update: moment().format('YYYY-MM-DD')
    }
  }
}

export function changeUserPasswordFailure(data) {
  return {
    type: CHANGE_USER_PASSWORD_FAILURE,
    payload: data
  }
}

export function updateChangeUserPasswordForm(e) {
  const data = {
    name: e.target.name,
    value: e.target.value
  };

  return {
    type: UPDATE_CHANGE_USER_PASSWORD_FORM,
    payload: data
  }
}

export function setRedirect(data) {
  return {
    type: SET_REDIRECT,
    payload: data
  }
}