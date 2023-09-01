import React, { useState, useEffect, useMemo } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import moviesApi from '../../utils/MoviesApi.js';
import { transformMovieData, filterMovies, filterShortMovies, } from '../../utils/movieHelpers';
import { MESSAGE, STORAGE_KEYS } from '../../utils/constants'
import './Movies.css';

function Movies({
  setIsLoader,
  setIsInfoPopup,
  savedMoviesList,
  onLikeClick,
  onDeleteClick }) {

  // Состояние чекбокса для короткометражных фильмов
  const [shortMovies, setShortMovies] = useState(false);
  // Фильмы, полученные с запроса
  const [initialMovies, setInitialMovies] = useState([]);
  // Отфильтрованные фильмы по чекбоксу и запросу
  const [filteredMovies, setFilteredMovies] = useState([]);
  // Состояние для отображения, если ничего не найдено
  const [notFound, setNotFound] = useState(false);
  // Все фильмы с сервера, для однократного запроса
  const [isAllMovies, setIsAllMovies] = useState([]);

  // Функция для установки отфильтрованных фильмов и обработки информационной подсказки
  const handleSetFilteredMovies = (movies, userQuery, shortMoviesCheckbox) => {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setIsInfoPopup({
        isOpen: true,
        successful: false,
        text: MESSAGE.notFound,
      });
      setNotFound(true);
    } else {
      setIsInfoPopup({
        isOpen: false, // Предполагается, что подсказку нужно скрыть, если фильмы найдены
        successful: true,
        text: '',
      });
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(shortMoviesCheckbox
      ? filterShortMovies(moviesList)
      : moviesList);
    localStorage.setItem(STORAGE_KEYS.userMovies, JSON.stringify(moviesList));
  };

  // Обработчик отправки поискового запроса
  const handleSearchSubmit = async inputValue => {
    try {
      localStorage.setItem(STORAGE_KEYS.movieSearch, inputValue);
      localStorage.setItem(STORAGE_KEYS.shortMovies, shortMovies);

      if (isAllMovies.length === 0) {
        setIsLoader(true);
        try {
          const movies = await moviesApi.getMovies();
          setIsAllMovies(movies);
          handleSetFilteredMovies(transformMovieData(movies), inputValue, shortMovies);
        } catch (error) {
          setIsInfoPopup({
            isOpen: true,
            successful: false,
            text: MESSAGE.queryError,
          });
        } finally {
          setIsLoader(false);
        }
      } else {
        handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
      }
    } catch (error) {
    }
  };

  // Обработчик переключения короткометражных фильмов
  const handleShortFilms = () => {
    setShortMovies(!shortMovies);
    const updatedFilteredMovies = shortMovies
      ? initialMovies
      : filterShortMovies(initialMovies);
    setFilteredMovies(updatedFilteredMovies);
    localStorage.setItem(STORAGE_KEYS.shortMovies, !shortMovies);
  };

  // Загрузка данных из локального хранилища при монтировании компонента
  useEffect(() => {
    (async () => {
      try {
        // Получаем значение чекбокса короткометражных фильмов из локального хранилища
        const storedShortMovies = localStorage.getItem(STORAGE_KEYS.shortMovies);
        setShortMovies(storedShortMovies === 'true');
        // Если есть сохраненные фильмы в локальном хранилище
        if (localStorage.getItem(STORAGE_KEYS.userMovies)) {
          // Получаем список фильмов из локального хранилища
          const movies = JSON.parse(localStorage.getItem(STORAGE_KEYS.userMovies));
          setInitialMovies(movies);
          // Устанавливаем фильтрованные фильмы в зависимости от состояния чекбокса короткометражных фильмов
          setFilteredMovies(storedShortMovies === 'true'
            ? filterShortMovies(movies)
            : movies);
        }
      } catch (error) {
        console.error(MESSAGE.localStorageLoadingError, error);
      }
    })();
  }, []);

  const memoizedMoviesList = useMemo(() => (
    <MoviesCardList
      moviesList={filteredMovies}
      savedMoviesList={savedMoviesList}
      onLikeClick={onLikeClick}
      onDeleteClick={onDeleteClick}
    />
  ), [filteredMovies, savedMoviesList, onLikeClick, onDeleteClick]);

  return (
    <main className="movies-page">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!notFound && memoizedMoviesList}
    </main>
  );
}

export default Movies
