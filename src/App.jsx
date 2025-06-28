import React, { lazy, useEffect, useRef, useState } from 'react';
import HomeImg from './assets/images/icons/homeImages/home.png';
import Cursor from './components/Cursor/Cursor.jsx';
import BackgroundLayer from './components/prueba/BackgroundLayer.jsx';
import styles from './styles/App.module.scss';
import './styles/_fonts.scss';
import BtnPxl from './utilities/BtnPxl.jsx';
import NoiseCanvas from './utilities/NoiseCanvas.jsx';
import PxlDiv from './utilities/PxlDiv.jsx';

const Home = lazy(() => import('./components/Home/Home.jsx'));
const AboutMe1 = lazy(() => import('./components/aboutMe/AboutMe1.jsx'));
const AboutMe2 = lazy(() => import('./components/aboutMe/AboutMe2.jsx'));
const Contact = lazy(() => import('./components/contact/Contact.jsx'));
const MyJourney = lazy(() => import('./components/myJourney/MyJourney.jsx'));

export default function App() {
  const [canvasVisible, setCanvasVisible] = useState(true);
  const [count, setCount] = useState(9);
  const [showNavbar, setShowNavbar] = useState(false);

  const homeSection = useRef(null);
  const myJourneySection = useRef(null);
  const aboutMe1Section = useRef(null);
  const aboutMe2Section = useRef(null);
  const contactSection = useRef(null);
  const containerRef = useRef(null);

  // Scroll wheel horizontal effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollBy({
        left: e.deltaY,
        behavior: 'smooth',
      });
    };

    const options = { passive: false };
    container.addEventListener('wheel', handleWheel, options);

    return () => {
      container.removeEventListener('wheel', handleWheel, options);
    };
  }, [canvasVisible]);

  useEffect(() => {
    if (!canvasVisible || count <= 0) return;
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, canvasVisible]);

  useEffect(() => {
    if (count === 0 && canvasVisible) {
      setCanvasVisible(false);
    }
  }, [count, canvasVisible]);

  const hideCanvas = () => {
    setCanvasVisible(false);
    setCount(9);
  };

  const getNavValue = (value) => {
    switch (value) {
      case 'myJourney':
        myJourneySection.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'aboutMe':
        aboutMe1Section.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        contactSection.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        console.warn('Unknown navigation value:', value);
    }
  };

  // Handler para la navegación desde el navbar
  const handleNavClick = (section) => {
    switch (section) {
      case 'home':
        homeSection.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'myJourney':
        myJourneySection.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'aboutMe':
        aboutMe1Section.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        contactSection.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  // ---- INTERSECTION OBSERVER ----
  useEffect(() => {
    if (!homeSection.current) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        // Si home está MÁS del 50% visible, ocultar navbar
        setShowNavbar(!entry.isIntersecting || entry.intersectionRatio < 0.5 ? true : false);
      },
      {
        root: null,
        threshold: [0.5], // 50% visible
      }
    );

    observer.observe(homeSection.current);

    return () => {
      if (homeSection.current) observer.unobserve(homeSection.current);
    };
  }, [canvasVisible]);

  return (
    <>
      <Cursor size={50} rotation={true} />
      {canvasVisible ? (
        <div className={styles.home}>
          <div className={styles.noise}>
            <NoiseCanvas colorMode="oldGrayscale" pixelSize={1} />
          </div>
          <div className={styles.presentation}>
            <PxlDiv size={5} color="#fff" bgColor="rgb(27,27,27,.7)">
              <h1 className={styles.principalText}> Leonardo Cortes</h1>
            </PxlDiv>
          </div>
          <div className={styles.contdownContainer}>
            <div className={styles.btnFix}>
              <BtnPxl
                size={4}
                color="#333026"
                bgColor="#505474"
                textColor="#f7bd38"
                onClick={hideCanvas}
              >
                CONTINUE
              </BtnPxl>
            </div>
            <div className={styles.contdown}>
              <span>{count}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <BackgroundLayer />
          <div className={styles.mainWrapper} ref={containerRef}>
            <div className={styles.main}>
              <section ref={homeSection}><Home getNavValue={getNavValue} /></section>
              <section ref={myJourneySection}><MyJourney /></section>
              <section ref={aboutMe1Section}><AboutMe2 /></section>
              <section ref={aboutMe2Section}><AboutMe1 /></section>
              <section ref={contactSection}><Contact /></section>
            </div>
          </div>

          <nav className={styles.navBar}>
            <div className={styles.navImg} onClick={() => handleNavClick('home')}>
              <img className={styles.navImg} src={HomeImg} alt="Home" />
            </div>
            <div className={styles.navItem} onClick={() => handleNavClick('myJourney')}>
              Experiencia
            </div>
            <div className={styles.navItem} onClick={() => handleNavClick('aboutMe')}>
              <p>Sobre mi</p>
            </div>
            <div className={styles.navItem} onClick={() => handleNavClick('contact')}>
              <p>Contacto</p>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
