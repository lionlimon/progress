import React from 'react';
import { Switch, Route } from 'react-router';
import AuthPage from '@pages/AuthPage/AuthPage';

/**
 * @param {boolean} isAuthorized
 * @return {JSX.Element}
 */
export default function routes(isAuthorized) {
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
