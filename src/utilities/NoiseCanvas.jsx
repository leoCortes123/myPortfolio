import React, { useEffect, useRef } from 'react';

export default function NoiseCanvas({ colorMode, pixelSize }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas.getContext('2d');
    let time = 0;
    let intervalId = 0;

    const makeNoise = () => {
      const imgd = context.createImageData(canvas.width, canvas.height);
      const pix = imgd.data;

      for (let y = 0; y < canvas.height; y += pixelSize) {
        for (let x = 0; x < canvas.width; x += pixelSize) {
          const index = (y * canvas.width + x) * 4;
          let color;

          switch (colorMode) {
            case 'color':
              const colors = [
                [255, 0, 0],
                [0, 255, 0],
                [0, 0, 255],
                [255, 255, 255],
              ];
              color = colors[Math.floor(Math.random() * colors.length)];
              break;
            case 'newGrayscale':
              const c = 7 + Math.sin(index / 50000 + time / 7);
              color = [40 * Math.random() * c, 40 * Math.random() * c, 40 * Math.random() * c];
              break;
            case 'oldGrayscale':
            default:
              const gray = Math.random() * 255;
              color = [gray, gray, gray];
              break;
          }

          for (let dy = 0; dy < pixelSize; dy++) {
            for (let dx = 0; dx < pixelSize; dx++) {
              const offset = ((y + dy) * canvas.width + (x + dx)) * 4;
              pix[offset] = color[0];
              pix[offset + 1] = color[1];
              pix[offset + 2] = color[2];
              pix[offset + 3] = 255;
            }
          }
        }
      }

      context.putImageData(imgd, 0, 0);
      time = (time + 1) % canvas.height;
    };

    const setup = () => {
      context = canvas.getContext('2d');
    };

    setup();
    intervalId = setInterval(makeNoise, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, [colorMode, pixelSize]);

  const canvasStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none',
  };

  return <canvas ref={canvasRef} style={canvasStyle} />;
};

