import { Component } from 'react';
import Chart from '../../Components/Chart';
import { getDatas } from '../../API';
import Loading from '../../Components/Loading';

class PoliceActions extends Component {
   state = {
      fetchSuccess: false,
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
         fetchSuccess: true,
         curfew,
         quarantine,
         maskWearing,
      })
   }

   render() {
      const {
         fetchSuccess,
         curfew,
         quarantine,
         maskWearing,
         // storeOpeningHours,
         // travelling,
         // shopsRestaurantsPubs
      } = this.state;
      return (
         fetchSuccess
         ? <>
            <Chart title={'Kijárási tilalom megszegése'} datas={curfew} />
            <Chart title={'Karantén megszegése'} datas={quarantine} />
            <Chart title={'Maszk hordás megszegése'} datas={maskWearing} />
         </>
         : <Loading />
      )
   }
}

export default PoliceActions;