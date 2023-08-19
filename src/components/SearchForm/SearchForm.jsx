import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <>
      <label className="search-form">
        <input
          type="text"
          placeholder="Фильм"
          className="search-form__input"
          id="search-movies"
          name="search"
          required
        />
        <button className="search-form__submit-button" type="submit">
        </button>
      </label>
      <FilterCheckbox />
    </>
  );
};

export default SearchForm;