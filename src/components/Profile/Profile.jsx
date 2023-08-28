import React, { useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';
import useFormValidator from '../../hooks/useFormValidator'
import './Profile.css';

function Profile({ handleSignOut, handleProfileUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    isValid,
    handleInputChange,
    resetForm } = useFormValidator();
  // Проверка, можно ли редактировать профиль
  const isEditDisabled = (
    !isValid
    || (currentUser.name === values.name && currentUser.email === values.email)
  );

  // Мемоизация функции сброса формы
  const memoizedResetForm = useCallback(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  // Вызов функции сброса формы при изменении currentUser
  useEffect(() => {
    memoizedResetForm();
  }, [memoizedResetForm]);

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfileUpdate(values);
  }
  // Обработка выхода из аккаунта
  const handleExitClick = () => {
    handleSignOut();
  }

  return (
    <main className="profile">
      {/* Приветствие пользователя */}
      <h2 className="profile__title">Привет, {currentUser.name}</h2>
      <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
        {/* Поля для редактирования имени и электронной почты */}
        <label className="profile__label">
          <span className="profile__input-title">Имя</span>
          <input
            type="text"
            placeholder="Имя"
            className="profile__input"
            id="edit-name"
            name="name"
            required
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            onChange={handleInputChange}
          />
          <span className="profile__error">{errors.name || ''}</span>
        </label>
        <label className="profile__label">
          <span className="profile__input-title">E-mail</span>
          <input
            type="email"
            placeholder="E-mail"
            className="profile__input"
            id="edit-email"
            name="email"
            required
            value={values.email || ''}
            onChange={handleInputChange}
          />
          <span className="profile__error">{errors.email || ''}</span>
        </label>
      </form>
      {/* Навигация с кнопкой для редактирования и ссылкой на выход */}
      <nav className="profile__navigation">
        <button
          type="submit"
          className={`profile__edit-button ${isEditDisabled
            ? 'profile__edit-button_disable'
            : ''
            }`}
          disabled={isEditDisabled}
          onClick={handleSubmit}
        >
          Редактировать
        </button>
        <Link to="/" className="profile__logout-link" onClick={handleExitClick}>
          Выйти из аккаунта
        </Link>
      </nav>
    </main>
  );
}

export default Profile;
