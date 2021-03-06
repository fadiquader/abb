import * as React from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";
//
import {RegisterConnector} from "./modules/register/RegisterConnector";
import {LoginConnector} from "./modules/login/LoginConnector";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/register" component={RegisterConnector} />
        <Route exact={true} path="/login" component={LoginConnector} />
      </Switch>
    </BrowserRouter>
  )
};
