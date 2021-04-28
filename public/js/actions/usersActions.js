export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS';
export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';
export const FETCH_USER_STATS = 'FETCH_USERS_STATS';
export const FETCH_USER_STATS_SUCCESS = 'FETCH_USERS_STATS_SUCCESS';
export const FETCH_USER_STATS_FAILURE = 'FETCH_USERS_STATS_FAILURE';
export const USER_SEARCH_FORM_UPDATE = 'USER_SEARCH_FORM_UPDATE';
export const TOGGLE_SEARCH_FILTER = 'TOGGLE_SEARCH_FILTER';
export const SELECT_USER = 'SELECT_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export function fetchUsers() {
  return {
    type: FETCH_USERS
  }
}

export function fetchUsersSuccess(data) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: data
  }
}

export function fetchUsersFailure() {
  return {
    type: FETCH_USERS_FAILURE,
    payload: data
  }
}

export function updateUsersList(data) {
  return {
    type: UPDATE_USERS_LIST,
    payload: data
  }
}

export function userSearchFormUpdate(data) {
  return {
    type: USER_SEARCH_FORM_UPDATE,
    payload: data
  }
}

export function toggleSearchFilter(data) {
  return {
    type: TOGGLE_SEARCH_FILTER,
    payload: data
  }
}

export function fetchUserStats() {
  return {
    type: FETCH_USER_STATS
  }
}

export function fetchUserStatsSuccess(data) {
  return {
    type: FETCH_USER_STATS_SUCCESS,
    payload: data
  }
}

export function fetchUserStatsFailure(data) {
  return {
    type: FETCH_USER_STATS_FAILURE,
    payload: data
  }
}

export function selectUser(data) {
  return {
    type: SELECT_USER,
    payload: data
  }
}

export function updateUser() {
  return {
    type: UPDATE_USER
  }
}

export function updateUserSuccess(data) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: data
  }
}

export function updateUserFailure(data) {
  return {
    type: UPDATE_USER_FAILURE,
    payload: data
  }
}