import { Component } from 'react';

import Cards from '../../Components/Cards/Cards';
import Loading from '../../Components/Loading';
import Section from '../../Components/Section/Section';
import Footer from '../../Components/Footer/Footer';
// import { getData } from '../../API';
import '../Pages.css';

class Home extends Component {
   state = {
      allData: this.props.data,
      loaded: false,
      countyMap: null,
      newsHungary: null,
      newsGlobal: null,
      lastUpdateInHungary: null,
      lastUpdateInWorld: null,
      actualNewsSection: null,
   }

   componentDidMount = async () => {
      const formatNumber = (number) => {
         return new Intl.NumberFormat('hu-HU').format(number);
      }

      const formatDate = (dateString) => {
         return new Date(dateString).toLocaleString('hu-HU');
      };

      const result = this.state.allData;

      const lastIndex = result.length - 1;
      const { countyMap } = result[lastIndex];

      const newsHungary = [{
         title: 'Mai fertőzöttek',
         data: formatNumber(result[lastIndex].covid.infectedToday),
      }, {
         title: 'Mai tesztek',
         data: formatNumber(result[lastIndex].covid.testedToday),
      }, {
         title: 'Mai halálozások',
         data: formatNumber(result[lastIndex].covid.deceasedToday),
      }, {
         title: 'Mai beoltottak',
         data: formatNumber(result[lastIndex].covid.vaccinatedToday),
      },];

      const newsGlobal = [{
         title: 'Fertőzöttek',
         data: formatNumber(result[lastIndex].covid.activeInfectedGlobal)
      }, {
         title: 'Halálozások',
         data: formatNumber(result[lastIndex].covid.deceasedGlobal)
      }, {
         title: 'Gyógyultak',
         data: formatNumber(result[lastIndex].covid.recoveredGlobal)
      },]

      const dateOptions = {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric'
      };

      const formatedLastUpdateInHungary = new Date(result[lastIndex].lastUpdateInHungary).toLocaleString('HU-hu', dateOptions);
      const lastUpdateInHungaryWithTitle = (
         <label htmlFor="lastUpdateInHungaryTitle">Fontosabb adatok kigyűjtve:<br /><br />Utolsó frissítés Magyarországon:<br />{formatedLastUpdateInHungary}</label>
      );

      const lastUpdateInWorld = new Date(result[lastIndex].lastUpdateInWorld).toLocaleString('HU-hu', dateOptions);
      const lastUpdateInWorldWithTitle = (
         <label htmlFor="lastUpdateInWorldTitle">Utolsó frissítés a világon:<br />{lastUpdateInWorld}</label>
      );

      const { infectedToday, infected, testedToday, tested, deceasedToday, deceased, quarantined, recovered, activeInfected, vaccinated, vaccinatedToday } = result[lastIndex].covid;
      const { lastUpdateInHungary } = result[lastIndex];
      const actualNewsSection = `A mai napon (${formatDate(lastUpdateInHungary)}) újabb ${formatNumber(infectedToday)} beteget azonosítottak Magyarországon, így a fertőzöttek száma ${formatNumber(infected)} főre, míg az aktív betegek száma ${formatNumber(activeInfected)} főre változott és újabb ${formatNumber(deceasedToday)} ember vesztette életét, mellyel eddig összesen ${formatNumber(deceased)} áldozatot követelt a vírus. Továbbá a mai napon ${formatNumber(testedToday)} mintavételre került sor és ezzel eddig összesen ${formatNumber(tested)} ember lett tesztelve. A gyógyultak száma jelenleg ${formatNumber(recovered)} főre nött, illetve ${formatNumber(quarantined)} fő van hatósági házi karanténban. A mai napon ${formatNumber(vaccinatedToday)} ember kapta meg valamelyik oltóanyag egyikét, ezzel összesen eddig ${formatNumber(vaccinated)} ember lett beoltva.`;

      // console.log(this.state.actualNewsSection);

      this.setState({
         loaded: true,
         countyMap,
         newsHungary,
         newsGlobal,
         lastUpdateInHungary: lastUpdateInHungaryWithTitle,
         lastUpdateInWorld: lastUpdateInWorldWithTitle,
         actualNewsSection
      });
   }

   render() {
      const {
         loaded,
         countyMap,
         newsHungary,
         newsGlobal,
         lastUpdateInHungary,
         lastUpdateInWorld,
         actualNewsSection
      } = this.state;

      return (
         <>
            {
               loaded
                  ? <div>
                     <Section title='Aktuális hírek' contents={[actualNewsSection]} />
                     <Section title='Frissítés!' contents={['A hivatalos oldalon a rendőrségi intézkedésekkel kapcsolatos adatok közvetítése megszűnt így ezeket nem lehet megjeleníteni.']} />
                     <Cards mainTitle={lastUpdateInHungary} datas={newsHungary} tag={'fő'} />
                     <Cards mainTitle={lastUpdateInWorld} datas={newsGlobal} tag={'fő'} />
                     <section className='map-container'><img className='map' src={countyMap} alt='map' /></section>
                     <Section title='Újdonságok' contents={[
                        'Elérhetővé vált újabb grafikon az oldal "Koronavírus" menüpontjában, melyen látható, hogy egy nap mennyi embert oltanak be. Az adatok megjelenítése a többihez hasonlóan egy hétre nyúlik vissza.',
                        'Az oldalnak elérhetővé vált az új discord oldala, ahol minden nap a magyar frissítést követően kiírásra kerül a fent látható összefoglaló. A csatlakozáshoz allul kattintson a discord ikonra.',
                        'ducktorD - 2021. 03. 18.']}
                     />
                     <Footer />
                  </div>
                  : <Loading />
            }
         </>
      )
   }
}

export default Home;