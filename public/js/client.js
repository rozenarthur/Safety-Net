import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from "./pages/App";
import RegisterPage from "./pages/RegisterPage";
import ActivationPage from "./pages/ActivationPage";
import LoginPage from "./pages/LoginPage";
import AdminDashPage from "./pages/AdminDashPage";
import ForgotPage from "./pages/ForgotPage";
import UsersPage from "./pages/UsersPage";
import UsersSearchPage from "./pages/UsersSearchPage";
import UserProfilePage from "./pages/UserProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

import store from "./store";

const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LoginPage}/>
      <Route path="activate" component={ActivationPage}/>
      <Route path="forgot" component={ForgotPage}/>
      <Route path="admin" component={AdminDashPage}/>
      <Route path="users" component={UsersPage}/>
      <Route path="register" component={RegisterPage}/>
      <Route path="search" component={UsersSearchPage}/>
      <Route path="profile" component={UserProfilePage}/>
      <Route path="changepass" component={ChangePasswordPage}/>
    </Route>
  </Router>
</Provider>, app);
