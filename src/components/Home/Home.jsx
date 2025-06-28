import React from 'react';
import character from '../../assets/images/icons/homeImages/character.gif';
import FloatingIcons from './floatingIcons.jsx';
import styles from './styles/Home.module.scss';


export default function Home({ getNavValue }) {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.presentation}>
        <h1 className={styles.principalText}>Leonardo Cortes</h1>
        <p className={styles.p1}>FullStack web developer.</p>
      </div>
      <div className={styles.animation}>
        <div className={styles.bubbleContainer}>
          <div className={`${styles.bubble} ${styles.shadow} ${styles.large} ${styles.bottom}`}>
            <p className={styles.typewriterContainer}>
              <span className={styles.line1}>
                Creando cosas geniales con código. Rompiendo (y arreglando) desde 2013.
              </span>
            </p>
          </div>
        </div>
        <div className={styles.animations}>
          <div className={styles.icons}>
            <FloatingIcons />
          </div>
          <img src={character} alt="character" />
        </div>
      </div>

    </div>
  );
}
