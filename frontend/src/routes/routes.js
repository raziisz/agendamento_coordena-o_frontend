import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRouter from './PrivateRouter';

import Login from '../pages/Login'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}