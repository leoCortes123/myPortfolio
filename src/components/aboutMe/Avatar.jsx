import { AnimatedSprite, Application, Assets, Spritesheet } from 'pixi.js';
import React, { useEffect, useRef } from 'react';
import sheet from '../../assets/sprites/Idle.png';
import styles from './styles/Avatar.module.scss';

export default function Avatar({
  scale = 1,
  animationSpeed = 0.1,
  backgroundColor = '#1099bb',
  position = 'center'
}) {
  const appRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const initPixiApp = async () => {
      if (!containerRef.current) return;

      const app = new Application();
      await app.init({
        background: backgroundColor,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        resizeTo: containerRef.current
      });

      appRef.current = app;
      containerRef.current.appendChild(app.canvas);

      const texture = await Assets.load(sheet);

      const atlasData = {
        frames: {
          frame1: { frame: { x: 0, y: 0, w: 128, h: 128 }, sourceSize: { w: 128, h: 128 } },
          frame2: { frame: { x: 128, y: 0, w: 128, h: 128 }, sourceSize: { w: 128, h: 128 } },
          frame3: { frame: { x: 256, y: 0, w: 128, h: 128 }, sourceSize: { w: 128, h: 128 } },
          frame4: { frame: { x: 384, y: 0, w: 128, h: 128 }, sourceSize: { w: 128, h: 128 } },
        },
        meta: {
          format: 'RGBA8888',
          size: { w: 512, h: 128 },
          scale: 1
        },
        animations: {
          idle: ['frame1', 'frame2', 'frame3', 'frame4']
        }
      };

      const spritesheet = new Spritesheet(texture, atlasData);
      await spritesheet.parse();

      const anim = new AnimatedSprite(spritesheet.animations.idle);
      animationRef.current = anim;

      anim.animationSpeed = animationSpeed;
      anim.anchor.set(0.5);
      anim.scale.set(scale);
      anim.play();

      anim.x = app.screen.width / 2;
      anim.y = app.screen.height / 2;

      app.stage.addChild(anim);

      const handleResize = () => {
        if (!animationRef.current || !appRef.current) return;

        animationRef.current.x = appRef.current.screen.width / 2;
        animationRef.current.y = appRef.current.screen.height / 2;

        const container = containerRef.current;
        const spriteRatio = 128 / 128;
        const containerRatio = container.clientWidth / container.clientHeight;

        let newScale = scale;

        if (containerRatio > spriteRatio) {
          newScale = (container.clientHeight * 0.9) / 128;
        } else {
          newScale = (container.clientWidth * 0.9) / 128;
        }

        animationRef.current.scale.set(newScale);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(containerRef.current);

      handleResize();

      return () => {
        resizeObserver.disconnect();
      };
    };

    initPixiApp();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, {
          children: true,
          texture: true,
          baseTexture: true
        });
        appRef.current = null;
      }
      animationRef.current = null;
    };
  }, [backgroundColor, position, scale, animationSpeed]);

  return (
    <div
      ref={containerRef}
      className={styles.canvasContainer}
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: '1/1'
      }}
    />
  );
};
