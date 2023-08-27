import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useFormValidator from '../../hooks/useFormValidator';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import { MESSAGE } from '../../utils/constants';
import { API_ENDPOINTS } from '../../utils/constants';
import './SearchForm.css';

function SearchForm({ handleSearchSubmit, handleShortFilms, shortMovies }) {
  // Получаем текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);
  // Используем хук формы для управления состоянием и валидации
  const {
    values,
    handleInputChange,
    isValid,
    setIsValid,
    resetForm } = useFormValidator();
  // Получаем текущий путь маршрута
  const location = useLocation();
  // Состояние для сообщения об ошибке
  const [errorMessage, setErrorMessage] = useState('');

  // Обработка и очистка формы поиска
  const handleInputField = () => {
    resetForm();
    handleSearchSubmit(values.search);
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверяем валидность формы перед отправкой
    isValid
      ? handleInputField()
      : setErrorMessage(MESSAGE.enterKeyword);
  };

  // Сбрасываем сообщение об ошибке при изменении валидности формы
  useEffect(() => {
    setErrorMessage('');
  }, [isValid]);

  // Загружаем значение поиска из локального хранилища
  useEffect(() => {
    if (location.pathname === API_ENDPOINTS.MOVIES) {
      const searchValue = localStorage.getItem(`${currentUser.email} - movieSearch`);
      // Если есть значение поиска, устанавливаем его и помечаем форму как валидную
      if (searchValue) {
        values.search = searchValue;
        setIsValid(true);
      }
    }
  }, [currentUser]);

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
      {errorMessage && <span className="search-form__error">{errorMessage}</span>}
      {/* Фильтр коротких фильмов */}
      <FilterCheckbox
        shortMovies={shortMovies}
        handleShortFilms={handleShortFilms}
      />
    </section>
  );
}

export default SearchForm;
