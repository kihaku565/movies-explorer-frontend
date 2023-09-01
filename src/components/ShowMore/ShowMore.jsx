import React from 'react';
import './ShowMore.css';

function ShowMore({ handleClickMoreMovies }) {

  return (
    <button
      type="button"
      className="show-more-button"
      onClick={handleClickMoreMovies}
    >
      Ещё
    </button>
  );
};

export default ShowMore;
