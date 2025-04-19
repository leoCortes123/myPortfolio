import React from 'react';
import { Link } from 'react-router-dom';
import aboutMe from '../../assets/images/aboutMeButton.png';
import PxlDiv from '../../utilities/PxlDiv.jsx';
import styles from './styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.presentation}>
        <div className={styles.filter}>
          <PxlDiv
            size={5}
            color="#fff"
            bgColor="rgb(27,27,27,.7)"
          >
            <h1>
              I&apos;m Leonardo Cortes
            </h1>
            <p className={styles.p1}>FullStack web developer.</p>
          </PxlDiv>
        </div>
        <p className={styles.typewriterContainer}>
          <span className={`${styles.line1} ${styles.animTypewriter}`}>
            Building cool stuff with code. Breaking things (and fixing them) since 2013!
          </span>
        </p>
      </div>

      <div className={styles.nav}>
        <div className={styles.link}><Link to="/about"><img src={aboutMe} alt="About Me" /></Link></div>
        <div className={styles.link}><Link to="/myJourney"><img src={aboutMe} alt="My Journey" /></Link></div>
        <div className={styles.link}><Link to="/contact"><img src={aboutMe} alt="Contact" /></Link></div>
      </div>
    </div>
  );
}
