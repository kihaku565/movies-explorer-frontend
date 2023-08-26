import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormValidator from '../../hooks/useFormValidator';
import './Register.css';

function Register({ handleRegisterSubmit }) {
  const {
    values,
    errors,
    isValid,
    handleInputChange,
    resetForm } = useFormValidator();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    handleRegisterSubmit(values);
  }

  return (
    <main className="register">
      <section className="register__section">
        <form className="register__form" name="register" noValidate onSubmit={handleSubmit}>
          <Link to="/" className="register__logo-link">
            <img src={logo} alt="Логотип" className="register__logo" />
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <label className="register__field">
            <span className="register__input-title">Имя</span>
            <input
              type="text"
              placeholder="Ваше имя"
              className={`register__input ${errors.name && `register__input_error`}`}
              onChange={handleInputChange}
              value={values.name || ''}
              id="input-name"
              name="name"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-z\u0410-\u044F\u0401\u0451\s-]+$"
            />
            <span className="register__error">{errors.name || ''}</span>
          </label>
          <label className="register__field">
            <span className="register__input-title">E-mail</span>
            <input
              type="email"
              placeholder="Ваш e-mail"
              className={`register__input ${errors.email && `register__input_error`}`}
              onChange={handleInputChange}
              value={values.email || ''}
              id="input-email"
              name="email"
              required
            />
            <span className="register__error">{errors.email || ''}</span>
          </label>
          <label className="register__field">
            <span className="register__input-title">Пароль</span>
            <input
              type="password"
              placeholder="Придумайте свой пароль"
              className={`register__input ${errors.password && `register__input_error`}`}
              onChange={handleInputChange}
              value={values.password || ''}
              id="input-password"
              name="password"
              required
              minLength="6"
              maxLength="30"
            />
            <span className="register__error">{errors.password || ''}</span>
          </label>
          <button
            type="submit"
            className={`register__button ${!isValid && 'register__button_disabled'}`}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
          <span className="register__support">
            Уже зарегистрированы? &nbsp;
            <Link to="/signin" className="register__support-link">
              Войти
            </Link>
          </span>
        </form>
      </section>
    </main>
  );
}

export default Register;
