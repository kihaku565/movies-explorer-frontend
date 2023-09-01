import { Link } from 'react-router-dom';
import './AuthNavigation.css';

function AuthNavigation() {
    return (
        <div className="auth-navigation">
            <Link to="/signup" className="auth-navigation__link auth-navigation__link-signup">
                Регистрация
            </Link>
            <Link to="/signin" className="auth-navigation__link auth-navigation__link-signin">
                Войти
            </Link>
        </div>
    );
}

export default AuthNavigation;
