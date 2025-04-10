// AboutMe.jsx
import React from 'react';
import gif1 from '../../assets/images/gifs/gif1.gif';
import gif10 from '../../assets/images/gifs/gif10.gif';
import gif11 from '../../assets/images/gifs/gif11.webp';
import gif12 from '../../assets/images/gifs/gif12.gif';
import gif13 from '../../assets/images/gifs/gif13.gif';
import gif14 from '../../assets/images/gifs/gif14.gif';
import gif15 from '../../assets/images/gifs/gif15.webp';
import gif16 from '../../assets/images/gifs/gif16.gif';
import gif17 from '../../assets/images/gifs/gif17.gif';
import gif18 from '../../assets/images/gifs/gif18.gif';
import gif2 from '../../assets/images/gifs/gif2.gif';
import gif3 from '../../assets/images/gifs/gif3.webp';
import gif4 from '../../assets/images/gifs/gif4.gif';
import gif5 from '../../assets/images/gifs/gif5.webp';
import gif6 from '../../assets/images/gifs/gif6.webp';
import gif7 from '../../assets/images/gifs/gif7.gif';
import gif8 from '../../assets/images/gifs/gif8.webp';
import gif9 from '../../assets/images/gifs/gif9.webp';
import PxlDiv from '../../utilities/PxlDiv.jsx';
import Camera from './camera.jsx';
import IconsContainer from './floatingIcons.jsx';
import styles from './styles/AboutMe.module.scss';



export default function AboutMe() {
  return (
    <div className={styles.main}>
      <div className={styles.animationSpace}>
        <IconsContainer size={5} />
      </div>
      <section className={styles.section}>
        <div className={styles.presentation}>
          <PxlDiv size={5} color="#000000" bgColor='RGB(228,228,200,1)'>
            <div className={styles.textSection1}>
              <h1>¡HELLO!</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, justo a facilisis gravida, velit neque varius odio, ac fermentum arcu odio et nisi. Fusce ut arcu ut odio auctor lacinia. Nam vel nisi sed purus tincidunt tincidunt. Curabitur non sapien eu odio varius euismod id et elit. Ut vitae mi eget augue pharetra feugiat. Sed in mi nec lorem venenatis tincidunt. Vestibulum et sapien sed libero vehicula congue ut vel eros.
              </p>
              <p>
                Suspendisse potenti. Integer tincidunt magna ut justo volutpat, eget tristique nulla malesuada. Morbi ac quam sit amet justo interdum interdum. Nam tincidunt orci a nulla tincidunt, at pellentesque lacus interdum. Sed tincidunt ipsum at sem ultrices, eget dictum tortor posuere. Mauris fermentum pharetra augue, et feugiat neque vulputate sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              </p>
            </div>
          </PxlDiv>
        </div>
        {/* <div className={styles.meditationContent}>
          <img src={Meditation} alt='Meditation' />
        </div> */}
      </section>
      <section className={styles.section}>
        <PxlDiv size={5} color="#000000" bgColor='RGB(228,228,200,1)'>
          <div className={styles.textSection}>
            <h1>¡HELLO!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, justo a facilisis gravida, velit neque varius odio, ac fermentum arcu odio et nisi. Fusce ut arcu ut odio auctor lacinia. Nam vel nisi sed purus tincidunt tincidunt. Curabitur non sapien eu odio varius euismod id et elit. Ut vitae mi eget augue pharetra feugiat. Sed in mi nec lorem venenatis tincidunt. Vestibulum et sapien sed libero vehicula congue ut vel eros.
            </p>
          </div>
          <div className={styles.Camera}>
            <Camera />
          </div>
        </PxlDiv>
      </section>
      <section className={styles.sectionGames}>
        <div className={styles.GifsContainer}>
          <div className={styles.row}>
            <div className={styles.col}>
              <img src={gif1} alt="" />
              <img src={gif2} alt="" />
              <img src={gif3} alt="" />
            </div>
            <div className={styles.col}>
              <img src={gif4} alt="" />
              <img src={gif5} alt="" />
              <img src={gif6} alt="" />
            </div>
            <div className={styles.col}>
              <img src={gif7} alt="" />
              <img src={gif8} alt="" />
              <img src={gif9} alt="" />
            </div>
            <div className={styles.col}>
              <img src={gif10} alt="" />
              <img src={gif11} alt="" />
              <img src={gif12} alt="" />
            </div>
            <div className={styles.col}>
              <img src={gif13} alt="" />
              <img src={gif14} alt="" />
              <img src={gif15} alt="" />
            </div>
            <div className={styles.col}>
              <img src={gif16} alt="" />
              <img src={gif17} alt="" />
              <img src={gif18} alt="" />
            </div>
          </div>
        </div>

        <div className={styles.textSection2}>
          <h1>¡HELLO!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, justo a facilisis gravida, velit neque varius odio, ac fermentum arcu odio et nisi. Fusce ut arcu ut odio auctor lacinia. Nam vel nisi sed purus tincidunt tincidunt. Curabitur non sapien eu odio varius euismod id et elit. Ut vitae mi eget augue pharetra feugiat. Sed in mi nec lorem venenatis tincidunt. Vestibulum et sapien sed libero vehicula congue ut vel eros.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, justo a facilisis gravida, velit neque varius odio, ac fermentum arcu odio et nisi. Fusce ut arcu ut odio auctor lacinia. Nam vel nisi sed purus tincidunt tincidunt. Curabitur non sapien eu odio varius euismod id et elit. Ut vitae mi eget augue pharetra feugiat. Sed in mi nec lorem venenatis tincidunt. Vestibulum et sapien sed libero vehicula congue ut vel eros.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, justo a facilisis gravida, velit neque varius odio, ac fermentum arcu odio et nisi. Fusce ut arcu ut odio auctor lacinia. Nam vel nisi sed purus tincidunt tincidunt. Curabitur non sapien eu odio varius euismod id et elit. Ut vitae mi eget augue pharetra feugiat. Sed in mi nec lorem venenatis tincidunt. Vestibulum et sapien sed libero vehicula congue ut vel eros.</p>

        </div>
      </section>

    </div>
  );
}

