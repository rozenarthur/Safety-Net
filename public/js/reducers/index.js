import { combineReducers } from "redux";
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import activationReducer from './activationReducer';
import loginReducer from './loginReducer';
import authenticationReducer from './authenticationReducer';
import forgotReducer from  './forgotReducer';
import setUpReducer from './setUpReducer';
import usersReducer from './usersReducer';
import sitesReducer from './sitesReducer';
import securityQuestionsReducer from './securityQuestionsReducer';

export default combineReducers({
  register: registerReducer,
  user: userReducer,
  activation: activationReducer,
  login: loginReducer,
  authentication: authenticationReducer,
  forgot: forgotReducer,
  setup: setUpReducer,
  users: usersReducer,
  sites: sitesReducer,
  security_questions: securityQuestionsReducer
});