import React, { lazy, useEffect, useRef, useState } from 'react';
import arrowIcon from './assets/images/icons/arrowIcon.gif';
import HomeImg from './assets/images/icons/homeImages/home.png';
import scrollGif from './assets/images/icons/scrollicon.gif';
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
  const [activeSection, setActiveSection] = useState("home");

  const containerRef = useRef(null);

  // Unir sections y refs en una sola estructura
  const sectionsData = [
    { name: 'home', ref: useRef(null) },
    { name: 'myJourney', ref: useRef(null) },
    { name: 'aboutMe1', ref: useRef(null) },
    { name: 'aboutMe2', ref: useRef(null) },
    { name: 'contact', ref: useRef(null) },
  ];

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
    if (count === 0 && canvasVisible) {
      setCanvasVisible(false);
    }

    if (!canvasVisible || count <= 0) return;
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);

  }, [count, canvasVisible]);

  const hideCanvas = () => {
    setCanvasVisible(false);
    setCount(9);
  };

  // Handler para la navegación desde el navbar
  const handleNavClick = (sectionName) => {
    const sectionObj = sectionsData.find(sec => sec.name === sectionName);
    if (sectionObj && sectionObj.ref.current) {
      sectionObj.ref.current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionName);
    }
  };

  const nextSection = () => {
    const currentIndex = sectionsData.findIndex(sec => sec.name === activeSection);
    if (currentIndex < sectionsData.length - 1) {
      const next = sectionsData[currentIndex + 1];
      handleNavClick(next.name);
    }
  };

  const prevSection = () => {
    const currentIndex = sectionsData.findIndex(sec => sec.name === activeSection);
    if (currentIndex > 0) {
      const prev = sectionsData[currentIndex - 1];
      handleNavClick(prev.name);
    }
  };

  // Nuevo: Cambiar activeSection al hacer scroll horizontal
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      let minDiff = Infinity;
      let activeIdx = 0;

      sectionsData.forEach((section, idx) => {
        if (section.ref.current) {
          const left = section.ref.current.offsetLeft;
          const diff = Math.abs(left - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            activeIdx = idx;
          }
        }
      });

      setActiveSection(sectionsData[activeIdx].name);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Ejecutar al montar para establecer la sección inicial
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [canvasVisible, sectionsData]);

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
              <section ref={sectionsData[0].ref}><Home /></section>
              <section ref={sectionsData[1].ref}><MyJourney /></section>
              <section ref={sectionsData[2].ref}><AboutMe2 /></section>
              <section ref={sectionsData[3].ref}><AboutMe1 /></section>
              <section ref={sectionsData[4].ref}><Contact /></section>
            </div>
          </div>

          <nav className={styles.navBar}>
            <div className={styles.navImg} onClick={() => handleNavClick('home')}>
              <img className={styles.navImg} src={HomeImg} alt="Home" />
            </div>
            <div className={styles.navItem} onClick={() => handleNavClick('myJourney')}>
              Experiencia
            </div>
            <div className={styles.navItem} onClick={() => handleNavClick('aboutMe1')}>
              <p>Sobre mi</p>
            </div>
            <div className={styles.navItem} onClick={() => handleNavClick('contact')}>
              <p>Contacto</p>
            </div>
          </nav>

          {activeSection === 'home' ? (
            <div className={styles.scrollGif}>
              <img src={scrollGif} alt="Scroll down" />
            </div>
          ) : (
            <div className={styles.prevIcon}>
              <img src={arrowIcon} alt="Prev" onClick={prevSection} />
            </div>
          )}
          {activeSection !== 'contact' && (
            <div className={styles.nextIcon}>
              <img src={arrowIcon} alt="Next" onClick={nextSection} />
            </div>
          )}
        </>
      )}
    </>
  );
}
