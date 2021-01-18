import { useState, useEffect } from 'react';
import Logo from './logo.png';
import './Nav.css';

import { Link } from 'react-router-dom';
import Burger from '@animated-burgers/burger-squeeze';
import '@animated-burgers/burger-squeeze/dist/styles.css';

const Nav = ({listElements}) => {
   const [enableMenu, setEnableMenu] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [selectedMenuPoint, setSelectedMenuPoint] = useState('');

   const openClose = () => {
      setIsOpen(!isOpen);
      setEnableMenu(true);
   }

   const changeMenu = () => {
      setSelectedMenuPoint('');
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
         } else {
            links.firstChild.classList.remove('selected')
         }
         links = links.nextElementSibling;
      }

      setIsOpen(false);
   }, [selectedMenuPoint]);

   const menuCloseEnded = (e) => {
      e.target.classList.remove('menu-closed');
   }

   const showMenuPoints = () => {
      return listElements.map((listElement, i) => {
         return (
            <Link key={i} to={`${listElement.path}`}>
               <li>{listElement.name}</li>
            </Link>
         )
      });
   }

   return (
      <>
         <nav>
            <Link to='/'>
               <img className='logo' src={Logo} alt='Logo' onClick={changeMenu} />
            </Link>
            <ul className='nav-links' onClick={changeMenu}>
               { showMenuPoints() }
            </ul>
            <h2 className='selected-menu'>{selectedMenuPoint}</h2>
            <Burger className='burger-button' isOpen={isOpen} onClick={openClose} />
         </nav>
         <div className={`menu ${isOpen ? 'menu-opened' : enableMenu ? 'menu-closed' : ''}`} onAnimationEnd={menuCloseEnded} >
            <ul className='nav-links' onClick={changeMenu}>
               { showMenuPoints() }
            </ul>
         </div>
      </>
   )
}

export default Nav;
