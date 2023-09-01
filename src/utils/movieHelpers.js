import { SHORT_MOVIE } from './constants.js';

// Функция для преобразования данных о фильме
function transformMovieData(movies) {
  const defaultImage = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80';

  movies.forEach(movie => {
    movie.image = movie.image
      ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
      : defaultImage;
    movie.thumbnail = movie.image
      ? `https://api.nomoreparties.co${movie.image.url}`
      : defaultImage;
    // Если страна не указана, устанавливаем значение "Russia"
    movie.country = movie.country || 'Russia';
    // Если английское название отсутствует, используем русское название
    movie.nameEN = movie.nameEN || movie.nameRU;
  });

  return movies;
}

// Функция для фильтрации коротких фильмов
function filterShortMovies(movieList) {
  return movieList.filter(movie => movie.duration < SHORT_MOVIE);
}

// Функция для фильтрации фильмов по запросу пользователя
function filterMoviesByQuery(movieList, userQuery) {
  const normalizedQuery = userQuery.toLowerCase().trim();
  return movieList.filter(movie =>
    movie.nameRU.toLowerCase().includes(normalizedQuery) ||
    movie.nameEN.toLowerCase().includes(normalizedQuery)
  );
}

// Функция для фильтрации и форматирования фильмов
function filterMovies(movieList, userQuery, includeShortMovies) {
  const filteredMovies = filterMoviesByQuery(movieList, userQuery);

  // Применение фильтрации коротких фильмов, если требуется
  return includeShortMovies
    ? filterShortMovies(filteredMovies)
    : filteredMovies;
}

// Функция для форматирования длительности фильма
function formatDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  return hours === 0
    ? `${minutes}м`
    : `${hours}ч ${minutes}м`;
}

// Функция для поиска сохраненного фильма
function findSavedMovie(savedMovies, movieToFind) {
  return savedMovies.find(item =>
    item.movieId === (movieToFind.id || movieToFind.movieId));
}

export {
  transformMovieData,
  filterMovies,
  filterShortMovies,
  formatDuration,
  findSavedMovie,
};
