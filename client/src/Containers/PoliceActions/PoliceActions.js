import { Component } from 'react';
import Chart from '../../Components/Chart';
// import { getData } from '../../API';
import Loading from '../../Components/Loading';
import Footer from '../../Components/Footer/Footer';

class PoliceActions extends Component {
   state = {
      allData: this.props.data,
      fetchSuccess: false,
      curfew: null,
      quarantine: null,
      maskWearing: null,
      storeOpeningHours: null,
      travelling: null,
   }

   componentDidMount = async () => {
      const getDayName = (dateString) => {
         const dayNumber = new Date(dateString).getDay();
         const hungarianDayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
         return hungarianDayNames[dayNumber];
      }
      const result = this.state.allData;

      const curfew = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.policeAction.curfew ];
      });

      const quarantine = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.policeAction.quarantine ];
      });

      const maskWearing = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.policeAction.maskWearing ];
      });

      const storeOpeningHours = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.policeAction.storeOpeningHours ];
      });

      const travelling = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.policeAction.travelling ];
      });

      this.setState({
         fetchSuccess: true,
         curfew,
         quarantine,
         maskWearing,
         storeOpeningHours,
         travelling
      })
   }

   render() {
      const {
         fetchSuccess,
         curfew,
         quarantine,
         maskWearing,
         storeOpeningHours,
         travelling
      } = this.state;
      return (
         fetchSuccess
         ? <>
            <Chart title={'Kijárási tilalom megszegése'} datas={curfew} />
            <Chart title={'Karantén megszegése'} datas={quarantine} />
            <Chart title={'Maszk hordás megszegése'} datas={maskWearing} />
            <Chart title={'Bolti nyitvatartási korlátozás megszegése'} datas={storeOpeningHours} />
            <Chart title={'Utazási korlátozás megszegése'} datas={travelling} />

            <Footer />
         </>
         : <Loading />
      )
   }
}

export default PoliceActions;