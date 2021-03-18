import { Component } from 'react';
import Chart from '../../Components/Chart';
import Loading from '../../Components/Loading';
import Footer from '../../Components/Footer/Footer';
// import { getData } from '../../API';
import Cards from '../../Components/Cards/Cards';

import '../Pages.css';

class Covid extends Component {
   state = {
      allData: this.props.data,
      fetchSuccess: false,
      dailyInfected: null,
      dailyTested: null,
      dailyDeceased: null,
      dailyVaccinated: null,
      infected: null,
      deceased: null,
      tested: null,
      recovered: null,
      vaccinated: null,
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
      
      const result = this.state.allData;

      // if we had world update today but still not in Hungary (in Chart we would have 2 today)
      if (result.length === 8) {
         result.splice(0, 1);
      }

      const dailyInfected = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.covid.infectedToday ];
      });
      const dailyTested = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.covid.testedToday ];
      });
      const dailyDeceased = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.covid.deceasedToday ];
      });
      const dailyVaccinated = result.map(element => {
         return [ getDayName(element.lastUpdateInHungary), element.covid.vaccinatedToday ];
      });

      // result.reverse();

      const lastIndex = result.length - 1;
      const lastButOneIndex = result.length - 2;

      const infected = [{
            title: 'Fertőzöttek',
            data: format(result[lastIndex].covid.infected),
         }, {
            title: 'Mai új fertőzöttek',
            data: format(result[lastIndex].covid.infectedToday),
         }, {
            title: 'Tegnapi új fertőzöttek',
            data: format(result[lastButOneIndex].covid.infectedToday),
         }, {
            title: 'Aktív fertőzöttek',
            data: format(result[lastIndex].covid.activeInfected),
         }, {
            title: 'Fertőzöttek a világon',
            data: format(result[lastIndex].covid.activeInfectedGlobal),
         },
      ];

      const deceased = [{
         title: 'Halálozások',
         data: format(result[lastIndex].covid.deceased)
      }, {
         title: 'Mai halálozások',
         data: format(result[lastIndex].covid.deceasedToday)
      }, {
         title: 'Tegnapi halálozások',
         data: format(result[lastButOneIndex].covid.deceasedToday)
      }, {
         title: 'Halálozások a világon',
         data: format(result[lastIndex].covid.deceasedGlobal)
      }];

      const tested = [{
         title: 'Tesztelések',
         data: format(result[lastIndex].covid.tested)
      }, {
         title: 'Mai tesztelések',
         data: format(result[lastIndex].covid.testedToday)
      }, {
         title: 'Tegnapi tesztelések',
         data: format(result[lastButOneIndex].covid.testedToday)
      }];

      const recovered = [{
         title: 'Gyógyultak',
         data: format(result[lastIndex].covid.recovered)
      }, {
         title: 'Gyógyultak a világon',
         data: format(result[lastIndex].covid.recoveredGlobal)
      }];

      const vaccinated = [{
         title: 'Összesen beoltottak',
         data: format(result[lastIndex].covid.vaccinated),
      }, {
         title: 'Ma beoltottak',
         data: format(result[lastIndex].covid.vaccinatedToday),
      }];

      this.setState({
         fetchSuccess: true,
         dailyInfected,
         dailyTested,
         dailyDeceased,
         dailyVaccinated,
         infected,
         deceased,
         tested,
         recovered,
         vaccinated,
      });
   }

   render() {
      const { 
         fetchSuccess,
         dailyInfected,
         dailyTested,
         dailyDeceased,
         dailyVaccinated,
         infected,
         deceased,
         tested,
         recovered,
         vaccinated,
      } = this.state;

      return (
         fetchSuccess
         ? <>
            <Cards mainTitle={'Fertőzöttek'} datas={infected} tag={'fő'} />
            <Cards mainTitle={'Halálozások'} datas={deceased} tag={'fő'} />
            <Cards mainTitle={'Tesztelések'} datas={tested} tag={'fő'} />
            <Cards mainTitle={'Gyógyultak'} datas={recovered} tag={'fő'} />
            <Cards mainTitle={'Beoltottak száma'} datas={vaccinated} tag={'fő'} />

            <Chart title={'Napi új fertőzöttek'} datas={dailyInfected} />
            <Chart title={'Napi új tesztelések'} datas={dailyTested} />
            <Chart title={'Napi új halálozások'} datas={dailyDeceased} />
            <Chart title={'Napi beoltások'} datas={dailyVaccinated} />

            <Footer />
         </>
         : <Loading />
      )
   }
}

export default Covid;