import React, { useState, useEffect } from 'react';
import Logo from './logo.png';
import './Nav.css';

import { Link } from 'react-router-dom';
import Burger from '@animated-burgers/burger-squeeze';
import '@animated-burgers/burger-squeeze/dist/styles.css';

const Nav = () => {
   const [enableMenu, setEnableMenu] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [selectedMenuPoint, setSelectedMenuPoint] = useState('');
   const openClose = () => {
      setIsOpen(!isOpen);
      setEnableMenu(true);
   }
   const setSelected = (e) => {
      if (e.target.className !== 'nav-links') {
         let links = document.querySelector('.nav-links > a');
         while (links) {
            links.firstChild.classList.remove('selected');
            links = links.nextElementSibling;
         }
         e.target.classList.add('selected');
         setSelectedMenuPoint(e.target.innerHTML);
      }
   }
   const closeSideBarBySelect = (e) => {
      if (e.target.className !== 'nav-links') {
         setIsOpen(!isOpen);
         setSelectedMenuPoint(e.target.innerHTML);
      }
   }

   useEffect(() => {
      const path = window.location.pathname;
      
      let title = '';
      switch(path) {
         case '/': title ='Főoldal'; break;
         case '/covid19': title = 'Covid-19'; break;
         case '/police-actions': title = 'Rendőri intézkedések'; break;
         default: title = 'Főoldal'; break;
      }
      setSelectedMenuPoint(title);
      let links = document.querySelector('.nav-links > a');
      while (links) {
         if (links.firstChild.innerHTML === title) {
            links.firstChild.classList.add('selected')
         }
         links = links.nextElementSibling;
      }
   }, [selectedMenuPoint]);
   return (
      <>
         <nav>
            <Link to='/'>
               <img className='logo' src={Logo} alt='Logo' />
            </Link>
            <ul className='nav-links' onClick={setSelected}>
               <Link to='/'>
                  <li>Főoldal</li>
               </Link>
               <Link to='/covid19'>
                  <li>Covid-19</li>
               </Link>
               <Link to='police-actions'>
                  <li>Rendőri intézkedések</li>
               </Link>
            </ul>
            <h2 className='selected-menu'>{selectedMenuPoint}</h2>
            <Burger className='burger-button' isOpen={isOpen} onClick={openClose} />
         </nav>
         <div className={`menu ${isOpen ? 'menu-opened' : enableMenu ? 'menu-closed' : ''}`}>
            <ul className='nav-links' onClick={closeSideBarBySelect}>
               <Link to='/'>
                  <li>Főoldal</li>
               </Link>
               <Link to='/covid19'>
                  <li>Covid-19</li>
               </Link>
               <Link to='police-actions'>
                  <li>Rendőri intézkedések</li>
               </Link>
            </ul>
         </div>
      </>
   )
}

export default Nav;
