import React from 'react';
import styles from './styles/MyJourney.module.scss';

export default function MyJourney({ experiences }) {
  return (
    <div className={styles.gridContainer}>
      {experiences.map((experience) => (
        <div key={experience.id} className={styles.card}>
          <div className={styles.cardInner}>
            <h2 className={styles.title}>{experience.title}</h2>
            {experience.company && <p className={styles.company}>{experience.company}</p>}
            <p className={styles.period}>{experience.period}</p>
          </div>
          <div className={styles.cardOverlay}>
            <p className={styles.description}>{experience.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
