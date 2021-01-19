import { Component } from 'react';
import Chart from '../../Components/Chart';
import Loading from '../../Components/Loading';
import { getDatas } from '../../API';
import Cards from '../../Components/Cards/Cards';

import './Covid.css';

class Covid extends Component {
   state = {
      fetchSuccess: false,
      dailyInfected: null,
      dailyTested: null,
      dailyDeceased: null,
      infected: null,
   }

   componentDidMount = async () => {
      const getDayName = (dateString) => {
         const dayNumber = new Date(dateString).getDay();
         const hungarianDayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
         return hungarianDayNames[dayNumber];
      }
      const format = (number) => {
         return new Intl.NumberFormat('hu-HU').format(number);
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

      result.reverse();
      const infected = [{
            title: 'Fertőzöttek',
            data: format(result[0].covid.infected),
         },{
            title: 'Mai új fertőzöttek',
            data: format(result[0].covid.infectedToday),
         },{
            title: 'Tegnapi új fertőzöttek',
            data: format(result[1].covid.infectedToday),
         },{
            title: 'Aktív fertőzöttek',
            data: format(result[0].covid.activeInfected),
         },{
            title: 'Fertőzöttek a világon',
            data: format(result[0].covid.activeInfectedGlobal),
         },
      ];

      this.setState({
         fetchSuccess: true,
         dailyInfected,
         dailyTested,
         dailyDeceased,
         infected,
      });
   }

   render() {
      const { fetchSuccess, dailyInfected, dailyTested, dailyDeceased, infected } = this.state;
      return (
         fetchSuccess
         ? <>
            <Cards mainTitle={'Fertőzöttek'} datas={infected} tag={'fő'} />
            
            <Chart title={'Napi új fertőzöttek'} datas={dailyInfected} />
            <Chart title={'Napi új tesztelések'} datas={dailyTested} />
            <Chart title={'Napi új halálozások'} datas={dailyDeceased} />
         </>
         : <Loading />
      )
   }
}

export default Covid;