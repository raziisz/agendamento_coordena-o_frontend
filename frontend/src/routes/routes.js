import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRouter from './PrivateRouter';

import Login from '../pages/Login'
import Home from '../pages/Home'
import Agenda from '../pages/Agenda'
import Create from '../pages/Agenda/Create'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRouter path="/home" component={Home} />
        <PrivateRouter path="/agenda" exact component={Agenda} />
        <PrivateRouter path="/agenda/novo" component={Create} />
      </Switch>
    </BrowserRouter>
  );
}