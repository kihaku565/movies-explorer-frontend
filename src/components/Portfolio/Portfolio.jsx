import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/kihaku565/first-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            Статичный сайт <span className="portfolio__arrow">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/kihaku565/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт <span className="portfolio__arrow">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/kihaku565/react-mesto-api-full-gha"
            target="_blank"
            rel="noopener noreferrer"
          >
            Одностраничное приложение <span className="portfolio__arrow">&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
