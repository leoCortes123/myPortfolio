import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Configuración de paths (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parámetros - USANDO PATHS ABSOLUTOS DIRECTAMENTE
const inputDir = 'C:/Users/Leonardo/Desktop/imagenes';
const outputDir = 'D:/Programacion/VSCode/myPortfolio/src/assets/images/photograph';
const formats = ['webp']; // Formatos de salida
const quality = 85; // Calidad (85 es óptimo para fotos profesionales)
const sizes = [1920]; // Resoluciones responsive

// Crear carpeta output si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true }); // recursive: true crea toda la estructura de directorios necesaria
}

// Procesamiento por lotes
async function processImages() {
  try {
    const files = fs.readdirSync(inputDir);

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

      const filename = path.parse(file).name;

      for (const size of sizes) {
        for (const format of formats) {
          const outputFilename = `${filename}-${size}w.${format}`;
          const outputPath = path.join(outputDir, outputFilename);

          const pipeline = sharp(path.join(inputDir, file))
            .resize(size)
            .sharpen({ sigma: 0.6 }) // Enfoque profesional
            .withMetadata({ orientation: 1 }); // Corrige rotación

          // Configuración por formato
          switch (format) {
            case 'webp':
              await pipeline.webp({
                quality,
                alphaQuality: 90,
                lossless: false
              }).toFile(outputPath);
              break;
            case 'avif':
              await pipeline.avif({
                quality,
                lossless: false
              }).toFile(outputPath);
              break;
          }

          console.log(`✅ Generado: ${outputPath}`);
        }
      }
    }

    console.log('🔥 Procesamiento completado!');
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

// Ejecutar
processImages();
