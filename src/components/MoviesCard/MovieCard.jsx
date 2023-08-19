import React, { useState } from 'react';
import './MovieCard.css';

function MovieCard({ movie, isSaved }) {
  const [isSavedState, setIsSavedState] = useState(false);

  const toggleSave = () => {
    if (!isSaved) {
      setIsSavedState(!isSavedState);
    }
  };

  return (
    <li className="movie-card">
      <div className="movie-card__image-container">
        <img
          className="movie-card__image"
          alt={movie.title}
          src={`${movie.image}`}
        />
        <button
          type="button"
          className={`${isSavedState
            ? 'movie-card__save-button_active'
            : 'movie-card__save-button'
            }`}
          onClick={toggleSave}
        >
          {`${isSavedState
            ? ''
            : 'Сохранить'
            }`}
        </button>
      </div>
      <div className="movie-card__footer">
        <h2 className="movie-card__title">{movie.title}</h2>
        <p className="movie-card__duration">{movie.duration}</p>
      </div>
    </li>
  );
}

export default MovieCard;