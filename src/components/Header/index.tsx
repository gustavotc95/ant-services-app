import {Link} from 'react-router-dom';

import Search from '../Search';
import MenuHamburguer from '../MenuHamburguer';

import Logo from '../../assets/logo.png';

import './styles.scss';

export default function Header() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header__logo">
            <Link to="/prestadores/criar">
              <img
                className="page-header__logo-img"
                src={Logo}
                alt="Logo Ant Services"
              />
            </Link>
          </div>
          <div className="page-header__search">
            <Search />
          </div>
          <div className="page-header__menu">
            <MenuHamburguer />
          </div>
        </div>
      </header>
    </>
  );
}
