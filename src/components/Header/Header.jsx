import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation.jsx';
import logo from '../../images/logo.svg';

function Header({ loggedIn, onClickBurger, isBurgerOpened }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="Логотип" />
        </Link>
        <Navigation loggedIn={loggedIn} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
      </div>
    </header>
  );
}

export default Header;
