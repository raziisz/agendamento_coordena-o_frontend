import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRouter from './PrivateRouter';

import Login from '../pages/Login'
import Home from '../pages/Home'
import Agenda from '../pages/Agenda'
import Create from '../pages/Agenda/Create'
import Users from '../pages/Users'
import CreateU from '../pages/Users/CreateU'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRouter path="/home" component={Home} />
        <PrivateRouter path="/agenda" exact component={Agenda} />
        <PrivateRouter path="/agenda/novo" component={Create} />
        <PrivateRouter path="/usuarios" exact component={Users} />
        <PrivateRouter path="/usuarios/novo" component={CreateU} />
      </Switch>
    </BrowserRouter>
  );
}