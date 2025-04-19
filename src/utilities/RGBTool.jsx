import React, { useState } from "react";
import styles from "../styles/RGBTool.module.scss";

const getComplementaryColor = (r, g, b) => {
  return [255 - r, 255 - g, 255 - b];
};

const generateGradientSteps = (startColor, endColor, steps) => {
  const gradient = [];
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * ratio);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * ratio);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * ratio);
    gradient.push(`rgb(${r}, ${g}, ${b})`);
  }
  return gradient;
};

const rgbToHex = (r, g, b) => {
  const toHex = (value) => value.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export default function RGBTool() {
  const [colorInput, setColorInput] = useState("#ff0000");
  const [stepsInput, setStepsInput] = useState(5);
  const [gradientColors, setGradientColors] = useState([]);

  const handleGenerate = () => {
    const rgbArray = [
      parseInt(colorInput.slice(1, 3), 16),
      parseInt(colorInput.slice(3, 5), 16),
      parseInt(colorInput.slice(5, 7), 16),
    ];

    const complementaryColor = getComplementaryColor(...rgbArray);
    const steps = Math.max(2, stepsInput);
    const gradient = generateGradientSteps(rgbArray, complementaryColor, steps);
    setGradientColors(gradient);
  };

  return (
    <div className={styles.RGBTool}>
      <h3>Herramienta de Paleta de Colores</h3>
      <div className={styles.inputContainer}>
        <label>
          Selecciona un Color:
          <input
            type="color"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.inputContainer}>
        <label>
          Número de Pasos:
          <input
            type="number"
            value={stepsInput}
            onChange={(e) => setStepsInput(parseInt(e.target.value, 10))}
            min="2"
          />
        </label>
      </div>
      <button onClick={handleGenerate}>Generar Paleta</button>
      <div className={styles.colorPalette}>
        {gradientColors.map((color, index) => {
          const rgbValues = color.match(/\d+/g).map(Number);
          const hexCode = rgbToHex(...rgbValues);
          return (
            <div
              key={index}
              className={styles.colorBlock}
              style={{ backgroundColor: color }}
            >
              <span className={styles.colorCode}>{hexCode}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
