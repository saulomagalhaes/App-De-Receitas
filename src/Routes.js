import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
    </Switch>
  );
}

export default Routes;
