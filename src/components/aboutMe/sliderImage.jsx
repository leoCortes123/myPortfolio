import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './styles/sliderImage.module.scss';

const SliderImage = forwardRef(({ imageDirectory }, ref) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const tvRef = useRef(null);

  useImperativeHandle(ref, () => ({
    goToNext,
    goToPrev,
    toggleFullScreen
  }));

  useEffect(() => {
    const importImages = async () => {
      try {
        let imageModules;
        if (imageDirectory === 'gifs') {
          imageModules = import.meta.glob('../../assets/images/gifs/*.{jpg,jpeg,png,gif,webp}');
        } else if (imageDirectory === 'photograph') {
          imageModules = import.meta.glob('../../assets/images/photograph/*.{jpg,jpeg,png,gif,webp}');
        } else {
          console.warn('Directorio no válido:', imageDirectory);
          return;
        }

        const imports = await Promise.all(
          Object.values(imageModules).map(loader => loader())
        );

        const loadedImages = imports.map(mod => mod.default);
        setImages(loadedImages);
        setCurrentIndex(0);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    importImages();
  }, [imageDirectory]);

  const goToNext = () => {
    if (images.length === 0) return;
    triggerGlitch();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    if (images.length === 0) return;
    triggerGlitch();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleFullScreen = () => {
    if (imageDirectory === 'photograph') {
      setIsFullscreen(prev => !prev);
      return images[currentIndex] || null;
    }
    return null;
  };

  const triggerGlitch = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 150);
  };

  if (images.length === 0) {
    return <div className={styles.tv}>Cargando imágenes...</div>;
  }

  return (
    <div
      className={`${styles.tv} ${glitchEffect ? styles.glitch : ''} ${isFullscreen ? styles.fullscreen : ''}`}
      ref={tvRef}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className={styles.image}
      />
    </div>
  );
});

export default SliderImage;
