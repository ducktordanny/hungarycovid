import { Component } from 'react';
import Chart from '../../Components/Chart';
import Loading from '../../Components/Loading';
import { getDatas } from '../../API';
import Cards from '../../Components/Cards/Cards';

import '../Pages.css';

class Covid extends Component {
   state = {
      fetchSuccess: false,
      dailyInfected: null,
      dailyTested: null,
      dailyDeceased: null,
      infected: null,
      deceased: null,
      tested: null,
      recovered: null,
   }

   componentWillUnmount = () => {
      
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
         }, {
            title: 'Mai új fertőzöttek',
            data: format(result[0].covid.infectedToday),
         }, {
            title: 'Tegnapi új fertőzöttek',
            data: format(result[1].covid.infectedToday),
         }, {
            title: 'Aktív fertőzöttek',
            data: format(result[0].covid.activeInfected),
         }, {
            title: 'Fertőzöttek a világon',
            data: format(result[0].covid.activeInfectedGlobal),
         },
      ];

      const deceased = [{
         title: 'Halálozások',
         data: format(result[0].covid.deceased)
      }, {
         title: 'Mai halálozások',
         data: format(result[0].covid.deceasedToday)
      }, {
         title: 'Tegnapi halálozások',
         data: format(result[1].covid.deceasedToday)
      }, {
         title: 'Halálozások a világon',
         data: format(result[0].covid.deceasedGlobal)
      }];

      const tested = [{
         title: 'Tesztelések',
         data: format(result[0].covid.tested)
      }, {
         title: 'Mai tesztelések',
         data: format(result[0].covid.testedToday)
      }, {
         title: 'Tegnapi tesztelések',
         data: format(result[1].covid.testedToday)
      }];

      const recovered = [{
         title: 'Gyógyultak',
         data: format(result[0].covid.recovered)
      }, {
         title: 'Gyógyultak a világon',
         data: format(result[0].covid.recoveredGlobal)
      }]

      this.setState({
         fetchSuccess: true,
         dailyInfected,
         dailyTested,
         dailyDeceased,
         infected,
         deceased,
         tested,
         recovered,
      });
   }

   render() {
      const { 
         fetchSuccess,
         dailyInfected,
         dailyTested,
         dailyDeceased,
         infected,
         deceased,
         tested,
         recovered,
      } = this.state;

      return (
         fetchSuccess
         ? <>
            <Cards mainTitle={'Fertőzöttek'} datas={infected} tag={'fő'} />
            <Cards mainTitle={'Halálozások'} datas={deceased} tag={'fő'} />
            <Cards mainTitle={'Tesztelések'} datas={tested} tag={'fő'} />
            <Cards mainTitle={'Gyógyultak'} datas={recovered} tag={'fő'} />

            <Chart title={'Napi új fertőzöttek'} datas={dailyInfected} />
            <Chart title={'Napi új tesztelések'} datas={dailyTested} />
            <Chart title={'Napi új halálozások'} datas={dailyDeceased} />
         </>
         : <Loading />
      )
   }
}

export default Covid;