import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useFormValidator from '../../hooks/useFormValidator';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import { MESSAGE, API_ENDPOINTS, STORAGE_KEYS } from '../../utils/constants';
import './SearchForm.css';

function SearchForm({ handleSearchSubmit, handleShortFilms, shortMovies }) {
  // Получаем текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);
  // Получаем текущий путь маршрута
  const location = useLocation();
  // Используем хук формы для управления состоянием и валидации
  const {
    values,
    handleInputChange,
    isValid,
    setIsValid } = useFormValidator();
  // Состояние для сообщения об ошибке
  const [errorMessage, setErrorMessage] = useState('');
  // Состояние для отслеживания того, была ли форма отправлена хотя бы раз
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверяем валидность формы перед отправкой
    if (isValid) {
      handleSearchSubmit(values.search);
      setIsFormSubmitted(true); // Устанавливаем флаг после успешной отправки
    } else {
      setErrorMessage(MESSAGE.enterKeyword);
    }
  };

  // Сбрасываем сообщение об ошибке при изменении валидности формы
  useEffect(() => {
    if (isFormSubmitted) {
      setErrorMessage('');
    }
  }, [isValid, isFormSubmitted]);

  // Загружаем значение поиска из локального хранилища
  useEffect(() => {
    if (location.pathname === API_ENDPOINTS.MOVIES) {
      const searchValue = localStorage.getItem(STORAGE_KEYS.movieSearch);
      // Если есть значение поиска, устанавливаем его и помечаем форму как валидную
      if (searchValue) {
        values.search = searchValue; // Устанавливаем текущее значение
        setIsValid(true);
      } else {
        // Если нет значения поиска, устанавливаем пустую строку и форму как невалидную
        values.search = '';
        setIsValid(false);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    // Применяем фильтрацию при изменении состояния чекбокса, находясь на нужной странице
    if (location.pathname === API_ENDPOINTS.MOVIES && isFormSubmitted) {
      // Передаем текущее значение поиска и состояния фильтра коротких фильмов
      handleSearchSubmit(values.search, shortMovies);
    }
  }, [shortMovies]);

  useEffect(() => {
    // Применяем фильтрацию при изменении состояния чекбокса, находясь на нужной странице
    if (location.pathname === API_ENDPOINTS.SAVED_MOVIES && isFormSubmitted) {
      handleSubmit({ preventDefault: () => { } });
    }
  }, [shortMovies]);

  return (
    <section className="search">
      <form className="search-form" noValidate onSubmit={handleSubmit}>
        <input
          type="text"
          id="search-movies"
          name="search"
          placeholder="Фильм"
          className="search-form__input"
          required
          value={values.search || ''}
          onChange={handleInputChange}
        />
        {/* Кнопка отправки формы */}
        <button
          className="search-form__submit-button"
          type="submit">
        </button>
      </form>
      {/* Отображение сообщения об ошибке */}
      {errorMessage && isFormSubmitted && <span className="search-form__error">{errorMessage}</span>}
      {/* Фильтр коротких фильмов */}
      <FilterCheckbox
        shortMovies={shortMovies}
        handleShortFilms={handleShortFilms}
      />
    </section>
  );
}

export default SearchForm;
