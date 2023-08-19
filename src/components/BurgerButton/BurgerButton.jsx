import React from 'react';
import './BurgerButton.css';

function BurgerButton({ isActive, onClick }) {
    const buttonClasses = `burger__button ${isActive
        ? 'burger__button-active'
        : ''
        }`;

    return (
        <div className="burger">
            <div className={buttonClasses} onClick={onClick}>
                <span />
            </div>
        </div>
    );
}

export default BurgerButton;
