import { Component } from 'react';
import Chart from '../../Components/Chart';
import { getDatas } from '../../API';
import LoadingGif from '../../loading.gif';
import { element } from 'prop-types';

class PoliceActions extends Component {
   state = {
      curfew: null,
      quarantine: null,
      maskWearing: null,
      storeOpeningHours: null,
      travelling: null,
      shopsRestaurantsPubs: null,
   }

   componentDidMount = async () => {
      const getDayName = (dateString) => {
         const dayNumber = new Date(dateString).getDay();
         const hungarianDayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
         return hungarianDayNames[dayNumber];
      }
      const result = await getDatas();

      const curfew = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.policeAction.curfew ];
      })

      const quarantine = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.policeAction.quarantine ];
      })

      const maskWearing = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.policeAction.maskWearing ];
      })

      this.setState({
         curfew,
         quarantine,
         maskWearing,
      })
   }

   render() {
      const {
         curfew,
         quarantine,
         maskWearing,
         // storeOpeningHours,
         // travelling,
         // shopsRestaurantsPubs
      } = this.state;
      return (
         <>
            <div className='diagram'>{
               curfew
               ? <Chart title={'Kijárási tilalom megszegése'} datas={curfew} />
               : <img className='loading' src={LoadingGif} alt='Loading...' />
            }</div>
            <div className='diagram'>{
               quarantine
               ? <Chart title={'Karantén megszegése'} datas={quarantine} />
               : <img className='loading' src={LoadingGif} alt='Loading...' />
            }</div>
            <div className='diagram'>{
               maskWearing
               ? <Chart title={'Maszk hordás megszegése'} datas={maskWearing} />
               : <img className='loading' src={LoadingGif} alt='Loading...' />
            }</div>
         </>
      )
   }
}

export default PoliceActions;