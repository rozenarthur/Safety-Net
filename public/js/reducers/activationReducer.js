import { ACTIVATE_USER, ACTIVATE_USER_SUCCESS, ACTIVATE_USER_FAILURE, ACTIVATE_FORM_UPDATE, ACTIVATE_FORM_RESET } from '../actions/activationActions';

const INITIAL_FORM_STATE = {
  username: '',
  password: '',
  code: ''
};

const INITIAL_STATE = {
  activation: INITIAL_FORM_STATE,
  activating: false,
  activated: false,
  error: {}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case ACTIVATE_FORM_UPDATE: {
      const {name, value} = action.payload;
      const activation = {...state.activation};
      activation[name] = value;
      return {...state, activation: activation, activating: false, activated: false, error: {}}
    }
    case ACTIVATE_FORM_RESET: {
      return {...state, activation: INITIAL_FORM_STATE, activating: false, activated: false, error: {}}
    }
    case ACTIVATE_USER: {
      return {...state, activation: {...state.activation}, activating: true, activated: false, error: {}}
    }
    case ACTIVATE_USER_SUCCESS: {
      return {...state, activation: INITIAL_FORM_STATE, activating: false, activated: true, error: {}}
    }
    case ACTIVATE_USER_FAILURE: {
      error = action.payload;
      return {...state, activation: {...state.activation}, activating: false, activated: false, error: error}
    }
  }

  return state;
}