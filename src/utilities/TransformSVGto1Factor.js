import { readFileSync, writeFileSync } from 'fs';

// Leer el archivo SVG
const filePath = 'D:/Programacion/VSCode/MyPortfolio_assets/svg_assets/Layer1.svg'; // Asegúrate de que este sea el nombre correcto del archivo
const svgContent = readFileSync(filePath, 'utf-8');

// Factor de escala: 0.39687 -> 1
const scaleFactor = 0.39687;

// Expresión regular para encontrar números en las instrucciones SVG
const numberPattern = /-?\d+(\.\d+)?/g;

// Reemplazar todos los números en las instrucciones SVG
const scaledSvgContent = svgContent.replace(numberPattern, (match) => {
  const scaledValue = scaleValue(match, scaleFactor);
  return scaledValue.toString();
});

// Función para redondear valores al múltiplo más cercano de 1
function scaleValue(value, scaleFactor) {
  return Math.round(parseFloat(value) / scaleFactor);
}

// Guardar el nuevo SVG modificado
const outputFilePath = 'D:/Programacion/VSCode/MyPortfolio_assets/svg_assets/Layer1_F1.svg';
writeFileSync(outputFilePath, scaledSvgContent);

console.log(`El archivo SVG escalado ha sido guardado en: ${outputFilePath}`);
