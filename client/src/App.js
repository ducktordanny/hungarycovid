import React, { Component } from 'react';
import './App.css';

import Nav from './Components/Nav/Nav';
import Routes from './Components/Routes/Routes';
import Footer from './Components/Footer/Footer';

class App extends Component {
   render() {
      return (
         <>
            <Nav />
            <main>
               <Routes />
            </main>
            <Footer />
         </>
      )
   }
}

export default App;