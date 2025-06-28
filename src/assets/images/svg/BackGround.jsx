import React from 'react';
import Layer1 from './background/1.png';
import Layer2 from './background/2.png';
import Layer3 from './background/3.png';
import Layer4 from './background/4.png';
import Layer5 from './background/5.png';

import styles from './styles/BackGround.module.scss';

export default function Background({ ...props }) {

  const LayerComponents = [Layer1, Layer2, Layer3, Layer4, Layer5];

  return (
    <>
      {LayerComponents.map((layerSrc, index) => (
        <div
          key={`layer-${index + 1}`}
          className={`${styles.layer} ${styles[`layer${index + 1}`]}`}
        >
          <img src={layerSrc} alt={`Layer ${index + 1}`} />
        </div>
      ))}
    </>
  );
}
