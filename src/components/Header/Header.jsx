import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const renderNav = () => {
    return loggedIn ? <Navigation /> : <AuthNavigation />;
  };

  return (
    <header className={`header ${!loggedIn ? 'header-auth' : ''}`}>
      <section className="header__container">
        <Link className="header__logo-link" to="/" />
        {renderNav()}
      </section>
    </header>
  );
}

export default React.memo(Header);
