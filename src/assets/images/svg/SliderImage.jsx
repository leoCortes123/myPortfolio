import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles/SliderImage.module.scss';

const Slide = React.memo(function Slide({ image, positionClass }) {
  return (
    <div className={`${styles.carouselItem} ${styles[positionClass]}`}>
      <img
        src={image}
        alt={`Slide`}
        loading={positionClass === 'active' ? 'eager' : 'lazy'}
        decoding={positionClass === 'active' ? 'auto' : 'async'}
      />
    </div>
  );
});

export default function SliderImage() {
  const [state, setState] = useState({
    images: [],
    currentIndex: 0,
    transitionDirection: null,
    isTransitioning: false
  });

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageModules = await Promise.all(
          Object.values(import.meta.glob('../photograph/*.{jpg,jpeg,png,gif,webp,avif}')).map(
            async (resolver) => {
              try {
                const module = await resolver();
                return module.default;
              } catch (error) {
                console.error('Error loading image:', error);
                return null;
              }
            }
          )
        );

        const validImages = imageModules.filter(Boolean);
        if (validImages.length === 0) {
          console.warn('No valid images found.');
        }

        setState(prev => ({ ...prev, images: validImages }));
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  const navigateSlide = useCallback((direction) => {
    if (stateRef.current.isTransitioning || stateRef.current.images.length === 0) return;

    const newIndex = direction === 'next'
      ? (stateRef.current.currentIndex + 1) % stateRef.current.images.length
      : (stateRef.current.currentIndex - 1 + stateRef.current.images.length) % stateRef.current.images.length;

    setState(prev => ({
      ...prev,
      isTransitioning: true,
      transitionDirection: direction
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentIndex: newIndex,
        isTransitioning: false
      }));
    }, 300);
  }, []);

  const imageIndices = useMemo(() => {
    if (state.images.length === 0) return [];
    return [
      (state.currentIndex - 1 + state.images.length) % state.images.length,
      state.currentIndex,
      (state.currentIndex + 1) % state.images.length
    ];
  }, [state.currentIndex, state.images.length]);

  const positionClasses = useMemo(() => {
    if (state.images.length === 0) return [];
    return imageIndices.map(index => {
      if (index === state.currentIndex) return 'active';
      if (index === (state.currentIndex - 1 + state.images.length) % state.images.length) {
        return state.transitionDirection === 'previous' ? 'previous-out' : 'previous-in';
      }
      if (index === (state.currentIndex + 1) % state.images.length) {
        return state.transitionDirection === 'next' ? 'next-out' : 'next-in';
      }
      return 'hidden';
    });
  }, [state.currentIndex, state.images.length, state.transitionDirection, imageIndices]);

  if (state.images.length === 0) {
    return <div className={styles.loading}>Loading images...</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      <Slide
        key={`slide-${imageIndices[0]}`}
        image={state.images[imageIndices[0]]}
        positionClass={positionClasses[0]}
      />
      <Slide
        key={`slide-${imageIndices[1]}`}
        image={state.images[imageIndices[1]]}
        positionClass={positionClasses[1]}
      />
      <Slide
        key={`slide-${imageIndices[2]}`}
        image={state.images[imageIndices[2]]}
        positionClass={positionClasses[2]}
      />

      <button
        type='button'
        onClick={() => navigateSlide('previous')}
        disabled={state.isTransitioning}
        aria-label="Previous image"
        className={`${styles.btnSlider} ${styles.prev}`}
      >
      </button>

      <button
        type='button'
        onClick={() => navigateSlide('next')}
        disabled={state.isTransitioning}
        aria-label="Next image"
        className={`${styles.btnSlider} ${styles.next}`}
      >
      </button>
    </div>
  );
}

Slide.propTypes = {
  image: PropTypes.string.isRequired,
  positionClass: PropTypes.string.isRequired,
};
