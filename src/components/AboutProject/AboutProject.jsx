import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__stage-container">
        <div className="about-project__stage">
          <h3 className="about-project__stage-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__stage-description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__stage">
          <h3 className="about-project__stage-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__stage-description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline-grid">
        <div className="about-project__timeline-item about-project__timeline-item_backend-week">
          1 неделя
        </div>
        <div className="about-project__timeline-item about-project__timeline-item_frontend-week">
          4 недели
        </div>
        <div className="about-project__timeline-item about-project__timeline-item_backend">
          Back-end
        </div>
        <div className="about-project__timeline-item about-project__timeline-item_frontend">
          Front-end
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
