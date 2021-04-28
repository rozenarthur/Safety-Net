import React from 'react';
import { bindActionCreators } from 'redux';
import AdminDash from '../components/AdminDash/AdminDash';
import {fetchUser, fetchUserSuccess, fetchUserFailure, setRedirect} from '../actions/userActions';
import {fetchUserStats, fetchUserStatsSuccess, fetchUserStatsFailure} from '../actions/usersActions';
import {fetchSites, fetchSitesSuccess, fetchSitesFailure} from '../actions/sitesActions';
import {fetchForgotRequests, fetchForgotRequestsSuccess, fetchForgotRequestsFailure} from '../actions/forgotActions';
import {fetchSecurityQuestions, fetchSecurityQuestionsSuccess, fetchSecurityQuestionsFailure} from '../actions/securityQuestionsActions';
import {logoutUser, logoutUserSuccess, logoutUserFailure} from '../actions/loginActions'
import {unauthenticateUser, unauthenticateUserSuccess, unauthenticateUserFailure} from '../actions/authenticationActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.user.user,
    fetching: state.user.fetching,
    fetched: state.user.fetched,
    error: state.user.error,
    stats: state.users.stats,
    sites: state.sites.sites,
    requests: state.forgot.requests,
    security_questions: state.security_questions.security_questions,
    redirected_from_login: state.user.redirected_from_login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUser: fetchUser,
    fetchUserSuccess: fetchUserSuccess,
    fetchUserFailure: fetchUserFailure,
    setRedirect: setRedirect,
    fetchUserStats: fetchUserStats,
    fetchUserStatsSuccess: fetchUserStatsSuccess,
    fetchUserStatsFailure: fetchUserStatsFailure,
    fetchSites: fetchSites,
    fetchSitesSuccess: fetchSitesSuccess,
    fetchSitesFailure: fetchSitesFailure,
    fetchForgotRequests: fetchForgotRequests,
    fetchForgotRequestsSuccess: fetchForgotRequestsSuccess,
    fetchForgotRequestsFailure: fetchForgotRequestsFailure,
    fetchSecurityQuestions: fetchSecurityQuestions,
    fetchSecurityQuestionsSuccess: fetchSecurityQuestionsSuccess,
    fetchSecurityQuestionsFailure: fetchSecurityQuestionsFailure,
    logoutUser: logoutUser,
    logoutUserSuccess: logoutUserSuccess,
    logoutUserFailure: logoutUserFailure,
    unauthenticateUser: unauthenticateUser,
    unauthenticateUserSuccess: unauthenticateUserSuccess,
    unauthenticateUserFailure: unauthenticateUserFailure
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash);
