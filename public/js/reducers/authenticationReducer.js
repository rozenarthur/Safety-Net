import { AUTHENTICATE_USER, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE, AUTHENTICATION_FORM_UPDATE,
        AUTHENTICATION_FORM_RESET, UNAUTHENTICATE_USER, UNAUTHENTICATE_USER_SUCCESS, UNAUTHENTICATE_USER_FAILURE }
        from '../actions/authenticationActions';

const INITIAL_FORM_STATE = {
  answer1: '',
  answer2: '',
  answer3: ''
};

const INITIAL_STATE = {
  authentication: INITIAL_FORM_STATE,
  authenticating: false,
  authenticated: false,
  unauthenticating: false,
  error: {}
};


export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case AUTHENTICATION_FORM_UPDATE: {
      const {name, value} = action.payload;
      const authentication = {...state.authentication};
      authentication[name] = value;
      return {...state, authentication: authentication, authenticating: false, authenticated: false, error: {}}
    }
    case AUTHENTICATION_FORM_RESET: {
      return {...state, authentication: INITIAL_FORM_STATE, authenticating: false, authenticated: false, error: {}}
    }
    case AUTHENTICATE_USER: {
      return {...state, authentication: {...state.authentication}, authenticating: true, authenticated: false, error: {}}
    }
    case AUTHENTICATE_USER_SUCCESS: {
      return {...state, authentication: INITIAL_FORM_STATE, authenticating: false, authenticated: true, error: {}}
    }
    case AUTHENTICATE_USER_FAILURE: {
      error = action.payload;
      return {...state, authentication: {...state.authentication}, authenticating: false, authenticated: false, error: error}
    }
    case UNAUTHENTICATE_USER: {
      return {...state, unauthenticating: true}
    }
    case UNAUTHENTICATE_USER_SUCCESS: {
      return {...state, authenticated: false, unauthenticating: false}
    }
    case UNAUTHENTICATE_USER_FAILURE: {
      error = action.payload;
      return {...state, authenticated: false, unauthenticating:false, error: error}
    }
  }

  return state;
}