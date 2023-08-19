import React from 'react';
import './NavTab.css';

function NavTab() {
    return (
        <nav>
            <ul className="nav-list">
                <li>
                    <a className="nav-list__link" href="#about">О проекте</a>
                </li>
                <li>
                    <a className="nav-list__link" href="#techs">Технологии</a>
                </li>
                <li>
                    <a className="nav-list__link" href="#student">Студент</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;
