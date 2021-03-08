import { Component } from 'react';

import Cards from '../../Components/Cards/Cards';
import Loading from '../../Components/Loading';
import { getDatas } from '../../API';
import '../Pages.css';

class Home extends Component {
   state = {
      loaded: false,
      countyMap: null,
      newsHungary: null,
      newsGlobal: null,
      lastUpdateInHungary: null,
      lastUpdateInWorld: null
   }

   componentDidMount = async () => {
      const format = (number) => {
         return new Intl.NumberFormat('hu-HU').format(number);
      }

      const result = await getDatas();
      result.reverse();
      const { countyMap } = result[0];

      const newsHungary = [{
         title: 'Mai fertőzöttek',
         data: format(result[0].covid.infectedToday),
      }, {
         title: 'Mai tesztek',
         data: format(result[0].covid.testedToday),
      }, {
         title: 'Mai halálozások',
         data: format(result[0].covid.deceasedToday),
      }, {
         title: 'Beoltott emberek száma',
         data: format(result[0].covid.vaccinated),
      }, ];
      
      const newsGlobal = [{
         title: 'Fertőzöttek',
         data: format(result[0].covid.activeInfectedGlobal)
      }, {
         title: 'Halálozások',
         data: format(result[0].covid.deceasedGlobal)
      }, {
         title: 'Gyógyultak',
         data: format(result[0].covid.recoveredGlobal)
      }, ]

      const dateOptions = {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric'
      };

      const lastUpdateInHungary = new Date(result[0].lastUpdateInHungary).toLocaleString('HU-hu', dateOptions);
      const lastUpdateInHungaryWithTitle = (
         <label htmlFor="lastUpdateInHungaryTitle">Utolsó frissítés Magyarországon:<br/>{ lastUpdateInHungary }</label>
      );

      const lastUpdateInWorld = new Date(result[0].lastUpdateInWorld).toLocaleString('HU-hu', dateOptions);
      const lastUpdateInWorldWithTitle = (
         <label htmlFor="lastUpdateInWorldTitle">Utolsó frissítés a világon:<br/>{ lastUpdateInWorld }</label>
      );

      this.setState({
         loaded: true,
         countyMap,
         newsHungary,
         newsGlobal,
         lastUpdateInHungary: lastUpdateInHungaryWithTitle,
         lastUpdateInWorld: lastUpdateInWorldWithTitle
      });
   }

   render() {
      const {
         loaded,
         countyMap,
         newsHungary,
         newsGlobal,
         lastUpdateInHungary,
         lastUpdateInWorld
      } = this.state;

      return (
         <>
            {
               loaded 
               ? <div>
                     <Cards mainTitle={ lastUpdateInHungary } datas={ newsHungary } tag={ 'fő' } />
                     <Cards mainTitle={ lastUpdateInWorld } datas={ newsGlobal } tag={ 'fő' } />
                     <section className='map-container'><img className='map' src={ countyMap } alt='map' /></section>
                  </div>
               : <Loading />
            }
         </>
      )
   }
}

export default Home;