export const SHORT_MOVIE = 40;

export const API_URL = {
  BASE_URL: 'https://api.mv-expl.matyushkin.nomoredomains.work',
  MOVIES_URL: 'https://api.nomoreparties.co/beatfilm-movies'
};

export const API_ENDPOINTS = {
  USER_PROFILE: '/users/me',  // Конечная точка для профиля пользователя
  SIGN_UP: '/signup',         // Конечная точка для регистрации
  SIGN_IN: '/signin',         // Конечная точка для входа
  SIGN_OUT: '/signout',       // Конечная точка для выхода
  MOVIES: '/movies',          // Конечная точка для фильмов
  SAVED_MOVIES: '/saved-movies',
};

export const PAGE_SIZE = {
  desktop: { width: 1024, cards: { total: 12, more: 3, }, },
  tablet: { width: 501, cards: { total: 8, more: 2, }, },
  mobile: { width: 500, cards: { total: 5, more: 2, }, },
};

export const MESSAGE = {
  notFound: 'Ничего не найдено',
  enterKeyword: 'Нужно ввести ключевое слово',
  incorrectEmail: 'Некорректный адрес e-mail.',
  defaultMessage: 'Введите ключевое слово для поиска',
  catchError: 'Что-то пошло не так! Попробуйте ещё раз.',
  incorrectName: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис.',
  queryError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  localStorageLoadingError: 'Ошибка при загрузке данных из локального хранилища:',
  registrationError: 'Произошла ошибка во время регистрации.',
  dataUpdateError: 'Произошла ошибка при обновлении данных.',
  saveMovieError: 'Ошибка при сохранении фильма.',
  deleteMovieError: 'Ошибка при удалении фильма.',
  loadUserDataError: 'Ошибка при загрузке данных пользователя.',
  savedMoviesLoadError: 'Ошибка при загрузке сохраненных фильмов.',
  dataUpdateSuccess: 'Ваши данные обновлены!',
};

export const DISPLAY_SETTINGS = {
  // Минимальное количество карточек для отображения кнопки "Показать еще"
  minCardsToShowMore: 5,
  // Начальное количество отображаемых карточек
  initialCardsToShow: 12,
  // Количество дополнительных карточек при нажатии кнопки "Показать еще"
  additionalCardsToShow: 3,
};

// Ключи для локального хранилища
export const STORAGE_KEYS = {
  userMovies: 'userMovies', // Ключ для сохранения списка фильмов
  movieSearch: 'movieSearch', // Ключ для сохранения поискового запроса
  shortMovies: 'shortMovies', // Ключ для сохранения состояния чекбокса
};
