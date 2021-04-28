export const FETCH_SITES = 'FETCH_SITES';
export const FETCH_SITES_SUCCESS = 'FETCH_SITES_SUCCESS';
export const FETCH_SITES_FAILURE = 'FETCH_SITES_FAILURE';

export function fetchSites() {
  return {
    type: FETCH_SITES
  }
}

export function fetchSitesSuccess(data) {
  return {
    type: FETCH_SITES_SUCCESS,
    payload: data
  }
}

export function fetchSitesFailure(data) {
  return {
    type: FETCH_SITES_FAILURE,
    payload: data
  }
}