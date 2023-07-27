import "./NotFound.css";


export default function NotFound({ goBack }) {
  return (
    <main className="not-found">
      <section className="not-found__text-container">
        <h1 className="not-found__error">404</h1>
        <p className="not-found__error-name">Страница не найдена</p>
      </section>
      <button type="button" className="not-found__button" onClick={goBack}>
        Назад
      </button>
    </main>
  )
}