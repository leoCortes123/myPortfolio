import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'D:/Programacion/VSCode/myPortfolio/src/assets/images/gifs'; // carpeta de entrada
const outputDir = 'D:/Programacion/VSCode/myPortfolio/src/assets/images/gifs2'; // carpeta de salida
await fs.mkdir(outputDir, { recursive: true });

const files = await fs.readdir(inputDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const inputPath = path.join(inputDir, file);

  if (ext !== '.gif' && ext !== '.webp') continue;

  const image = sharp(inputPath, { animated: ext === '.gif' });

  try {
    const metadata = await image.metadata();
    let resizeOptions = {};

    if (metadata.width > metadata.height) {
      // Horizontal
      resizeOptions = { height: 250 };
    } else if (metadata.height > metadata.width) {
      // Vertical
      resizeOptions = { width: 250 };
    } else {
      // Cuadrada
      resizeOptions = { width: 250, height: 250 };
    }

    const outputFileName = path.basename(file, ext) + '.webp';
    const outputPath = path.join(outputDir, outputFileName);

    await image
      .resize(resizeOptions)
      .webp({ quality: 90, effort: 4 }) // calidad alta
      .toFile(outputPath);

    console.log(`✅ Procesado: ${file} → ${outputFileName}`);
  } catch (err) {
    console.error(`❌ Error procesando ${file}:`, err);
  }
}
