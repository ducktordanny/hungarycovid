import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Routes = () => {
   return (
      <Switch>
         <Route exact path='/' />
         <Route path='/covid19' />
         <Route path='/police-actions' />
         <Route path='*' />
      </Switch>
   )
}

export default Routes;
