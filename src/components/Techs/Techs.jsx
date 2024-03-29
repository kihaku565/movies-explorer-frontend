import React from 'react';
import './Techs.css';

const technologies = [
  'HTML',
  'CSS',
  'JS',
  'React',
  'Git',
  'Express.js',
  'mongoDB',
];

function Techs() {
  return (
    <section className="techs" id="techs" aria-label="Technologies">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__about">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          {technologies.map((tech) => (
            <li key={tech} className="techs__item">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Techs;
