import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles/sliderImage.module.scss';

const SliderImage = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState(null);

  // Cargar imágenes
  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageModules = import.meta.glob('../../assets/images/photograph/*.{avif,webp,jpg,png}', {
          eager: true,
          import: 'default',
          query: { as: 'url' }
        });

        const imageUrls = Object.values(imageModules);

        if (imageUrls.length === 0) {
          throw new Error("No se encontraron imágenes en el directorio");
        }

        setImages(imageUrls);

        // Inicializar estados de carga
        const initialLoadingStates = {};
        imageUrls.forEach((_, index) => {
          initialLoadingStates[index] = true;
        });
        setLoadingStates(initialLoadingStates);
        setError(null);
      } catch (error) {
        console.error("Error al cargar imágenes:", error);
        setError(error.message);
        setImages([]);
      }
    };

    loadImages();
  }, []);

  // Precargar imágenes
  useEffect(() => {
    if (images.length === 0) return;

    const handleImageLoad = (index) => {
      setLoadingStates(prev => ({
        ...prev,
        [index]: false
      }));
    };

    const handleImageError = (index, img) => {
      console.error(`Error al cargar imagen: ${img}`);
      setLoadingStates(prev => ({
        ...prev,
        [index]: false
      }));
    };

    images.forEach((img, index) => {
      const image = new Image();
      image.src = img;
      image.onload = () => handleImageLoad(index);
      image.onerror = () => handleImageError(index, img);
    });
  }, [images]);

  // Navegación
  const goToPrevious = useCallback(() => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToImage = useCallback((index) => {
    if (index >= 0 && index < images.length) {
      setCurrentImageIndex(index);
    }
  }, [images.length]);

  // Auto-play
  useEffect(() => {
    if (images.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isPaused, goToNext]);

  if (error) {
    return (
      <div className={styles.sliderError}>
        Error al cargar imágenes: {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className={styles.sliderError}>
        Cargando imágenes...
      </div>
    );
  }

  return (
    <div
      className={styles.sliderContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className={styles.sliderImageWrapper}>
        {loadingStates[currentImageIndex] && (
          <div className={styles.sliderLoadingOverlay}>
            <div className={styles.sliderImageLoading}>Cargando imagen...</div>
          </div>
        )}

        <button
          className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`}
          onClick={goToPrevious}
          aria-label="Imagen anterior"
        />
        <img
          src={images[currentImageIndex]}
          alt={`Photograph ${currentImageIndex + 1}`}
          className={`${styles.sliderImage} ${loadingStates[currentImageIndex] ? styles.loading : styles.loaded}`}
          loading="lazy"
          decoding="async"
        />

        <button
          className={`${styles.sliderArrow} ${styles.sliderArrowRight}`}
          onClick={goToNext}
          aria-label="Imagen siguiente"
        />

      </div>

      <div className={styles.sliderDots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.sliderDot} ${index === currentImageIndex ? styles.active : ''}`}
            onClick={() => goToImage(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            aria-current={index === currentImageIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderImage;
