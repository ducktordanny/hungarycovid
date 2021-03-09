import React from 'react'
import ducktorLogo from '../../ducktorD.png';
import './Footer.css';

const Footer = () => (
   <footer>
      <label htmlFor='footer-made-by'>Made by <a href='https://github.com/ducktorD'>ducktorD</a>.</label>
      <label htmlFor='footer-year'>{ new Date().getFullYear() }.</label>
      <img src={ ducktorLogo } alt='ducktorD logo' />
   </footer>
)


export default Footer;