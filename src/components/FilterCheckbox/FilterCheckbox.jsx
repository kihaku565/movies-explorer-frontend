import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ handleShortFilms, shortMovies }) {

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          className="filter-checkbox__input"
          type="checkbox"
          checked={shortMovies}
          onChange={handleShortFilms}
        />
        <span className="filter-checkbox__slider"></span>
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox
