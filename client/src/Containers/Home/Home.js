import { Component } from 'react';
import './Home.css';
import { getDatas } from '../../API';

class Home extends Component {
   state = {
      loaded: false,
      infectedToday: null,
      deceasedToday: null,
      testedToday: null,
      countyMap: null,
   }

   componentDidMount = async () => {
      const result = await getDatas();
      const { infectedToday, deceasedToday, testedToday } = result.reverse()[0].covid;
      const { countyMap } = result[0];

      this.setState({
         loaded: true,
         infectedToday,
         deceasedToday,
         testedToday,
         countyMap
      });
   }

   render() {
      const { loaded, infectedToday, deceasedToday, testedToday, countyMap } = this.state;

      return (
         <>
            { loaded ? <div>
               <h1>{infectedToday}</h1>
               <h1>{deceasedToday}</h1>
               <h1>{testedToday}</h1>
               <img className='map' src={countyMap} alt='map' />
            </div>
            : <h1>Loading...</h1>
            }
         </>
      )
   }
}

export default Home;