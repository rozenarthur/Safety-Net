import {FETCH_SITES, FETCH_SITES_SUCCESS, FETCH_SITES_FAILURE} from '../actions/sitesActions';

const INITIAL_STATE ={
  sites: {},
  fetching: false,
  fetched: false,
  error: {}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case FETCH_SITES: {
      return {...state, sites: {}, fetching: true, fetched: false, error: {}}
    }
    case FETCH_SITES_SUCCESS: {
      return {...state, sites: action.payload, fetching: false, fetched: true, error: {}}
    }
    case FETCH_SITES_FAILURE: {
      error = action.payload;
      return {...state, sites: {}, fetching: false, fetched: false, error: error}
    }
  }
  return state;
}