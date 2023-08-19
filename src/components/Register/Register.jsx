import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormValidator from '../../hooks/useFormValidator';
import './Register.css';

function Register() {
    const {
        values: formValues,
        errors: formErrors,
        isValid: isFormValid,
        handleInputChange,
        resetForm
    } = useFormValidator();

    useEffect(() => {
        resetForm();
    }, [resetForm])

    function handleRegisterSubmit(event) {
        event.preventDefault();
    }

    return (
        <main className="register">
            <section className="register__section">
                <form className="register__form" name="register" noValidate onSubmit={handleRegisterSubmit}>
                    <Link to="/" className="register__logo-link">
                        <img src={logo} alt="Логотип" className="register__logo" />
                    </Link>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <label className="register__field">
                        <span className="register__input-title">Имя</span>
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            className={`register__input ${formErrors.name && `register__input_error`}`}
                            onChange={handleInputChange}
                            value={formValues.name || ''}
                            id="input-name"
                            name="name"
                            required
                            minLength="2"
                            maxLength="30"
                            pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
                        />
                        <span className="register__error">{formErrors.name || ''}</span>
                    </label>
                    <label className="register__field">
                        <span className="register__input-title">E-mail</span>
                        <input
                            type="email"
                            placeholder="Ваш e-mail"
                            className={`register__input ${formErrors.email && `register__input_error`}`}
                            onChange={handleInputChange}
                            value={formValues.email || ''}
                            id="input-email"
                            name="email"
                            required
                        />
                        <span className="register__error">{formErrors.email || ''}</span>
                    </label>
                    <label className="register__field">
                        <span className="register__input-title">Пароль</span>
                        <input
                            type="password"
                            placeholder="Придумайте свой пароль"
                            className={`register__input ${formErrors.password && `register__input_error`}`}
                            onChange={handleInputChange}
                            value={formValues.password || ''}
                            id="input-password"
                            name="password"
                            required
                            minLength="6"
                            maxLength="30"
                        />
                        <span className="register__error">{formErrors.password || ''}</span>
                    </label>
                    <button
                        type="submit"
                        className={`register__button ${!isFormValid && 'register__button_disabled'}`}
                        disabled={!isFormValid}
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
