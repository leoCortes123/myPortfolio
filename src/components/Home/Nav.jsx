import React, { useState } from 'react';
import btn1Img1 from '../../assets/images/icons/homeImages/btn1/camera.png';
import btn1Img2 from '../../assets/images/icons/homeImages/btn1/cat.png';
import btn1Img3 from '../../assets/images/icons/homeImages/btn1/dog.png';
import btn1Img4 from '../../assets/images/icons/homeImages/btn1/mario.png';
import btn1Img5 from '../../assets/images/icons/homeImages/btn1/master.png';
import btn1Img6 from '../../assets/images/icons/homeImages/btn1/onepiece.png';

import btn2Img5 from '../../assets/images/icons/homeImages/btn2/crane.png';
import btn2Img2 from '../../assets/images/icons/homeImages/btn2/csharp.png';
import btn2Img3 from '../../assets/images/icons/homeImages/btn2/html.png';
import btn2Img6 from '../../assets/images/icons/homeImages/btn2/javascript.png';
import btn2Img1 from '../../assets/images/icons/homeImages/btn2/pc.png';
import btn2Img4 from '../../assets/images/icons/homeImages/btn2/react.png';

import btn3Img4 from '../../assets/images/icons/homeImages/btn3//phone.png';
import btn3Img1 from '../../assets/images/icons/homeImages/btn3/hello.png';
import btn3Img2 from '../../assets/images/icons/homeImages/btn3/letter.png';
import btn3Img3 from '../../assets/images/icons/homeImages/btn3/mess.png';
import btn3Img5 from '../../assets/images/icons/homeImages/btn3/question.png';
import btn3Img6 from '../../assets/images/icons/homeImages/btn3/whatsapp.png';
import styles from './styles/Nav.module.scss';

export default function Nav({ onNavigate }) {
  const [hoverStates, setHoverStates] = useState({
    btn1: false,
    btn2: false,
    btn3: false
  });

  const handleMouseEnter = (btn) => {
    setHoverStates(prev => ({ ...prev, [btn]: true }));
  };

  const handleMouseLeave = (btn) => {
    setHoverStates(prev => ({ ...prev, [btn]: false }));
  };

  return (
    <div className={styles.nav}>
      <div
        className={`${styles.innerButton} ${hoverStates.btn1 ? styles.hoveredBtn1 : ''}`}
        onMouseEnter={() => handleMouseEnter('btn1')}
        onMouseLeave={() => handleMouseLeave('btn1')}
        onClick={() => onNavigate('/about')}
      >
        <div className={styles.content}>
          <div className={styles.base} />
          <img src={btn1Img5} alt="img1btn5" className={`${styles.img5} ${styles.btn1Img5}`} />
          <img src={btn1Img4} alt="img1btn4" className={`${styles.img4} ${styles.btn1Img4}`} />
          <img src={btn1Img6} alt="img1btn6" className={`${styles.img6} ${styles.btn1Img6}`} />
          <img src={btn1Img1} alt="img1btn1" className={`${styles.img1} ${styles.btn1Img1}`} />
          <img src={btn1Img3} alt="img1btn3" className={`${styles.img3} ${styles.btn1Img3}`} />
          <img src={btn1Img2} alt="img1btn2" className={`${styles.img2} ${styles.btn1Img2}`} />
        </div>
        <div className={styles.title}>
          <p>ABOUT ME</p>
        </div>
      </div>
      <div
        className={`${styles.innerButton2} ${hoverStates.btn2 ? styles.hoveredBtn2 : ''}`}
        onMouseEnter={() => handleMouseEnter('btn2')}
        onMouseLeave={() => handleMouseLeave('btn2')}
        onClick={() => onNavigate('/myJourney')}
      >
        <div className={styles.content}>
          <div className={styles.base} />
          <img src={btn2Img5} alt="img2btn5" className={`${styles.img5} ${styles.btn2Img5}`} />
          <img src={btn2Img1} alt="img2btn1" className={`${styles.img1} ${styles.btn2Img1}`} />
          <img src={btn2Img6} alt="img2btn6" className={`${styles.img6} ${styles.btn2Img6}`} />
          <img src={btn2Img3} alt="img2btn3" className={`${styles.img3} ${styles.btn2Img3}`} />
          <img src={btn2Img4} alt="img2btn4" className={`${styles.img4} ${styles.btn2Img4}`} />
          <img src={btn2Img2} alt="img2btn2" className={`${styles.img2} ${styles.btn2Img2}`} />
        </div>
        <div className={styles.title}>
          <p>MY JOURNEY</p>
        </div>
      </div>
      <div
        className={`${styles.innerButton3} ${hoverStates.btn3 ? styles.hoveredBtn3 : ''}`}
        onMouseEnter={() => handleMouseEnter('btn3')}
        onMouseLeave={() => handleMouseLeave('btn3')}
        onClick={() => onNavigate('/contact')}
      >
        <div className={styles.content}>
          <div className={styles.base} />
          <img src={btn3Img6} alt="img3btn6" className={`${styles.img6} ${styles.btn3Img6}`} />
          <img src={btn3Img5} alt="img3btn5" className={`${styles.img5} ${styles.btn3Img5}`} />
          <img src={btn3Img4} alt="img3btn4" className={`${styles.img4} ${styles.btn3Img4}`} />
          <img src={btn3Img3} alt="img3btn3" className={`${styles.img3} ${styles.btn3Img3}`} />
          <img src={btn3Img2} alt="img3btn2" className={`${styles.img2} ${styles.btn3Img2}`} />
          <img src={btn3Img1} alt="img3btn1" className={`${styles.img1} ${styles.btn3Img1}`} />
        </div>
        <div className={styles.title}>
          <p>CONTACT ME</p>
        </div>
      </div>
    </div>
  );
}
