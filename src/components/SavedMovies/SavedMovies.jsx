import React, { useState, useContext, useEffect, useMemo } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import { filterMovies, filterShortMovies, } from '../../utils/movieHelpers';
import { MESSAGE } from '../../utils/constants';
import './SavedMovies.css';

function SavedMovies({
  onDeleteClick,
  savedMoviesList,
  setIsInfoPopup }) {

  const currentUser = useContext(CurrentUserContext);

  // Состояние чекбокса для коротких фильмов
  const [shortMovies, setShortMovies] = useState(false);
  // Показывать ли фильмы, если ничего не найдено
  const [notFound, setNotFound] = useState(false);
  // Отображаемые фильмы
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);
  // Фильмы после фильтрации
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  // Обработчик отправки запроса поиска
  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
    updateMoviesList(moviesList);
  }

  // Обработчик чекбокса коротких фильмов
  function handleShortFilms() {
    const newShortMovies = !shortMovies;
    setShortMovies(newShortMovies);

    // Применяем фильтр коротких фильмов на текущем показанном списке фильмов
    const updatedShowedMovies = newShortMovies
      ? filterShortMovies(filteredMovies)
      : filteredMovies;
    setShowedMovies(updatedShowedMovies);
    // Обновляем состояние notFound на основе обновленного списка фильмов
    setNotFound(updatedShowedMovies.length === 0);
  }

  // Обновление списка фильмов и состояния notFound
  function updateMoviesList(newMoviesList) {
    const hasNoMovies = newMoviesList.length === 0;
    setNotFound(hasNoMovies);

    const infoNotice = {
      isOpen: hasNoMovies, // Показываем только если поиск не нашел фильмов
      successful: !hasNoMovies,
      text: hasNoMovies
        ? MESSAGE.notFound
        : '',
    };
    setIsInfoPopup(infoNotice);

    setFilteredMovies(newMoviesList);
    setShowedMovies(newMoviesList);
  }

  useEffect(() => {
    updateMoviesList(shortMovies
      ? filterShortMovies(savedMoviesList)
      : savedMoviesList);
  }, [savedMoviesList, currentUser]);

  useEffect(() => {
    setNotFound(savedMoviesList.length === 0);
  }, [savedMoviesList]);

  const memoizedMoviesList = useMemo(() => (
    <MoviesCardList
      moviesList={showedMovies}
      savedMoviesList={savedMoviesList}
      onDeleteClick={onDeleteClick}
    />
  ), [showedMovies, savedMoviesList, onDeleteClick]);

  return (
    <main className="saved-movies-page">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!notFound && memoizedMoviesList}
    </main>
  );
}

export default SavedMovies
