import React, { useEffect, useRef } from 'react';

import Layer1 from '../../assets/images/background/1.png';
import Layer2 from '../../assets/images/background/2.png';
import Layer3 from '../../assets/images/background/3.png';
import Layer4 from '../../assets/images/background/4.png';
import Layer5 from '../../assets/images/background/5.png';
import styles from './BackgroundLayer.module.scss';

const layers = [
  { src: Layer1, speed: 0.1 },
  { src: Layer2, speed: 0.2 },
  { src: Layer3, speed: 0.3 },
  { src: Layer4, speed: 0.4 },
  { src: Layer5, speed: 0.5 },
];

const TOTAL_WIDTH_VW = 500;
const IMG_WIDTH_VW = 100;

export default function BackgroundLayer() {
  const layerRefs = useRef([]);

  useEffect(() => {
    const mainWrapper = document.querySelector(`.${styles.mainWrapper}`) || document.querySelector('[class*="mainWrapper"]');
    if (!mainWrapper) return;

    const handleScroll = () => {
      const scrollLeft = mainWrapper.scrollLeft;
      layerRefs.current.forEach((layer, idx) => {
        if (layer) {
          layer.style.transform = `translateX(-${scrollLeft * layers[idx].speed}px)`;
        }
      });
    };

    mainWrapper.addEventListener('scroll', handleScroll);
    return () => mainWrapper.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcula cuántas imágenes hacen falta para cubrir 500vw
  const imagesPerLayer = Math.ceil(TOTAL_WIDTH_VW / IMG_WIDTH_VW);

  return (
    <div className={styles.backgroundLayer}>
      {layers.map((layer, idx) => (
        <div
          key={idx}
          ref={el => layerRefs.current[idx] = el}
          className={styles.layer}
          style={{
            zIndex: idx,
          }}
        >
          {Array.from({ length: imagesPerLayer }).map((_, imgIdx) => (
            <img
              key={imgIdx}
              src={layer.src}
              style={{
                position: 'absolute',
                top: 0,
                left: `${imgIdx * 100}vw`,
                width: '100vw',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              alt={`Background layer ${idx + 1} segment ${imgIdx + 1}`}
              draggable={false}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
