import { Component } from 'react';
import './App.css';

import Nav from './Components/Nav/Nav';
import Routes from './Components/Routes/Routes';
import Footer from './Components/Footer/Footer';

// https://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial

class App extends Component {
   render() {
      return (
         <>
            <Nav listElements={[
               {path: '/', name: 'Főoldal'},
               {path: '/covid19', name: 'Covid-19'},
               {path: '/police-actions', name: 'Rendőri intézkedések'}
            ]} />
            <main>
               <Routes />
            </main>
            <Footer />
         </>
      )
   }
}

export default App;