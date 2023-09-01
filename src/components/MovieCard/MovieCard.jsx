import './MovieCard.css';
import { useLocation } from 'react-router-dom';
import { formatDuration } from '../../utils/movieHelpers.js';
import { API_ENDPOINTS } from '../../utils/constants';

function MovieCard({ movie, saved, onLikeClick, onDeleteClick }) {
  const location = useLocation();
  // Текст для кнопки в зависимости от сохраненного состояния
  const buttonTitle = saved ? '' : 'Сохранить фильм';

  // Функция для сохранения фильма в избранное
  const handleLikeClick = () => {
    onLikeClick(movie);
  }
  // Функция для удаления фильма из избранного
  const handleDeleteClick = () => {
    onDeleteClick(movie);
  }
  // Функция для обработки клика на кнопке
  const handleButtonClick = () => {
    const isMoviesPath = location.pathname === API_ENDPOINTS.MOVIES;
    const isSavedMoviesPath = location.pathname === API_ENDPOINTS.SAVED_MOVIES;

    if (isMoviesPath) {
      saved
        ? handleDeleteClick()
        : handleLikeClick();
    } else if (isSavedMoviesPath) {
      handleDeleteClick();
    }
  }
  // Функция для определения класса кнопки
  const classSaveButton = () => {
    return location.pathname === API_ENDPOINTS.MOVIES
      ? saved
        ? 'movie-card__save-button_active'
        : ''
      : location.pathname === API_ENDPOINTS.SAVED_MOVIES
        ? 'movie-card__save-button_delete'
        : '';
  };

  return (
    <li className="movie-card">
      <div className="movie-card__image-container">
        {/* Ссылка на трейлер фильма */}
        <a className="movie-card__trailer-link"
          href={movie.trailerLink} target="_blank" rel="noreferrer">
          {/* Изображение фильма */}
          <img className="movie-card__image"
            src={movie.image} alt={movie.nameRU}
            title={`Описание: ${movie.description} \n\nСнято: ${movie.country} ${movie.year}г.`}
          /></a>
        {/* Кнопка для сохранения или удаления фильма */}
        <button
          type="button"
          className={`movie-card__save-button ${classSaveButton()}`}
          title={buttonTitle}
          onClick={handleButtonClick}
        >
          {`${saved ? '' : 'Сохранить'}`}
        </button>
      </div>
      <div className="movie-card__footer">
        <h2 className="movie-card__title">{movie.nameRU}</h2>
        <p className="movie-card__duration">{formatDuration(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MovieCard
