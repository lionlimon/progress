import React from 'react';
import { Switch, Route } from 'react-router';
import AuthPage from './pages/AuthPage/AuthPage';

export default function routes() {
  return (
    <Switch>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Route path="/" exact>
        home
      </Route>
    </Switch>
  );
};
