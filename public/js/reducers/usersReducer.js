import {FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, UPDATE_USERS_LIST, FETCH_USER_STATS,
        FETCH_USER_STATS_SUCCESS, FETCH_USER_STATS_FAILURE, TOGGLE_SEARCH_FILTER, USER_SEARCH_FORM_UPDATE,
        SELECT_USER, UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE} from '../actions/usersActions';

const INITIAL_STATE = {
  users: [],
  search: {
    search: '',
    users: [],
    filters: {
      locked: true,
      admins: true,
      pending: true
    }
  },
  selected: {},
  stats:{},
  updating: false,
  updated: false,
  fetching: false,
  fetched: false,
  error: {}
};



export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case FETCH_USERS: {
      return {...state, fetching: true, fetched: false, error: {}}
    }
    case FETCH_USERS_SUCCESS: {
      const search = {...state.search};
      search.users = action.payload;
      return {...state, users: action.payload, search: search, fetching: false, fetched: true, error: {}}
    }
    case FETCH_USERS_FAILURE: {
      error = action.payload;
      return {...state, users: [], fetching: false, fetched: false, error: error}
    }
    case UPDATE_USERS_LIST: {
      const search = {...state.search};
      search.users = action.payload;
      return {...state, search: search}
    }
    case USER_SEARCH_FORM_UPDATE: {
     const  search = {...state.search};
     search.search = action.payload;
     return {...state, search: search}
    }
    case FETCH_USER_STATS: {
      return {...state, fetching: true, fetched: false, error: {}}
    }
    case FETCH_USER_STATS_SUCCESS: {
      return {...state, fetching: false, fetched: true, stats: action.payload, error: {}}
    }
    case FETCH_USER_STATS_FAILURE: {
      error = action.payload;
      return {...state, fetching: false, fetched: false, error: error}
    }
    case TOGGLE_SEARCH_FILTER: {
      const search = {...state.search};
      search.filters[action.payload] = !search.filters[action.payload];
      return {...state, search: search}
    }
    case SELECT_USER: {
      return {...state, selected: action.payload}
    }
    case UPDATE_USER: {
      return {...state, updating: true, updated: false}
    }
    case UPDATE_USER_SUCCESS: {
      const id = action.payload.id;
      const users = [...state.users];
      const userToUpdate = users.findIndex((user) => {return user.id === id});
      users[userToUpdate] = action.payload;
      return {...state, updating: false, updated: true, users: users, error: {}}
    }
    case UPDATE_USER_FAILURE: {
      error = action.payload;
      return {...state, updating: false, updated: false, error: error}
    }
  }
  return state;
}