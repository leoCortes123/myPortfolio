import React from 'react';
import { Link } from 'react-router-dom';
import aboutMe from '../../assets/images/aboutMeButton.png';
import styles from './styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.presentation}>
        <h1 className={styles.name}>
          I&apos;m Leonardo Cortes
        </h1>
        <p>FullStack web developer</p>
        <p>Building cool stuff with code.</p>
        <p>Breaking things (and fixing them) since 2013!</p>
      </div>

      <div className={styles.nav}>
        <div className={styles.link}><Link to="/about"><img src={aboutMe} alt="About Me" /></Link></div>
        <div className={styles.link}><Link to="/myJourney"><img src={aboutMe} alt="My Journey" /></Link></div>
        <div className={styles.link}><Link to="/contact"><img src={aboutMe} alt="Contact" /></Link></div>
      </div>
    </div>
  );
}
