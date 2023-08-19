import React from 'react';
import MenuNavigation from '../MenuNavigation/MenuNavigation';
import BurgerButton from '../BurgerButton/BurgerButton';
import { useState } from 'react';

function Navigation() {
    const [isMenuActive, setMenuActive] = useState(false);

    return (
        <nav className="navigation">
            <MenuNavigation isActive={isMenuActive} onClose={() => setMenuActive(false)} />
            <BurgerButton isActive={isMenuActive} onClick={() => setMenuActive(!isMenuActive)} />
        </nav>
    );
}

export default Navigation;
