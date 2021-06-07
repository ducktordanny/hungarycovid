import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { getData } from '../../API';
// import Loading from '../Loading';
import Home from '../../Containers/Home/Home';
import Covid from '../../Containers/Covid/Covid';
// import PoliceActions from '../../Containers/PoliceActions/PoliceActions';
import NotFound from '../NotFound';
import Loading from '../Loading';

const Routes = () => {
   const [apiData, setApiData] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         const response = await getData();
         // if we had world update today but still not in Hungary (in Chart we would have 2 today)
         if (response.length === 8) {
            response.splice(response.length - 2, 1);
         }
         setApiData(response);
      }
      fetchData();
   }, []);

   return (
      apiData
         ? <Switch>
            <Route exact path='/' ><Home data={apiData} /></Route>
            <Route path='/covid19'><Covid data={apiData} /></Route>
            {/* <Route path='/police-actions'><PoliceActions data={apiData} /></Route> */}
            <Route path='*'><NotFound /></Route>
         </Switch>
         : <Loading />
   )
}

export default Routes;
