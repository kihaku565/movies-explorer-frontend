import './Portfolio.css';

export default function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__projects-list">
                    <li className="portfolio__projects-item">
                        <a
                            href="https://github.com/kihaku565/first-project"
                            target="_blank"
                            rel="noreferrer"
                            className="portfolio__link"
                        >
                            Статичный сайт
                        </a>
                    </li>
                    <li className="portfolio__projects-item">
                        <a
                            href="https://github.com/kihaku565/russian-travel"
                            target="_blank"
                            rel="noreferrer"
                            className="portfolio__link"
                        >
                            Адаптивный сайт
                        </a>
                    </li>
                    <li className="portfolio__projects-item">
                        <a
                            href="https://github.com/kihaku565/react-mesto-api-full-gha"
                            target="_blank"
                            rel="noreferrer"
                            className="portfolio__link"
                        >
                            Одностраничное приложение
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}