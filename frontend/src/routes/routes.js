import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRouter from './PrivateRouter';

import Login from '../pages/Login'
import Home from '../pages/Home'
import Agenda from '../pages/Agenda'
import Create from '../pages/Agenda/Create'
import EditA from '../pages/Agenda/EditA'
import Users from '../pages/Users'
import CreateU from '../pages/Users/CreateU'
import EditU from '../pages/Users/EditU'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRouter path="/home" component={Home} />
        <PrivateRouter path="/agenda" exact component={Agenda} />
        <PrivateRouter path="/agenda/novo" component={Create} />
        <PrivateRouter path="/agenda/editar/:id" component={EditA} />
        <PrivateRouter path="/usuarios" exact component={Users} />
        <PrivateRouter path="/usuarios/novo" component={CreateU} />
        <PrivateRouter path="/usuarios/editar/:id" component={EditU} />
      </Switch>
    </BrowserRouter>
  );
}