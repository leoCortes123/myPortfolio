import React from 'react';
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

const MyJourney = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>MY JOURNEY</h1>
        <p className={styles.subtitle}>RETRO TIMELINE</p>
      </header>

      <div className={styles.cardsContainer}>
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.card}>
            <div className={styles.cardBadge}>
              {exp.company ? exp.company : 'INDEPENDIENTE'}
            </div>
            <div className={styles.cardInner}>
              <div className={styles.cardDetails}>
                <h2 className={styles.cardName}>{exp.title}</h2>
                <p className={styles.cardPeriod}>{exp.period}</p>
                <p className={styles.cardDescription}>{exp.description}</p>
              </div>
            </div>
            <div className={styles.cardOverlay}>
              {exp.details.map((detail, index) => (
                <div key={index} className={styles.detail}>
                  <span className={styles.detailIcon}>{detail.icon}</span>
                  <span className={styles.detailText}>{detail.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <p>© 2025 MY JOURNEY • RETRO STYLE</p>
      </footer>
    </div>
  );
};

export default MyJourney;
