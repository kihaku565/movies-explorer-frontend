import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { savedCards } from '../../utils/content';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <main className="saved-movies-page">
      <form className="saved-movies-page__form">
        <SearchForm />
      </form>
      <MoviesCardList movies={savedCards} isSaved={false} />
    </main>
  );
}

export default SavedMovies;