import fs from "fs";
import path from "path";
import { parseString } from "xml2js";

const inputDir = "C:/Users/Leonardo/Downloads/svg/";

function createRect(path, pathX, pathY) {
    if (!path?.$?.d) return null;

    const numbers = path.$.d.match(/-?\d+(\.\d+)?/g)?.map(Number);
    if (!numbers || numbers.length < 8) return null;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (let i = 0; i < numbers.length; i += 2) {
        const x = numbers[i] + pathX;
        const y = numbers[i + 1] + pathY;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }

    return {
        key: `${(maxX - minX).toFixed(2)} - ${(maxY - minY).toFixed(2)}`,
        x: minX.toFixed(2),
        y: minY.toFixed(2),
        width: (maxX - minX).toFixed(2),
        height: (maxY - minY).toFixed(2),
        fill: path.$.fill || "black",
        coordenates: [{ x: minX.toFixed(2), y: minY.toFixed(2) }]
    };
}

function convertPathsToRects(svgData, fileName) {
    parseString(svgData, { explicitArray: false }, (err, result) => {
        if (err) {
            console.error("Error al analizar el SVG:", err);
            return;
        }

        if (!result?.svg?.path) {
            console.error("El archivo SVG no contiene un elemento <path>.");
            return;
        }

        let paths = Array.isArray(result.svg.path) ? result.svg.path : [result.svg.path];

        const groupedRects = {};
        const groupedPaths = {};

        paths.forEach(path => {
            if (!path?.$?.d) return;

            const match = path.$.transform?.match(/translate\(([\d.-]+),([\d.-]+)\)/);
            const x = match ? parseFloat(match[1]) || 0 : 0;
            const y = match ? parseFloat(match[2]) || 0 : 0;

            const curveMatches = (path.$.d.match(/c/gi) || []).length;
            if (curveMatches > 4) {
                if (!groupedPaths[path.$.d]) {
                    groupedPaths[path.$.d] = {
                        d: path.$.d,
                        fill: path.$.fill || "black",
                        coordenates: []
                    };
                }
                groupedPaths[path.$.d].coordenates.push({ x, y });
            } else {
                const rect = createRect(path, x, y);
                if (rect) {
                    if (!groupedRects[rect.key]) {
                        groupedRects[rect.key] = {
                            width: rect.width,
                            height: rect.height,
                            fill: rect.fill,
                            coordenates: []
                        };
                    }
                    groupedRects[rect.key].coordenates.push({ x: rect.x, y: rect.y });
                }
            }
        });

        const jsxContent = generateJSXComponent(groupedRects, groupedPaths);
        const outputJSXPath = `${inputDir}${fileName}.jsx`;

        try {
            fs.writeFileSync(outputJSXPath, jsxContent, "utf8");
            console.log(`Archivo JSX guardado como ${outputJSXPath}`);
        } catch (writeErr) {
            console.error("Error al escribir el archivo JSX:", writeErr);
        }
    });
}


function generateJSXComponent(rects, paths) {
    // console.log("rects= ", JSON.stringify(rects, null, 2));
    // console.log("paths= ", JSON.stringify(paths, null, 2));

    let rectIndex = 0;
    let pathIndex = 0;

    const rectElements = Object.entries(rects).map(([key, rect]) => {
        return rect.coordenates.map(cor => (
            `<rect key="rect-${rectIndex++}" x="${cor.x}" y="${cor.y}" width="${rect.width}" height="${rect.height}" fill="${rect.fill}" />`
        )).join("\n");
    }).join("\n");

    const pathElements = Object.entries(paths).map(([key, path]) => {
        return path.coordenates.map(cor => (
            `<path key="path-${pathIndex++}" d="${path.d}" transform="translate(${cor.x},${cor.y})" fill="${path.fill}" />`
        )).join("\n");
    }).join("\n");

    return `import * as React from "react";

export default function Layer1({ ...props }) {
    return (
        <svg preserveAspectRatio="none" style={{ pointerEvents: "none" }} {...props}>
            ${pathElements}
            ${rectElements}
        </svg>
    );
}`;
}


fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error("Error al leer la carpeta:", err);
        return;
    }

    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === ".svg");

    if (svgFiles.length === 0) {
        console.log("No se encontraron archivos SVG en la carpeta.");
        return;
    }

    svgFiles.forEach(file => {
        const filePath = path.join(inputDir, file);

        // if (file != "Layer4.svg") return;

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error al leer el archivo:", file, err);
                return;
            }
            console.log("Convirtiendo el archivo SVG a JSX:", file);

            convertPathsToRects(data, file.split(".")[0]);
        });
    });
});
