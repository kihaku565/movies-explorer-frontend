import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormValidator from '../../hooks/useFormValidator';
import './Login.css';

function Login() {
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

    function handleLoginSubmit(event) {
        event.preventDefault();
    }

    return (
        <main className="login">
            <section className="login__section">
                <form className="login__form" name="login" noValidate onSubmit={handleLoginSubmit}>
                    <Link to="/" className="login__logo-link">
                        <img src={logo} alt="Логотип" className="login__logo" />
                    </Link>
                    <h1 className="login__title">Рады видеть!</h1>
                    <label className="login__field">
                        <span className="login__input-title">E-mail</span>
                        <input
                            type="email"
                            placeholder="Ваш e-mail"
                            className={`login__input ${formErrors.email && `login__input_error`}`}
                            onChange={handleInputChange}
                            value={formValues.email || ''}
                            id="input-email"
                            name="email"
                            required
                        />
                        <span className="login__error">{formErrors.email || ''}</span>
                    </label>
                    <label className="login__field">
                        <span className="login__input-title">Пароль</span>
                        <input
                            type="password"
                            placeholder="Ваш пароль"
                            className={`login__input ${formErrors.password && `login__input_error`}`}
                            onChange={handleInputChange}
                            value={formValues.password || ''}
                            id="input-password"
                            name="password"
                            required
                            minLength="6"
                            maxLength="30"
                        />
                        <span className="login__error">{formErrors.password || ''}</span>
                    </label>
                    <button
                        type="submit"
                        className={`login__button ${!isFormValid && 'login__button_disabled'}`}
                        disabled={!isFormValid}
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
