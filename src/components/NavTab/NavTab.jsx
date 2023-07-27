import React from "react";

import "./NavTab.css";

function NavTab() {
  return (
    <nav>
      <ul className="nav-tab">
        <li className="nav-tab__link" href="#about">
          О проекте
        </li>
        <li className="nav-tab__link" href="#techs">
          Технологии
        </li>
        <li className="nav-tab__link" href="#student">
          Студент
        </li>
      </ul>
    </nav >
  );
}

export default NavTab;
