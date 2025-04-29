import React, { useState } from 'react';
import styles from './styles/MyJourney.module.scss';

const experiences = [
  {
    id: 1,
    title: 'DESARROLLADOR FREELANCE',
    company: '',
    period: '2021/07 - 2023/01',
    description: 'Mantenimiento y evolución de una sección de una plataforma web, con tareas semanales de mejora visual y funcional.',
    details: [
      { icon: '💻', text: 'Desarrollé nuevas funciones y actualizaciones de contenido usando React, Node.js y TypeScript.' },
      { icon: '🎨', text: 'Colaboré en el rediseño visual adaptado a diferentes dispositivos.' },
      { icon: '⚡', text: 'Implementé mejoras en el rendimiento del frontend.' },
      { icon: '🧪', text: 'Realicé pruebas manuales de regresión y validaciones de despliegue.' },
      { icon: '📬', text: 'Atendí solicitudes de cambio de clientes con entregas semanales.' }
    ]
  },
  {
    id: 2,
    title: 'Analista de desarrollo',
    company: 'IQ OUTSOURCING, BOGOTÁ',
    period: '2018/09 - 2020/01',
    description: 'Desarrollo y mantenimiento de funcionalidades para la gestión de medicamentos en IPS.',
    details: [
      { icon: '📝', text: 'Desarrollé formularios web y funcionalidades para flujos de trabajo en ASP.NET con C#.' },
      { icon: '📱', text: 'Implementé pantallas SPA con AngularJS y estilos con Bootstrap.' },
      { icon: '💾', text: 'Mantención de procedimientos almacenados en SQL Server.' },
      { icon: '🛡️', text: 'Colaboré con QA para realizar pruebas funcionales.' },
      { icon: '📚', text: 'Documentación de módulos nuevos y modificados.' }
    ]
  },
  {
    id: 3,
    title: 'Analista desarrollador',
    company: 'SCORE PROJECTS SAS, BOGOTÁ',
    period: '2017/01 - 2018/01',
    description: 'Desarrollo de nuevas funcionalidades y mantenimiento de aplicación para teatros.',
    details: [
      { icon: '🎟️', text: 'Mantenimiento de aplicación web de reservas usando .NET Framework, AngularJS y SQL Server.' },
      { icon: '🔗', text: 'Creación de endpoints RESTful para reservas, pagos y estadísticas.' },
      { icon: '🚀', text: 'Optimización de consultas SQL para mejorar tiempos de carga.' },
      { icon: '🖌️', text: 'Rediseño de interfaz de usuario para mejorar usabilidad.' },
      { icon: '🔒', text: 'Implementación de roles y control de acceso.' }
    ]
  },
  {
    id: 4,
    title: 'Analista desarrollador',
    company: 'NOVA CORP SAS',
    period: '2016/01 - 2016/12',
    description: 'Desarrollo de nuevas funcionalidades y migración web de ERP.',
    details: [
      { icon: '⚙️', text: 'Participé en el desarrollo de módulos ERP en Progress 4GL.' },
      { icon: '🌐', text: 'Migración de funcionalidades a plataforma web con C#, Razor, MVC y Bootstrap.' },
      { icon: '📄', text: 'Diseño de nuevos formularios para gestión administrativa.' },
      { icon: '🎓', text: 'Capacitación técnica a aprendices del SENA en herramientas de desarrollo.' },
      { icon: '🚚', text: 'Asistencia en instalación y despliegue en entornos productivos.' }
    ]
  },
  {
    id: 5,
    title: 'Analista soporte',
    company: 'NOVA CORP SAS',
    period: '2011/01 - 2015/12',
    description: 'Soporte técnico y funcional a usuarios de sistema ERP.',
    details: [
      { icon: '🛠️', text: 'Atención a requerimientos funcionales y técnicos de usuarios del ERP.' },
      { icon: '📖', text: 'Elaboración de manuales de usuario y sesiones de capacitación.' },
      { icon: '🤝', text: 'Colaboración con el equipo de desarrollo para implementación de mejoras.' },
      { icon: '🚑', text: 'Resolución de incidencias y reporte a soporte de segundo nivel.' },
      { icon: '🧪', text: 'Pruebas de nuevas versiones del sistema en ambiente controlado.' }
    ]
  },
  {
    id: 6,
    title: 'ESTUDIOS',
    company: '',
    period: '2008 - 2013',
    description: 'Ingeniería de Sistemas - Unipanamericana. Tecnólogo en Análisis y Desarrollo de Sistemas - SENA.',
    details: [
      { icon: '🏫', text: 'Estudios centrados en programación, bases de datos y análisis de sistemas.' },
      { icon: '💻', text: 'Proyectos de software académicos con .NET, SQL Server y Java.' },
      { icon: '🔬', text: 'Participación en semilleros de investigación y programación.' }
    ]
  }
];

const InfoCard = ({ experience, isActive, onClick }) => {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''}`}>
      <div className={styles.cardHeader} onClick={onClick}>
        <h3 className={styles.jobTitle}>{experience.title}</h3>
        {experience.company && <p className={styles.company}>{experience.company}</p>}
        <span className={styles.arrowIcon}>{isActive ? '🞁' : '🞃'}</span>
      </div>

      <div className={`${styles.cardContent} ${isActive ? styles.expandedContent : styles.collapsedContent}`}>
        <div className={styles.contentBox}>
          <p className={styles.period}>📅 {experience.period}</p>
          <p className={styles.description}>{experience.description}</p>
          <ul className={styles.detailsList}>
            {experience.details.map((item, i) => (
              <li key={i} className={styles.detailItem}>
                <span className={styles.pixelIcon}>{item.icon}</span> {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MyJourney = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className={styles.myJourneyMain}>
      <h2 className={styles.sectionTitle}> MY JOURNEY </h2>
      <div className={styles.timeLineContainer}>
        {experiences.map((exp, index) => (
          <div
            className={`${styles[`item${index + 1}`]} ${activeCard === exp.id ? styles.activeItem : ''}`}
            key={exp.id}
          >
            <InfoCard
              experience={exp}
              isActive={activeCard === exp.id}
              onClick={() => handleCardClick(exp.id)}
            />
          </div>
        ))}
        <div className={styles.center}>
          <div className={styles.pixelLine}></div>
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`${styles.pixelDot} ${styles[`dot${index + 1}`]} ${activeCard === exp.id ? styles.activeDot : ''}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyJourney;
