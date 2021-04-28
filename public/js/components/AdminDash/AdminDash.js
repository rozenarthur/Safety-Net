import React from 'react';
import AdminNavBarContainer from '../../containers/AdminNavBarContainer';
import AdminPanel from '../../components/AdminDash/AdminPanel';
import UsersPanel from '../../components/AdminDash/UsersPanel';
import NetworkPanel from '../../components/AdminDash/NetworkPanel';
import RequestsPanel from '../../components/AdminDash/RequestsPanel';
import LogoutPanel from '../../components/AdminDash/LogoutPanel';
import axios from 'axios';
import {ROOT_URL, alertOptions} from '../../utils/Utils';
import AlertContainer from 'react-alert';
import moment from 'moment';
import {browserHistory} from 'react-router';

class AdminDash extends React.Component {

  componentWillMount() {

    /**
     *   Check if user is logged in on back end
     * if not, redirect to login page and logout and unauthenticate on the front end
     * if they are, check if they are logged in and authenticated on front end
     * if not, authenticate and login on front end
     * else, get information from userReducer
     *  - for AdminPanel: First name, username, account type, last pass update, pass exp date
     *  - for UsersPanel: numTotalUsers, numActivatedUsers, numLockedUsers, numAdmins, numPending
     *  - for NetworkPanel: numSites
     *  - for RequestsPanel: numSQRequests, numForgotRequests
     *  -
     */
    const user = this.props.user;

    if(!moment().isAfter(user.password_expiration)) {
      this.getUserStats();
      this.getSites();
      this.getForgotRequests();
      this.getSecurityQuestions();
    } else {
      //Replace with redirect to change password
      browserHistory.push('/changepass');
    }


  }

  componentDidMount() {
    const {redirected_from_login, user, setRedirect} = this.props;
    const message = 'Your password expires ' + moment(user.password_expiration).fromNow();
    if(redirected_from_login) {
      setRedirect(false);
      msg.show(message, {
        time: 8000,
        type: 'success',
        icon: null
      });
    }
    if(redirected_from_login && user.id === 1) {
      msg.show("WARNING: This is the default admin account that comes with Safety Net. It has a preset password and preset security questions." +
                "It is recommended that you use this account to create a new administrator account and then delete this one, as it can be a " +
                "security risk.", {
        time: 30000,
        type: 'error',
        icon: null
      });
    }
  }

  getUserStats() {
    const {fetchUserStats, fetchUserStatsSuccess, fetchUsersStatsFailure} = this.props;
    fetchUserStats();
    axios.get(ROOT_URL + 'stats')
      .then((response) => {
        fetchUserStatsSuccess(response.data);
      })
      .catch((err) => {
        fetchUsersStatsFailure(err.response.data);
      })
  }

  getSites() {
    const {fetchSites, fetchSitesSuccess, fetchSitesFailure} = this.props;
    fetchSites();
    axios.get(ROOT_URL + 'site')
      .then((response) => {
        fetchSitesSuccess(response.data);
      })
      .catch((err) => {
        fetchSitesFailure(err.response.data);
      })
  }

  getForgotRequests() {
    const {fetchForgotRequests, fetchForgotRequestsSuccess, fetchForgotRequestsFailure} = this.props;
    fetchForgotRequests();
    axios.get(ROOT_URL + 'forgot')
      .then((response) => {
        fetchForgotRequestsSuccess(response.data);
      })
      .catch((err) => {
        fetchForgotRequestsFailure(err.response.data);
      })
  }

  getSecurityQuestions() {
    const {fetchSecurityQuestions, fetchSecurityQuestionsSuccess, fetchSecurityQuestionsFailure} = this.props;
    fetchSecurityQuestions();
    axios.get(ROOT_URL + 'sq')
      .then((response) => {
        fetchSecurityQuestionsSuccess(response.data);
      })
      .catch((err) => {
        fetchSecurityQuestionsFailure(err.response.data);
      })
  }



  render() {

    const style = {
      marginTop: -20,
      borderRadius: 0,
    };

    const noPadding = {
      paddingLeft: 0,
      paddingRight: 0
    };

    const {user, stats, sites, requests, security_questions, logoutUser, logoutUserSuccess, logoutUserFailure,
          unauthenticateUser, unauthenticateUserSuccess, unauthenticateUserFailure} = this.props;
    return (
      <div className="container-fluid" style={noPadding}>
        <AlertContainer ref={(a) => global.msg = a} {...alertOptions} />
        <AdminNavBarContainer/>
        <div className="row">
          <div className="jumbotron" style={style}>
            <AdminPanel
              firstName={user.first_name}
              username={user.username}
              accountType={user.role === 'admin' ? 'Administrator' : 'User'}
              lastPassUpdate={moment(user.last_password_update).format("MMMM Do YYYY")}
              passExp={moment(user.password_expiration).format("MMMM Do YYYY")}
            />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-offset-1 col-md-6">
                <UsersPanel
                  registered={stats.registered}
                  activated={stats.activated}
                  admins={stats.admins}
                  locked={stats.locked}
                  pending={stats.pending}
                />
              </div>
              <div className="col-md-4">
                <NetworkPanel
                  sites={sites}
                />
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-offset-1 col-md-6">
                <RequestsPanel
                  numForgotRequests={requests}
                  numSQRequests={security_questions}
                />
              </div>
              <div className="col-md-4">
                <LogoutPanel
                  logoutUser={logoutUser}
                  logoutUserSuccess={logoutUserSuccess}
                  logoutUserFailure={logoutUserFailure}
                  unauthenticateUser={unauthenticateUser}
                  unauthenticateUserSuccess={unauthenticateUserSuccess}
                  unauthenticateUserFailure={unauthenticateUserFailure}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default AdminDash;