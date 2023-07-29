import './Profile.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';

export default function Profile() {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        // handleProfile(values);
    }

    useEffect(() => {
        resetForm();
    }, [resetForm])

    return (
        <main>
            <section className="profile">
                <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
                    <h1 className="profile__title">Привет, Василий!</h1>
                    <div className="profile__labels-container">
                        <label className="profile__name">
                            <span className="profile__label-text">Имя</span>
                            <input
                                name="name"
                                className={`profile__input ${errors.name && 'profile__input_error'}`}
                                onChange={handleChange}
                                value={values.name || 'Василий'}
                                type="text"
                                required
                                minLength="2"
                                maxLength="30"
                            />
                            <span className="profile__error-name">{errors.name || ''}</span>
                        </label>
                        <label className="profile__email">
                            <span className="profile__label-text">E-mail</span>
                            <input
                                name="email"
                                className={`profile__input ${errors.email && 'profile__input_error'}`}
                                onChange={handleChange}
                                value={values.email || 'vas.matyushkin@yandex.ru'}
                                type="email"
                                required
                            />
                            <span className="profile__error">{errors.email || ''}</span>
                        </label>
                    </div>
                    <div className="profile__button-container">
                        <button
                            type="submit"
                            className={`profile__button-edit ${!isValid && 'profile__button-edit_disabled'
                                }`}
                            disabled={!isValid}
                        >
                            Редактировать
                        </button>
                        <Link to="/" className="profile__button-exit">
                            Выйти из аккаунта
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    )
}