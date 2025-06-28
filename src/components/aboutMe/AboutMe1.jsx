import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import TvRetro from '../../assets/images/svg/TvRetro.jsx';
import PxlDiv from '../../utilities/PxlDiv.jsx';
import Tetris from '../Tetris/Tetris.jsx';
import styles from './styles/AboutMe1.module.scss';

export default function AboutMe1() {
  const [imagenFullScreen, setImagenFullScreen] = useState(null);

  useEffect(() => {
    if (imagenFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [imagenFullScreen]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  const handleFullScreenImage = (image) => {
    setImagenFullScreen(image);
  };

  return (
    <div className={styles.aboutMeMain}>
      <div className={styles.AboutMeContainer}>
        <div className={styles.tetrisBackground}>
          <Tetris />
        </div>

        {imagenFullScreen && (
          <div className={styles.overlay}>
            <button className={styles.closeButton} onClick={() => setImagenFullScreen(null)}>×</button>
            <img className={styles.fullscreenImage} src={imagenFullScreen} alt="Imagen activa" />
          </div>
        )}

        <div className={styles.contentAboutMe1}>
          <PxlDiv size={5} color="#000000" bgColor="rgb(79,79,79,0.6)">
            <div className={styles.textAboutMe1}>
              <p>
                Después de empezar a trabajar y contar con algo de dinero disponible, descubrí nuevos intereses como el longboard, la cocina, el trekking, viajar, los animales, la vida en el campo y la fotografía. De todos estos, la cocina, los animales y la fotografía se han vuelto una parte importante de mi vida actualmente.
              </p>
              <p>
                Tengo dos gatos (Spike y Kiki) y una perra (Saria), que forman parte fundamental de mi familia. Me gusta mucho cocinar y también tengo un fuerte interés por la fotografía, especialmente de paisajes y fotografía callejera. Esta afición va acompañada de mi gusto por viajar, lo que me permite conocer lugares nuevos y documentarlos con mi cámara para guardarlos en mi galería personal.
              </p>
              <p>
                Esta sección del portafolio muestra un poco de lo que me gusta hacer fuera del trabajo y cómo estas actividades también influyen en mi forma de ver el mundo y de trabajar.
              </p>
            </div>
          </PxlDiv>
        </div>
        <div
          ref={ref}
          className={`${styles.tvRetro} ${inView ? styles.slideIn : styles.slideOut}`}
        >
          <TvRetro pathImage={'photograph'} fullScreenImg={handleFullScreenImage} />
        </div>
      </div>
    </div>
  );
}
