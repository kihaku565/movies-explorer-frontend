import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { cards } from '../../utils/content';
import './Movies.css';

function MoviesPage() {
  return (
    <main className="movies-page">
      <form className="movies-page__form">
        <SearchForm />
      </form>
      <MoviesCardList movies={cards} isSaved={false} />
    </main>
  );
}

export default MoviesPage;
