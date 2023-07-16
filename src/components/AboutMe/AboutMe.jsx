import './AboutMe.css';
import avatar from '../../images/profile.jpg';

export default function AboutMe() {
    return (
        <section className="about-me" id="student">
            <div className="about-me__container">
                <h2 className="about-me__title">Студент</h2>
                <div className="about-me__bio-container">
                    <div className="about-me__bio">
                        <h3 className="about-me__name">Василий</h3>
                        <p className="about-me__age">Начинающий фронтенд-разработчик, архитектор, 27 лет</p>
                        <p className="about-me__text">
                            Я родился и живу в Красноясрке, с отличием закончил
                            архитектурный факультет ИАиД СФУ. Мне нравиться заниматьсяворкаутом,
                            а еще смотреть хорошую архитектуру. С 2019 года работаю в архитектурных компаниях,
                            проектирую пространства для комфортной жизни, работы и досуга людей.
                            Недавно начал кодить. Прошёл курс по веб-разработке и хочу
                            связать дальнейшую карьеру с кодом.
                        </p>
                        <ul className="about-me__socials">
                            <li>
                                <a
                                    href="https://github.com/kihaku565"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="about-me__social-link"
                                >
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>
                    <img
                        className="about-me__avatar"
                        src={avatar}
                        alt="фотография разработчика приложения"
                    />
                </div>
            </div>
        </section>
    );
}