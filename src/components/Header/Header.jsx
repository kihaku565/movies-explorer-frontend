import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
  const renderNav = () => {
    return isLoggedIn ? <Navigation /> : <AuthNavigation />;
  };

  return (
    <header className={`header ${!isLoggedIn ? 'header-auth' : ''}`}>
      <section className="header__container">
        <Link className="header__logo-link" to="/" />
        {renderNav()}
      </section>
    </header>
  );
}

export default React.memo(Header);
