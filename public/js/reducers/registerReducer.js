import { REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_FORM_UPDATE, REGISTER_FORM_RESET } from '../actions/registerActions';

const INITIAL_STATE = {
  newUser: {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    type: ''
  },
  message: {},
  registering: false,
  registered: false,
  error: {}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  const INITIAL_USER_STATE = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    type: ''
  };
  switch (action.type) {
    case REGISTER_FORM_UPDATE: {
      const {name, value} = action.payload;
      const newUser = {...state.newUser};
      newUser[name] = value;
      return {...state, newUser: newUser, message: {}, registering: false, registered: false, error: {}}
    }
    case REGISTER_FORM_RESET: {
      return {...state, newUser: INITIAL_USER_STATE, message: {}, registering: false, registered: false, error: {}}
    }
    case REGISTER_USER: {
      return {...state, newUser: {...state.newUser}, message: {}, registering: true, registered: false, error: {}}
    }
    case REGISTER_USER_SUCCESS: {
      return {...state, newUser: INITIAL_USER_STATE, message: action.payload.message, registering: false, registered: true, error: {}}
    }
    case REGISTER_USER_FAILURE: {
      error = action.payload;
      return {...state, newUser: {...state.newUser}, message: {}, registering: false, registered: false, error: error}
    }
  }

  return state;
}