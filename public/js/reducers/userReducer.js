import {FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, CHANGE_USER_PASSWORD, CHANGE_USER_PASSWORD_SUCCESS,
        CHANGE_USER_PASSWORD_FAILURE, UPDATE_CHANGE_USER_PASSWORD_FORM, SET_REDIRECT } from '../actions/userActions';

const INITIAL_STATE = {
  user: {},
  forms: {
    change_password: {
      old_password: '',
      new_password: '',
      new_password_confirmation: ''
    }
  },
  updating_user: false,
  updated_user: false,
  fetching: false,
  fetched: false,
  redirected_from_login: false,
  error: {}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case FETCH_USER: {
      return {...state, fetching: true, fetched: false, error: {}};
    }
    case FETCH_USER_SUCCESS: {
      return {...state, fetching: false, fetched: true, user: action.payload, error: {}};
    }
    case FETCH_USER_FAILURE: {
      error = action.payload;
      console.log("STOP TRYING TO MAKE FETCH HAPPEN.");
      return {...state, fetching: false, fetched: false, error: error};
    }
    case CHANGE_USER_PASSWORD: {
      return {...state, updating_user: true, updated_user: false};
    }
    /**
     * Only necessary to update password expiration and last password update
     */
    case CHANGE_USER_PASSWORD_SUCCESS: {
      const {password_expiration, last_password_update} = action.payload;
      const updated_user = {...state.user};
      updated_user['password_expiration'] = password_expiration;
      updated_user['last_password_update'] = last_password_update;
      return {...state, updating_user: false, updated_user: true, user: updated_user};
    }
    case CHANGE_USER_PASSWORD_FAILURE: {
      error = action.payload;
      return {...state, updating_user: false, updated_user: false, error: action.payload};
    }
    case UPDATE_CHANGE_USER_PASSWORD_FORM: {
      const {name, value} = action.payload;
      const forms = {...state.forms};
      const change_pass = forms.change_password;
      change_pass[name] = value;
      forms.change_password = change_pass;
      return {...state, forms: forms};
    }
    case SET_REDIRECT: {
      const redirect = action.payload;
      return {...state, redirected_from_login: redirect}
    }
  }
  return state;
}