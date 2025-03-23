import React from 'react';
import aboutMe from '../../assets/images/aboutMeButton.png';
import styles from './styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.presentation}>
        <h2>¡Hello!</h2>
        <h1 className={styles.name}>I'm Leonardo Cortes</h1>
        <p>FullStack web developer</p>
        <p>Building cool stuff with code.</p>
        <p>Breaking things (and fixing them) since 2013!</p>
      </div>


      <div className={styles.nav}>
        <div className={styles.link}> <a href="#about" ><img src={aboutMe} alt="About Me" /></a></div>
        <div className={styles.link}> <a href="#about" ><img src={aboutMe} alt="About Me" /></a></div>
        <div className={styles.link}> <a href="#about" ><img src={aboutMe} alt="About Me" /></a></div>
      </div>


    </div>
  );
}
