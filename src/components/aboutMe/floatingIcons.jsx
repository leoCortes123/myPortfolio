import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import styles from './styles/FloatingIcons.module.scss';

const svgIcons = Object.entries(import.meta.glob('../../assets/images/icons/aboutMeIcons/*.png', { eager: true }))
  .map(([, module]) => module.default);

export default function FloatingIcons({ size = 5 }) {
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
  const animationFrameId = useRef(null);

  const minSpeed = 10;
  const maxSpeed = 30;
  const targetFPS = 60;
  const frameTime = 1000 / targetFPS;

  useEffect(() => {
    if (!containerRef.current || !iconRefs.current.length) return;

    const container = containerRef.current;
    let lastTimestamp = 0;

    const updatePositions = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (deltaTime < frameTime) {
        animationFrameId.current = requestAnimationFrame(updatePositions);
        return;
      }

      const containerRect = container.getBoundingClientRect();

      iconRefs.current.forEach((iconRef) => {
        if (!iconRef || !iconRef.dataset.initialized) return;

        const icon = iconRef;
        const data = JSON.parse(icon.dataset.movement);

        const distanceX = data.xSpeed * (deltaTime / 1000);
        const distanceY = data.ySpeed * (deltaTime / 1000);

        data.x += distanceX;
        data.y += distanceY;

        if (data.x <= 0) {
          data.x = 0;
          data.xSpeed = Math.abs(data.xSpeed);
        } else if (data.x >= containerRect.width - icon.offsetWidth) {
          data.x = containerRect.width - icon.offsetWidth;
          data.xSpeed = -Math.abs(data.xSpeed);
        }

        if (data.y <= 0) {
          data.y = 0;
          data.ySpeed = Math.abs(data.ySpeed);
        } else if (data.y >= containerRect.height - icon.offsetHeight) {
          data.y = containerRect.height - icon.offsetHeight;
          data.ySpeed = -Math.abs(data.ySpeed);
        }

        icon.style.left = `${data.x}px`;
        icon.style.top = `${data.y}px`;
        icon.dataset.movement = JSON.stringify(data);
      });

      animationFrameId.current = requestAnimationFrame(updatePositions);
    };

    const containerRect = container.getBoundingClientRect();
    iconRefs.current.forEach((iconRef) => {
      if (!iconRef) return;

      const icon = iconRef;
      const iconWidth = (containerRect.width * size) / 100;
      const iconHeight = (iconWidth * icon.naturalHeight) / icon.naturalWidth;

      const getRandomSpeed = () => {
        const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        return speed * (Math.random() > 0.5 ? 1 : -1);
      };

      const maxX = containerRect.width - iconWidth;
      const maxY = containerRect.height - iconHeight;

      const initialData = {
        x: Math.max(0, Math.min(maxX, Math.random() * maxX)),
        y: Math.max(0, Math.min(maxY, Math.random() * maxY)),
        xSpeed: getRandomSpeed(),
        ySpeed: getRandomSpeed(),
      };

      icon.style.position = 'absolute';
      icon.style.width = `${iconWidth}px`;
      icon.style.height = `${iconHeight}px`;
      icon.style.left = `${initialData.x}px`;
      icon.style.top = `${initialData.y}px`;
      icon.dataset.movement = JSON.stringify(initialData);
      icon.dataset.initialized = 'true';
    });

    animationFrameId.current = requestAnimationFrame(updatePositions);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [size]);

  return (
    <div ref={containerRef} className={styles.container}>
      {svgIcons.map((icon, index) => (
        <img
          key={index}
          ref={el => iconRefs.current[index] = el}
          src={icon}
          alt={`Programming icon ${index}`}
          className={styles.icon}
          loading="lazy"
        />
      ))}
    </div>
  );
};

FloatingIcons.propTypes = {
  size: PropTypes.number,
};
