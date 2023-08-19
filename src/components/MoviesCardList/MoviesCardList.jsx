import React, { useEffect, useState } from 'react';
import { PAGE_SIZE } from '../../utils/constants';
import MovieCard from '../MoviesCard/MovieCard';
import ShowMore from '../ShowMore/ShowMore';
import './MoviesCardList.css';

function MoviesCardList({ movies, isSaved }) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleMovies, setVisibleMovies] = useState([]);

  const handleShowMore = () => {
    setStartIndex(prevStartIndex => prevStartIndex + PAGE_SIZE);
  };

  useEffect(() => {
    const endIndex = startIndex + PAGE_SIZE;
    const newVisibleMovies = movies.slice(0, endIndex);
    setVisibleMovies(newVisibleMovies);
  }, [movies, startIndex]);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list" >
        {visibleMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} isSaved={isSaved} />
        ))}
      </ul>
      {movies.length > PAGE_SIZE && (
        <ShowMore
          isVisible={movies.length > visibleMovies.length}
          isDisabled={movies.length <= visibleMovies.length}
          onShowMore={handleShowMore}
          buttonText="Ещё"
        />
      )}
    </section>
  );
};

export default MoviesCardList;
