import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormValidator from '../../hooks/useFormValidator';
import './Login.css';

function Login({ handleLoginSubmit }) {
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
    handleLoginSubmit(values);
  }

  return (
    <main className="login">
      <section className="login__section">
        <form className="login__form" name="login" noValidate onSubmit={handleSubmit}>
          <Link to="/" className="login__logo-link">
            <img src={logo} alt="Логотип" className="login__logo" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <label className="login__field">
            <span className="login__input-title">E-mail</span>
            <input
              type="email"
              placeholder="Ваш e-mail"
              className={`login__input ${errors.email && `login__input_error`}`}
              onChange={handleInputChange}
              value={values.email || ''}
              id="input-email"
              name="email"
              required
            />
            <span className="login__error">{errors.email || ''}</span>
          </label>
          <label className="login__field">
            <span className="login__input-title">Пароль</span>
            <input
              type="password"
              placeholder="Ваш пароль"
              className={`login__input ${errors.password && `login__input_error`}`}
              onChange={handleInputChange}
              value={values.password || ''}
              id="input-password"
              name="password"
              required
              minLength="6"
              maxLength="30"
            />
            <span className="login__error">{errors.password || ''}</span>
          </label>
          <button
            type="submit"
            className={`login__button ${!isValid && 'login__button_disabled'}`}
            disabled={!isValid}
          >
            Войти
          </button>
          <span className="login__support">
            Ещё не зарегистрированы? &nbsp;
            <Link to="/signup" className="login__support-link">
              Регистрация
            </Link>
          </span>
        </form>
      </section>
    </main>
  );
}

export default Login;
