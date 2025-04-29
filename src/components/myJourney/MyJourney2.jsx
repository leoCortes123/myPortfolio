import React, { useState } from 'react';
import styles from './styles/MyJourney2.module.scss';

const experiences = [
  {
    id: 1,
    title: 'DESARROLLADOR FREELANCE',
    company: '',
    period: '2021/07 - 2023/01',
    durationLevel: 3,
    description: 'Mantenimiento de una sección de una plataforma web, haciendo cambios semanales de contenido y modificaciones necesarias para presentar el contenido adecuadamente, usando React, Node.js y TypeScript.'
  },
  {
    id: 2,
    title: 'Analista de desarrollo',
    company: 'IQ OUTSOURCING, BOGOTÁ',
    period: '2018/09 - 2020/01',
    durationLevel: 2,
    description: 'Desarrollé y mantuve funcionalidades de software para la administración de procedimientos y distribución de medicamentos en IPS, usando C#, ASP.NET, AngularJS y Bootstrap. Mantenimiento de base de datos con procedimientos almacenados.'
  },
  {
    id: 3,
    title: 'Analista desarrollador',
    company: 'SCORE PROJECTS SAS, BOGOTÁ',
    period: '2017/01 - 2018/01',
    durationLevel: 2,
    description: 'Mantenimiento y actualización de una aplicación para administración de teatros y eventos. Desarrollo de API web en C#, .NET Framework, AngularJS y SQL Server.'
  },
  {
    id: 4,
    title: 'Analista desarrollador',
    company: 'NOVA CORP SAS',
    period: '2016/01 - 2016/12',
    durationLevel: 1,
    description: 'Mantenimiento y desarrollo de nuevas apps para ERP en Progress. Participación en la migración web usando C#, Razor, Bootstrap y MVC. Capacitación a aprendices del SENA.'
  },
  {
    id: 5,
    title: 'Analista soporte',
    company: 'NOVA CORP SAS',
    period: '2011/01 - 2015/12',
    durationLevel: 3,
    description: 'Soporte técnico y funcional de ERP. Colaboración con desarrollo para mejorar sistema. Capacitación a usuarios con manuales y guías.'
  },
  {
    id: 6,
    title: 'ESTUDIOS',
    company: '',
    period: '2008 - 2013',
    durationLevel: 4,
    description: 'Ingeniería de Sistemas - Unipanamericana. Tecnólogo en Análisis y Desarrollo de Sistemas - SENA.'
  }
];



function ExperienceCard({ title, company, className, onClick, isActive }) {
  return (
    <article
      className={`${className} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <h3>{title}</h3>
      {company && <p><strong>{company}</strong></p>}
    </article>
  );
}

function ExperienceDetail({ experience, onClose, isVisible }) {
  if (!experience || !isVisible) return null;

  return (
    <div className={styles.detailOverlay}>
      <button className={styles.closeButton} onClick={onClose}>CLOSE</button>
      <h2>{experience.title}</h2>
      {experience.company && <p><strong>{experience.company}</strong></p>}
      <p>{experience.period}</p>
      <p>{experience.description}</p>
    </div>
  );
}

export default function MyJourney() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleCardClick = (index) => {
    setActiveIndex(index);
    setSelectedExperience(experiences[index]);
  };

  const closeDetail = () => {
    setActiveIndex(null);
    setSelectedExperience(null);
  };

  return (
    <div className={styles.gridContainer}>
      {experiences.map((exp, index) => (
        <ExperienceCard
          key={exp.id}
          title={exp.title}
          company={exp.company}
          className={styles[`item${index}`]}
          isActive={activeIndex === index}
          onClick={() => handleCardClick(index)}
        />
      ))}
      <ExperienceDetail
        experience={selectedExperience}
        onClose={closeDetail}
        isVisible={activeIndex !== null}
      />
    </div>
  );
}
