import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/foods" render={ (props) => <Foods { ...props } /> } />
    </Switch>
  );
}

export default Routes;
