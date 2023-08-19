import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <section className="footer__container">
                <p className="footer__about">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </p>
                <div className="footer__info">
                    <p className="footer__year">&copy; 2023</p>
                    <ul className="footer__list">
                        <li className="footer__list-item">
                            <a
                                className="footer__list-link"
                                href="https://practicum.yandex.ru/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li className="footer__list-item">
                            <a
                                className="footer__list-link"
                                href="https://github.com/kihaku565"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </footer>
    );
}

export default Footer;
