// AboutMe.jsx
import React from 'react';
import PxlDiv from '../../utilities/PxlDiv.jsx';
import Camera from './camera.jsx';
import Carousel from './Carousel.jsx';
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

      </section>
      <section className={styles.section}>
        <Carousel />
        <div className={styles.textSection2}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, justo a facilisis gravida, velit neque varius odio, ac fermentum arcu odio et nisi. Fusce ut arcu ut odio auctor lacinia. Nam vel nisi sed purus tincidunt tincidunt. Curabitur non sapien eu odio varius euismod id et elit. Ut vitae mi eget augue pharetra feugiat. Sed in mi nec lorem venenatis tincidunt. Vestibulum et sapien sed libero vehicula congue ut vel eros.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, justo a facilisis gravida, velit neque varius odio, ac fermentum arcu odio et nisi. Fusce ut arcu ut odio auctor lacinia. Nam vel nisi sed purus tincidunt tincidunt. Curabitur non sapien eu odio varius euismod id et elit. Ut vitae mi eget augue pharetra feugiat. Sed in mi nec lorem venenatis tincidunt. Vestibulum et sapien sed libero vehicula congue ut vel eros.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, justo a facilisis gravida, velit neque varius odio, ac fermentum arcu odio et nisi. Fusce ut arcu ut odio auctor lacinia. Nam vel nisi sed purus tincidunt tincidunt. Curabitur non sapien eu odio varius euismod id et elit. Ut vitae mi eget augue pharetra feugiat. Sed in mi nec lorem venenatis tincidunt. Vestibulum et sapien sed libero vehicula congue ut vel eros.</p>

        </div>
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


    </div>
  );
}

