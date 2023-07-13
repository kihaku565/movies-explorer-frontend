import './Promo.css';
import logo from '../../images/logo.svg';

export default function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <div className="promo__about-project">
                    <h1 className="promo__title">
                        Учебный проект студента факультета Веб&#8209;разработки.
                    </h1>
                    <a href="https://github.com/kihaku565/movies-explorer-frontend" target="_blank" rel="noopener noreferrer" className="promo__learn-more-link" >
                        О проекте
                    </a>
                    <a href="#" className="promo__learn-more-link">
                        Технологии
                    </a>
                    <a href="#" className="promo__learn-more-link">
                        Студент
                    </a>
                </div>
                <img src={logo} alt="логотип" className="promo__logo" />
            </div>
        </section>
    );
}