import { Component } from 'react';
import Chart from '../../Components/Chart';
import { getDatas } from '../../API';
import LoadingGif from '../../loading.gif';

import './Covid.css';

class Covid extends Component {
   state = {
      dailyInfected: null,
      dailyTested: null,
      dailyDeceased: null
   }

   componentDidMount = async () => {
      const getDayName = (dateString) => {
         const dayNumber = new Date(dateString).getDay();
         const hungarianDayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
         return hungarianDayNames[dayNumber];
      }

      const result = await getDatas();
      
      const dailyInfected = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.covid.infectedToday ];
      });
      const dailyTested = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.covid.testedToday ];
      });
      const dailyDeceased = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.covid.deceasedToday ];
      });
      
      this.setState({
         dailyInfected,
         dailyTested,
         dailyDeceased
      });
   }

   render() {
      const { dailyInfected, dailyTested, dailyDeceased } = this.state;
      return (
         <>
            <div className='diagram'>{
               dailyInfected
               ? <Chart title={'Napi új fertőzöttek'} datas={dailyInfected} />
               : <img className='loading' src={LoadingGif} alt='Loading...' />
            }</div>
            <div className='diagram'>{
               dailyTested
               ? <Chart title={'Napi új tesztelések'} datas={dailyTested} />
               : <img className='loading' src={LoadingGif} alt='Loading...' />
            }</div>
            <div className='diagram'>{
               dailyDeceased
               ? <Chart title={'Napi új halálozások'} datas={dailyDeceased} />
               : <img className='loading' src={LoadingGif} alt='Loading...' />
            }</div>
         </>
      )
   }
}

export default Covid;