import './AboutMe.css';
import photo from '../../images/photo.jpg';

function AboutMe() {
    return (
        <section className="about-me" id="student">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__name">Василий</h3>
                    <p className="about-me__occupation">Начинающий фронтенд-разработчик, архитектор, 27 лет</p>
                    <p className="about-me__description">
                        Я родился и живу в Красноясрке, с отличием закончил
                        архитектурный факультет ИАиД СФУ. Мне нравиться заниматьсяворкаутом,
                        а еще смотреть хорошую архитектуру. С 2019 года работаю в архитектурных компаниях,
                        проектирую пространства для комфортной жизни, работы и досуга людей.
                        Недавно начал кодить. Прошёл курс по веб-разработке и хочу
                        связать дальнейшую карьеру с кодом(нет, не хочу).
                    </p>
                    <a
                        className="about-me__link"
                        href="https://github.com/kihaku565"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github
                    </a>
                </div>
                <img
                    className="about-me__photo"
                    src={photo}
                    alt="фото профиля"
                />
            </div>
        </section>
    );
};

export default AboutMe;
