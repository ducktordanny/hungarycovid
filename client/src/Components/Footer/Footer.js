import React from 'react'
import ducktorLogo from '../../ducktorD.png';
import './Footer.css';

const Footer = () => (
   <footer>
      <label htmlFor="footer">Made by <a href='https://github.com/ducktorD'>ducktorD</a></label>
      <img src={ ducktorLogo } alt='ducktorD logo' />
   </footer>
)


export default Footer;