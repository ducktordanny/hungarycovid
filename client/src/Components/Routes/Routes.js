import { Route, Switch } from 'react-router-dom';

import Home from '../../Containers/Home/Home';
import Covid from '../../Containers/Covid/Covid';
import PoliceActions from '../../Containers/PoliceActions/PoliceActions';
import NotFound from '../NotFound';

const Routes = () => {
   return (
      <Switch>
         <Route exact path='/' ><Home /></Route>
         <Route path='/covid19'><Covid /></Route>
         <Route path='/police-actions'><PoliceActions /></Route>
         <Route path='*'><NotFound /></Route>
      </Switch>
   )
}

export default Routes;
