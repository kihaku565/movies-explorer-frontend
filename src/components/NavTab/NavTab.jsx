import React from "react";

import "./NavTab.css";

function NavTab() {
  return (
    <nav>
      <ul className="nav-tab">
        <li>
          <a className="nav-tab__link" href="#about"> О проекте</a>
        </li>
        <li>
          <a className="nav-tab__link" href="#techs"> Технологии</a>
        </li>
        <li>
          <a className="nav-tab__link" href="#student"> Студент</a>
        </li>
      </ul>
    </nav >
  );
}

export default NavTab;
