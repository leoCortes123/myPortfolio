import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/PixelGenerator.module.scss';

// Utility Functions
const getRandomInt = (min, max) => {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);
  return Math.floor(Math.random() * (intMax - intMin)) + intMin;
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ];
  } else {
    throw new Error(`String "${hex}" is not a valid hexadecimal color`);
  }
};

const colorPixel = (data, index, color, opacity = 255) => {
  if (color[3] !== undefined) {
    opacity = color[3];
  }
  data[index] = color[0];
  data[index + 1] = color[1];
  data[index + 2] = color[2];
  data[index + 3] = opacity;
};

const scaleImageData = (sourceImageData, destImageData, factor) => {
  const sourceDataWidth = sourceImageData.width;
  const widthScaled = sourceDataWidth * factor;
  const heightScaled = sourceImageData.height * factor;
  const imageDataData = sourceImageData.data;
  const destWidth = destImageData.width;
  const destData = destImageData.data;

  let scaledPixelBaseIndex = 0;
  let color = new Uint8ClampedArray(4);
  for (let y = 0; y < heightScaled; y += 1) {
    scaledPixelBaseIndex = destWidth * y * 4;
    for (let x = 0; x < widthScaled; x += 1) {
      if (x % factor === 0) {
        let sourcePixelBaseIndex = 4 * ((sourceDataWidth * Math.floor(y / factor)) + Math.floor(x / factor));
        color[0] = imageDataData[sourcePixelBaseIndex];
        color[1] = imageDataData[sourcePixelBaseIndex + 1];
        color[2] = imageDataData[sourcePixelBaseIndex + 2];
        color[3] = imageDataData[sourcePixelBaseIndex + 3];
      }
      colorPixel(destData, scaledPixelBaseIndex, color);
      scaledPixelBaseIndex += 4;
    }
  }
  return destImageData;
};

const drawNoisyGradient = (ctx, width, height, orientation, colorStops) => {
  if (orientation !== 'vertical') {
    throw new Error('Only orientation "vertical" is supported.');
  }
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const dataLength = data.length;

  for (let i = 0; i < dataLength; i += 4) {
    const yPos = Math.floor((i / 4) / width);
    const yAbs = yPos / height;
    let color = [0, 0, 0];
    if (yAbs <= colorStops[0][0]) {
      color = colorStops[0][1];
    } else if (yAbs > colorStops[1][0]) {
      color = colorStops[1][1];
    } else {
      const localYAbs = (yAbs - colorStops[0][0]) / (colorStops[1][0] - colorStops[0][0]);
      color = Math.random() > localYAbs ? colorStops[0][1] : colorStops[1][1];
    }
    data[i] = color[0];
    data[i + 1] = color[1];
    data[i + 2] = color[2];
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
};

const draw = (ctx, width, height, options) => {
  const scaleFactor = options.scaleFactor;
  const scaledWidth = Math.floor(width / scaleFactor);
  const scaledHeight = Math.floor(height / scaleFactor);

  const gradientDefinition = [
    [0.3, options.topColor],
    [0.7, options.bottomColor],
  ];
  drawNoisyGradient(ctx, scaledWidth, scaledHeight, 'vertical', gradientDefinition);

  const scaledImage = scaleImageData(ctx.getImageData(0, 0, scaledWidth, scaledHeight), new window.ImageData(width, height), scaleFactor);
  ctx.putImageData(scaledImage, 0, 0);
};

// Main Component
const PixelGenerator = () => {
  // States
  const [canvasWidth, setCanvasWidth] = useState(1080);
  const [canvasHeight, setCanvasHeight] = useState(1920);
  const [scaleFactor, setScaleFactor] = useState(8);
  const [topColor, setTopColor] = useState('#9bff4f');
  const [bottomColor, setBottomColor] = useState('#b429be');

  // Ref
  const canvasRef = useRef(null);

  // Draw initial gradient on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    draw(ctx, canvas.width, canvas.height, {
      scaleFactor: 8,
      topColor: [155, 255, 79],
      bottomColor: [180, 41, 190]
    });
    // eslint-disable-next-line
  }, []);

  // Handlers
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = Number(canvasWidth);
    const h = Number(canvasHeight);

    canvas.width = w;
    canvas.height = h;
    draw(ctx, w, h, {
      scaleFactor: Number(scaleFactor),
      topColor: hexToRgb(topColor),
      bottomColor: hexToRgb(bottomColor)
    });
  };

  // Render
  return (
    <div className={styles.pixelGeneratorContainer}>
      <form className={styles.gradientControls} onSubmit={handleCustomSubmit}>
        <fieldset className={styles.customControls} style={{ display: 'block' }}>
          <legend>Customize Your Gradient</legend>
          <div className={styles.flexContainer}>
            <table>
              <tbody>
                <tr>
                  <td><label htmlFor="input-canvas-width">Width (pixels)</label></td>
                  <td>
                    <input
                      type="number"
                      id="input-canvas-width"
                      value={canvasWidth}
                      min={1}
                      step={1}
                      pattern="\d*"
                      onChange={(e) => setCanvasWidth(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="input-canvas-height">Height (pixels)</label></td>
                  <td>
                    <input
                      type="number"
                      id="input-canvas-height"
                      value={canvasHeight}
                      min={1}
                      step={1}
                      pattern="\d*"
                      onChange={(e) => setCanvasHeight(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="input-scale-factor">Pixel Size</label></td>
                  <td>
                    <input
                      type="number"
                      id="input-scale-factor"
                      value={scaleFactor}
                      min={1}
                      step={1}
                      pattern="\d*"
                      onChange={(e) => setScaleFactor(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td><label htmlFor="input-top-color">Top Color</label></td>
                  <td>
                    <input
                      type="color"
                      id="input-top-color"
                      value={topColor}
                      onChange={(e) => setTopColor(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="input-bottom-color">Bottom Color</label></td>
                  <td>
                    <input
                      type="color"
                      id="input-bottom-color"
                      value={bottomColor}
                      onChange={(e) => setBottomColor(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <input type="submit" value="Generate" className={styles.generateButton} />
        </fieldset>
      </form>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className={styles.gradientCanvas}
        style={{ maxWidth: '400px', width: '100%' }}
      />
    </div>
  );
};

export default PixelGenerator;
