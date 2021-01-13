import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../Containers/Home/Home';

const Routes = () => {
   return (
      <Switch>
         <Route exact path='/' component={Home} />
         <Route path='/covid19' />
         <Route path='/police-actions' />
         <Route path='*' />
      </Switch>
   )
}

export default Routes;
