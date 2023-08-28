import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useResponsiveScreenWidth from '../../hooks/useResponsiveScreenWidth.js';
import { findSavedMovie } from '../../utils/movieHelpers.js';
import { PAGE_SIZE } from '../../utils/constants.js';
import { API_ENDPOINTS } from '../../utils/constants';
import MovieCard from '../MovieCard/MovieCard.jsx';
import ShowMore from '../ShowMore/ShowMore';
import { DISPLAY_SETTINGS } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({ moviesList, savedMoviesList, onLikeClick, onDeleteClick }) {
  const location = useLocation();
  // Получение ширины экрана для адаптивного отображения
  const screenWidth = useResponsiveScreenWidth();
  // Значения размеров карточек для разных устройств
  const { desktop, tablet, mobile } = PAGE_SIZE;
  // Состояние для отображения списка фильмов
  const [showMovieList, setShowMovieList] = useState([]);
  const { minCardsToShowMore, initialCardsToShow, additionalCardsToShow } = DISPLAY_SETTINGS;
  // Состояние для настроек отображения карточек
  const [cardsShowDetails, setCardsShowDetails] = useState({
    total: initialCardsToShow,
    more:additionalCardsToShow
  });

  // Изменение количества отображаемых карточек в зависимости от ширины экрана
  useEffect(() => {
    const showDetails =
      location.pathname === API_ENDPOINTS.MOVIES
        ? screenWidth > desktop.width
          ? desktop.cards
          : screenWidth <= desktop.width && screenWidth > mobile.width
            ? tablet.cards
            : mobile.cards
        : { total: initialCardsToShow, more:additionalCardsToShow };

    setCardsShowDetails(showDetails);
  }, [screenWidth, desktop, tablet, mobile, location.pathname]);

 // Изменение массива отображаемых фильмов в зависимости от ширины экрана и пути
 useEffect(() => {
  if (moviesList.length) {
    const visibleMovies = location.pathname === API_ENDPOINTS.SAVED_MOVIES
      ? moviesList
      : moviesList.slice(0, cardsShowDetails.total);
    setShowMovieList(visibleMovies);
  }
}, [moviesList, cardsShowDetails.total]);

  // Добавление дополнительных карточек при нажатии на кнопку "Eще"
  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const additional = moviesList.length - start;

    if (additional > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovieList(prevShowMovieList => [...prevShowMovieList, ...newCards]);
    }
  }

  // Определение, следует ли отображать кнопку "Eще"
  const shouldShowMoreButton =
    location.pathname === API_ENDPOINTS.MOVIES &&
    showMovieList.length >= minCardsToShowMore &&
    showMovieList.length < moviesList.length;

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {showMovieList.map(movie => (
          <MovieCard
            movie={movie}
            key={movie.id || movie._id}
            saved={findSavedMovie(savedMoviesList, movie)}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </ul>
      {shouldShowMoreButton &&
        <ShowMore
          handleClickMoreMovies={handleClickMoreMovies}
        />
      }
    </section>
  );
}

export default MoviesCardList
