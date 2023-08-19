import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormValidator from '../../hooks/useFormValidator'
import './Profile.css';

function Profile() {
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

    function handleProfileSubmit(event) {
        event.preventDefault();
    }

    return (
        <main className="profile">
            <h2 className="profile__title">Привет, Василий!</h2>
            <form className="profile__form" name="profile" noValidate onSubmit={handleProfileSubmit}>
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
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                    <span className="profile__error">{formErrors.name || ''}</span>
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
                        value={formValues.email}
                        onChange={handleInputChange}
                    />
                    <span className="profile__error">{formErrors.email || ''}</span>
                </label>
            </form>
            <nav className="profile__navigation">
                <button
                    type="submit"
                    className={`profile__edit-button ${!isFormValid && 'profile__edit-button_disable'}`}
                    disabled={!isFormValid}
                >
                    Редактировать
                </button>
                <Link to="/" className="profile__logout-link">
                    Выйти из аккаунта
                </Link>
            </nav>
        </main>
    );
}

export default Profile;
