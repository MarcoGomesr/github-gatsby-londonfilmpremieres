import React from 'react'
import { Link } from 'gatsby';
import Logo from '../images/london-film-premieres.png';
import Themoviedb from '../images/themoviedb.svg';
import '../sass/app.scss';

const Layout = ({ children }) => {

  
  return (
    <>    
    <div className="container">
      <div className="flex-column">
        <header>
          <Link to="/">
            <img src={Logo} className="logo" alt="london film premieres logo" />
          </Link>          
        </header>
        <main>{children}</main>
        <hr/>
        
        <footer>
          <div className="row">
            <figure className="themoviedb">
              <a href="https://www.themoviedb.org/" rel="nofollow">
                <img src={Themoviedb} className="themoviedb__logo" alt="themovie logo"/>
              </a>
            </figure>

            <nav className="footernav d-flex justify-content-end align-items-center">
              <ul className="list-inline">
                <li className="list-inline-item"><a href="/privacy-policy" className="footernav__link">Privacy Policy</a></li>
                <li className="list-inline-item"><a href="/term-and-conditions" className="footernav__link">Term & Conditions</a></li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}

export default Layout