import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/Tetris.module.scss';

const tetrominos = [
  // I
  [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
  // O
  [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  // T
  [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  // L
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  // J
  [{ x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  // S
  [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
  // Z
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
];

const colors = ['#FF3B3F', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#00BCD4', '#FFC107'];

function getRandomTetromino() {
  const shape = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return { shape, color };
}

export default function Tetris() {
  const [pieces, setPieces] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const { shape, color } = getRandomTetromino();
      const startX = Math.random() * (containerRef.current.offsetWidth - 80);
      const id = Date.now();

      setPieces((prev) => [
        ...prev,
        {
          id,
          shape,
          color,
          x: startX,
          y: -80,
          steps: 0,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setPieces((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y + 40,
            steps: p.steps + 1,
          }))
          .filter((p) => p.y < containerRef.current.offsetHeight)
      );
    }, 500);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className={styles.tetrisContainer} ref={containerRef}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={styles.tetromino}
          style={{
            top: piece.y,
            left: piece.x,
            color: piece.color,
          }}
        >
          {piece.shape.map((block, idx) => (
            <div
              key={idx}
              className={styles.block}
              style={{
                gridColumnStart: block.x + 1,
                gridRowStart: block.y + 1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
