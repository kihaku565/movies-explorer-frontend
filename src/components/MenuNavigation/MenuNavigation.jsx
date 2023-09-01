import React from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import './MenuNavigation.css';

function MenuNavigation({ isActive, setActive }) {
    const location = useLocation();

    const closeMenu = () => {
        if (isActive) {
            setActive(false);
        }
    };

    const isLinkActive = (linkPath) => {
        return location.pathname === linkPath;
    };

    return (
        <div
            className={`menu ${isActive ? 'menu-active' : ''}`}
            onClick={closeMenu}
        >
            {isActive && <span className="menu__blur" />}
            <div className="menu__content" onClick={(e) => e.stopPropagation()}>
                <Link to="/" className="menu__main">
                    Главная
                </Link>
                <div className="menu__links">
                    <NavLink
                        to="/movies"
                        className={`menu__item ${isLinkActive('/movies') ? 'menu__item_active' : ''}`}
                        onClick={closeMenu}
                    >
                        Фильмы
                    </NavLink>
                    <NavLink
                        to="/saved-movies"
                        className={`menu__item ${isLinkActive('/saved-movies') ? 'menu__item_active' : ''}`}
                        onClick={closeMenu}
                    >
                        Сохранённые фильмы
                    </NavLink>
                </div>
                <NavLink
                    to="/profile"
                    className={`menu__profile menu__item ${isLinkActive('/profile') ? 'menu__item_active' : ''}`}
                    onClick={closeMenu}
                >
                    Аккаунт
                </NavLink>
            </div>
        </div>
    );
}

export default MenuNavigation;
