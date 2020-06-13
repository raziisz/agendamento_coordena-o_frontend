import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRouter from './PrivateRouter';

import Login from '../pages/Login'
import Home from '../pages/Home'
import Agenda from '../pages/Agenda'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRouter path="/home" component={Home} />
        <PrivateRouter path="/agenda" component={Agenda} />
      </Switch>
    </BrowserRouter>
  );
}