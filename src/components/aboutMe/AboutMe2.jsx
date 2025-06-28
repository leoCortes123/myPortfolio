import { useInView } from 'react-intersection-observer';
import TvRetro from '../../assets/images/svg/TvRetro.jsx';
import PxlDiv from '../../utilities/PxlDiv.jsx';
import Tetris from '../Tetris/Tetris.jsx';
import styles from './styles/AboutMe2.module.scss';

export default function AboutMe1() {

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });


  return (
    <div className={styles.aboutMeMain}>
      <div className={styles.AboutMeContainer}>
        <div className={styles.tetrisBackground}>
          <Tetris />
        </div>
        <div
          ref={ref}
          className={`${styles.tvRetro} ${inView ? styles.slideIn : styles.slideOut}`}
        >
          <TvRetro pathImage={'gifs'} />
        </div>
        <div className={styles.contentAboutMe1}>
          <PxlDiv size={6} color='#000' bgColor="rgb(79,79,79,0.6)">
            <div className={styles.textAboutMe2}>
              <p>
                Desde muy joven tuve una gran afición por los videojuegos y las series (especialmente de anime). La primera consola que conocí fue la NES (la más económica en la época) y series como dragon ball y naruto que eran las mas populares acentuaron mi aficion, a medida que crecí, aumentaron tanto mi interés como la cantidad de juegos como la cantidad de series a los que dediqué tiempo. Con el paso del tiempo, y gracias a internet y los juegos en línea, esta pasión se volvió aún más intensa.
              </p>
              <p>
                Al terminar el colegio, exploré varias áreas técnicas como mecánica automotriz y electrónica. En ambas encontré un punto en común: la programación. Ahí descubrí un interés que se parecía al que tenía por los videojuegos, pero con el valor añadido de poder desarrollarme profesionalmente en ello.
              </p>
            </div>
          </PxlDiv>
        </div>
      </div>
    </div>
  );
}
