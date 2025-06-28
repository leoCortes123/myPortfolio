import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Home/Nav.jsx';
import BtnPxl from '../../utilities/BtnPxl.jsx';
import PxlDiv from '../../utilities/PxlDiv.jsx';
import styles from './styles/Home.module.scss';

export default function Home({ canvasVisible, toggleCanvasVisibility }) {
  const [count, setCount] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (canvasVisible) {
      toggleCanvasVisibility();
    }
  }, [count, canvasVisible, toggleCanvasVisibility]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.main}>
      <div className={styles.presentation}>
        <PxlDiv size={5} color="#fff" bgColor="rgb(27,27,27,.7)">
          <h1 className={styles.principalText}>I'm Leonardo Cortes</h1>
          <p className={styles.p1}>FullStack web developer.</p>
        </PxlDiv>
        <p className={styles.typewriterContainer}>
          <span className={styles.line1}>
            Building cool stuff with code. Breaking things (and fixing them) since 2013!
          </span>
        </p>
      </div>

      {canvasVisible ? (
        <div className={styles.contdownContainer}>
          <div className={styles.btnFix}>
            <BtnPxl
              size={4}
              color="#333026"
              bgColor="#505474"
              textColor="#f7bd38"
              onClick={toggleCanvasVisibility}
            >
              CONTINUE
            </BtnPxl>
          </div>
          <div className={styles.contdown}>
            <span>{count}</span>
          </div>
        </div>
      ) : (
        <div className={styles.nav}>
          <Nav onNavigate={handleNavigate} />
        </div>
      )}

    </div>
  );
}
