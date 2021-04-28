import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './js/pages/App';
import RegisterPage from './js/reference/RegisterPage'

export default (
  <Route path="/" component={App} >
    <IndexRoute component={RegisterPage}/>
  </Route>
)