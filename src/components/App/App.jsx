import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import useEscapeKeyHandler from '../../hooks/useEscapeKeyHandler';
import mainApi from '../../utils/MainApi.js';

import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import ProtectedRoute from '../PrivateRoute/PrivateRoute.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Profile from '../Profile/Profile.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import InfoPopup from '../InfoPopup/InfoPopup.jsx';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isBurgerOpened, setIsBurgerOpened] = useState(false); // Состояние меню бургера
  const [isLoader, setIsLoader] = useState(false); // Отображение прелоадера
  const [isInfoPopup, setIsInfoPopup] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });  // Попап с информацией
  const [loggedIn, setLoggedIn] = useState(false); // Состояние авторизации
  const [currentUser, setCurrentUser] = useState({});
  const [savedMoviesList, setSavedMoviesList] = useState([]); // Список сохраненных фильмов
  const [load, setLoad] = useState(false); // Загрузка приложения

  // Обработчик события нажатия на бургерное меню
  const onClickBurger = () => {
    const newIsBurgerOpened = !isBurgerOpened;
    setIsBurgerOpened(newIsBurgerOpened);
  }

  useEscapeKeyHandler(onClickBurger, isBurgerOpened);

  // Функция для закрытия всплывающего окна с информацией
  const closeInfoTooltip = () => {
    const updatedInfoPopup = { ...isInfoPopup, isOpen: false };
    setIsInfoPopup(updatedInfoPopup);
  }

  // Обработчик отправки данных для регистрации пользователя
  const handleRegisterSubmit = useCallback(async ({ name, email, password }) => {
    try {
      setIsLoader(true);
      const registrationData = await mainApi.createUser(name, email, password);

      if (registrationData._id) {
        await handleLoginSubmit({ email, password });
      } else {
        throw new Error('Не удалось зарегистрироваться');
      }
    } catch (error) {
      setIsInfoPopup({
        isOpen: true,
        successful: false,
        text: error.message || 'Произошла ошибка во время регистрации.',
      });
    } finally {
      setIsLoader(false);
    }
  }, []);

  // Обработчик отправки данных для входа пользователя
  const handleLoginSubmit = useCallback(async ({ email, password }) => {
    try {
      setIsLoader(true);

      const jwt = await mainApi.login(email, password);

      if (jwt.token) {
        // Сохраняем JWT-токен в localStorage
        localStorage.setItem('jwt', jwt.token);
        setLoggedIn(true);
        navigate('/movies');
        setIsInfoPopup({
          isOpen: true,
          successful: true,
          text: 'Добро пожаловать!',
        });
      }
    } catch (error) {
      setIsInfoPopup({
        isOpen: true,
        successful: false,
        text: error,
      });
    } finally {
      setIsLoader(false);
    }
  }, []);

  function resetUserState() {
    setCurrentUser({});
    setLoggedIn(false);
  }

  function clearLocalStorage() {
    localStorage.clear();
  }

  // Обработчик выхода из аккаунта
  const handleSignOut = () => {
    resetUserState();
    // Очищаем localStorage, удаляя все сохраненные данные
    clearLocalStorage();
    navigate('/');
  }

  // Обработчик обновления профиля пользователя
  const handleProfileUpdate = useCallback(async ({ name, email }) => {
    try {
      setIsLoader(true);

      const newUserData = await mainApi.updateUser(name, email);

      // Обновляем состояние currentUser с новыми данными пользователя
      setCurrentUser(newUserData);
      showSuccessPopup('Ваши данные обновлены!');
    } catch (error) {
      showErrorPopup(error.message || 'Произошла ошибка при обновлении данных.');
    } finally {
      setIsLoader(false);
    }
  }, []);

  // Обработчик сохранения фильма
  const handleSaveMovie = useCallback(async (movie) => {
    try {
      const newMovie = await mainApi.addNewMovie(movie);

      // Обновляем список сохраненных фильмов с новым фильмом
      setSavedMoviesList((prevSavedMovies) => [newMovie, ...prevSavedMovies]);
    } catch (error) {
      showErrorPopup(error.message || 'Ошибка при сохранении фильма.');
    }
  }, []);

  // Обработчик удаления фильма
  const handleDeleteMovie = useCallback(async (movie) => {
    try {
      // Находим индекс сохраненного фильма в списке
      const movieIndex = savedMoviesList.findIndex(
        (item) => item.movieId === movie.id || item.movieId === movie.movieId
      );

      if (movieIndex !== -1) {
        const savedMovie = savedMoviesList[movieIndex];

        await mainApi.deleteMovie(savedMovie._id);

        // Создаем новый список без удаленного фильма
        const newMoviesList = savedMoviesList.filter((_, index) => index !== movieIndex);

        // Обновляем состояние списка сохраненных фильмов
        setSavedMoviesList(newMoviesList);
      }
    } catch (error) {
      showErrorPopup(error.message || 'Ошибка при удалении фильма.');
    }
  }, [savedMoviesList]);

  // Проверка токена и авторизация пользователя
  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem('jwt');// Получаем JWT-токен из localStorage

    // Если есть JWT-токен в localStorage
    if (jwt) {
      loadUserData(path);
    } else {
      // Пропускаем авторизацию и загружаем страницу
      setLoad(true);
    }
  }, []);

  async function loadUserData(path) {
    try {
      setIsLoader(true);

      const data = await mainApi.getUserInfo();

      if (data) {
        // Обновляем состояния для авторизации
        setLoggedIn(true);
        setCurrentUser(data);
        navigate(path); // Перенаправляем пользователя на текущий путь
      }
    } catch (error) {
      showErrorPopup(error.message || 'Ошибка при загрузке данных пользователя.');
    } finally {
      setIsLoader(false);
      setLoad(true);
    }
  }

  // Эффект для получения информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      loadUserInfo();
    }
  }, [loggedIn]);

  async function loadUserInfo() {
    try {
      setIsLoader(true);

      const userInfo = await mainApi.getUserInfo();

      // Обновляем данные текущего пользователя
      setCurrentUser(userInfo);
    } catch (error) {
      showErrorPopup(error.message || 'Ошибка при загрузке данных пользователя.');
    } finally {
      setIsLoader(false);
    }
  }

  // Эффект для получения массива сохраненных фильмов
  useEffect(() => {
    // Проверяем, авторизован ли пользователь и имеет ли текущий пользователь данные
    if (loggedIn && currentUser) {
      loadSavedMovies();
    }
  }, [currentUser, loggedIn]);

  async function loadSavedMovies() {
    try {
      const data = await mainApi.getSavedMovies();

      // Фильтруем полученные данные, оставляя только фильмы, принадлежащие текущему пользователю
      const userMoviesList = data.filter(movie => movie.owner === currentUser._id);

      // Обновляем состояние списка сохраненных фильмов
      setSavedMoviesList(userMoviesList);
    } catch (error) {
      showErrorPopup(error.message || 'Ошибка при загрузке сохраненных фильмов.');
    }
  }

  function showSuccessPopup(text) {
    setIsInfoPopup({
      isOpen: true,
      successful: true,
      text: text,
    });
  }

  function showErrorPopup(text) {
    setIsInfoPopup({
      isOpen: true,
      successful: false,
      text: text,
    });
  }

  return (
    <div className="app">
      {!load
        ? (<Preloader isOpen={isLoader} />)
        : (
          <CurrentUserContext.Provider value={currentUser}>
            <Routes>
              <Route path='/' element={
                <>
                  <Header
                    loggedIn={loggedIn}
                    onClickBurger={onClickBurger}
                    isBurgerOpened={isBurgerOpened} />
                  <Main />
                  <Footer />
                </>
              }>
              </Route>
              {!loggedIn
                ? (<>
                  <Route path='/signup' element={
                    <Register
                      handleRegisterSubmit={handleRegisterSubmit}
                    />}
                  />
                  <Route path='/signin' element={
                    <Login
                      handleLoginSubmit={handleLoginSubmit}
                    />}
                  />
                </>)
                : null}
              <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
                <Route path='/movies' element={
                  <>
                    <Header
                      loggedIn={loggedIn}
                      onClickBurger={onClickBurger}
                      isBurgerOpened={isBurgerOpened} />
                    <Movies
                      setIsLoader={setIsLoader}
                      setIsInfoPopup={setIsInfoPopup}
                      savedMoviesList={savedMoviesList}
                      onLikeClick={handleSaveMovie}
                      onDeleteClick={handleDeleteMovie}
                      isInfoPopup={isInfoPopup}
                      onClose={closeInfoTooltip}
                    />
                    <Footer />
                  </>
                } />
                <Route path='/saved-movies' element={
                  <>
                    <Header
                      loggedIn={loggedIn}
                      onClickBurger={onClickBurger}
                      isBurgerOpened={isBurgerOpened} />
                    <SavedMovies
                      savedMoviesList={savedMoviesList}
                      onDeleteClick={handleDeleteMovie}
                      setIsInfoPopup={setIsInfoPopup}
                      isInfoPopup={isInfoPopup}
                      onClose={closeInfoTooltip}
                    />
                    <Footer />
                  </>
                } />
                <Route path='/profile' element={
                  <>
                    <Header
                      loggedIn={loggedIn}
                      onClickBurger={onClickBurger}
                      isBurgerOpened={isBurgerOpened} />
                    <Profile
                      handleProfileUpdate={handleProfileUpdate}
                      handleSignOut={handleSignOut}
                    />
                    <Footer />
                  </>
                } />
              </Route >
              <Route path='*' element={
                <NotFound />
              }>
              </Route>
            </Routes>
            <InfoPopup
              isInfoPopup={isInfoPopup}
              onClose={closeInfoTooltip}
            />
            <Preloader isOpen={isLoader} />
          </CurrentUserContext.Provider >
        )
      }
    </div >
  );
}

export default App;
