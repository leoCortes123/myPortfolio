import React from 'react';
import styles from './styles/Carousel.module.scss';

export default function Carousel() {

  const duration = 20 * Math.random() + 50;
  const allImages = Object.values(import.meta.glob('../../assets/images/gifs/*.{webp,gif,png,jpg,jpeg}', {
    eager: true
  })).map(module => module.default);

  if (!allImages.length) {
    return <div>No se encontraron imágenes</div>;
  }

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffledImages = shuffleArray(allImages);

  return (
    <div className={styles.slider}>
      {shuffledImages.map((img, index) => {
        const isLeft = (index % 2) === 0;
        const delay = index * 2;
        const imageHeightPercentage = 20 + Math.random() * 30;
        const RandomTranslateY = Math.floor(Math.random() * 201) - 100;
        const translateY = RandomTranslateY < 0
          ? RandomTranslateY + imageHeightPercentage
          : RandomTranslateY - imageHeightPercentage;

        return (
          <div
            key={index}
            className={`${styles.slide} ${isLeft ? styles.left : styles.right}`}
            style={{
              '--delay': `${delay}s`,
              '--height': `${imageHeightPercentage}%`,
              '--translateY': `${translateY}%`,
              '--duration': `${duration}s`,
            }}
          >
            <img src={img} alt={`Slide ${index}`} />
          </div>
        );
      })}
    </div>
  );
};
