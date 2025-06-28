import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from './styles/BtnPxl.module.scss';

export default function BtnPxl({
  size = 1,
  color = '#000000',
  bgColor = 'transparent',
  textColor = '#000000',
  shadowColor,          // Nuevo prop
  fontSize,             // Nuevo prop
  children,
  className,
  style,
  ...props
}) {
  const cornerSize = 5 * size;
  const childDivRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    svgWidth: 0,
    svgHeight: 0
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        if (entry.target === childDivRef.current) {
          setDimensions(prev => ({ ...prev, width, height }));
        } else if (entry.target === svgRef.current) {
          setDimensions(prev => ({
            ...prev,
            svgWidth: Math.max(0, width - (cornerSize * 2)),
            svgHeight: Math.max(0, height - (cornerSize * 2))
          }));
        }
      });
    });

    if (childDivRef.current) observer.observe(childDivRef.current);
    if (svgRef.current) observer.observe(svgRef.current);

    return () => observer.disconnect();
  }, [cornerSize]);

  const generateRectangles = useCallback(() => {
    const s = size;
    const w = dimensions.svgWidth;
    const h = dimensions.svgHeight;

    return [
      { x: cornerSize, y: 0, width: w, height: s }, // Top
      { x: cornerSize, y: h + cornerSize * 2 - s, width: w, height: s }, // Bottom
      { x: 0, y: cornerSize, width: s, height: h }, // Left
      { x: cornerSize * 2 + w - s, y: cornerSize, width: s, height: h }, // Right

      // Esquina superior izquierda
      { x: 3 * s, y: s, width: 2 * s, height: s },
      { x: s, y: 3 * s, width: s, height: 2 * s },
      { x: 2 * s, y: 2 * s, width: s, height: s },

      // Esquina superior derecha
      { x: 5 * s + w, y: s, width: 2 * s, height: s },
      { x: 8 * s + w, y: 3 * s, width: s, height: 2 * s },
      { x: 7 * s + w, y: 2 * s, width: s, height: s },

      // Esquina inferior izquierda
      { x: 3 * s, y: 8 * s + h, width: 2 * s, height: s },
      { x: s, y: 5 * s + h, width: s, height: 2 * s },
      { x: 2 * s, y: 7 * s + h, width: s, height: s },

      // Esquina inferior derecha
      { x: 5 * s + w, y: 8 * s + h, width: 2 * s, height: s },
      { x: 8 * s + w, y: 5 * s + h, width: s, height: 2 * s },
      { x: 7 * s + w, y: 7 * s + h, width: s, height: s }
    ];
  }, [dimensions, size, cornerSize]);

  const generateInternalPath = useCallback(() => {
    const s = size;
    const w = dimensions.svgWidth;
    const h = dimensions.svgHeight;

    if (w <= 0 || h <= 0) return '';

    return [
      `M${cornerSize},0`,
      `h${w}`,
      `v${s}`, `h${2 * s}`, `v${s}`, `h${s}`, `v${s}`, `h${s}`, `v${2 * s}`, `h${s}`,
      `v${h}`,
      `h${-s}`, `v${s * 2}`, `h${-s}`, `v${s}`, `h${-s}`, `v${s}`, `h${-s * 2}`, `v${s}`,
      `h${-w}`,
      `v${-s}`, `h${-2 * s}`, `v${-s}`, `h${-s}`, `v${-s}`, `h${-s}`, `v${-2 * s}`, `h${-s}`,
      `v${-h}`,
      `h${s}`, `v${-s * 2}`, `h${s}`, `v${-s}`, `h${s}`, `v${-s}`, `h${s * 2}`, `v${-s}`
    ].join(' ');
  }, [dimensions, size, cornerSize]);

  const rectangles = useMemo(generateRectangles, [generateRectangles]);
  const internalPath = useMemo(generateInternalPath, [generateInternalPath]);
  const svgClassNames = [styles.svgContainer, className].filter(Boolean).join(' ');

  // Valores por defecto del SCSS:
  const defaultShadowColor = '#f4423c';
  const defaultFontSize = '2rem';

  // Construimos el textShadow en base al color enviado
  const finalShadowColor = shadowColor || defaultShadowColor;
  const spanTextShadow = `
    3px 3px 0 ${finalShadowColor},
    3px 0px 0 ${finalShadowColor},
    -1px -1px 0 ${finalShadowColor},
    1px -1px 0 ${finalShadowColor},
    -1px 1px 0 ${finalShadowColor}
  `;
  const spanFontSize = fontSize || defaultFontSize;

  return (
    <svg
      xmlns="http://www.w3.org/1999/xhtml"
      ref={svgRef}
      preserveAspectRatio="none"
      width="100%"
      height={dimensions.height + (cornerSize * 2)}
      className={svgClassNames}
      style={style}
      {...props}
    >
      <path
        d={internalPath}
        fill={bgColor}
        stroke="none"
      />

      <foreignObject
        x={cornerSize}
        y={size}
        width={dimensions.svgWidth}
        height={dimensions.height + (cornerSize * 2) - (size * 2)}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          className={styles.childrenContent}
          ref={childDivRef}
          style={{ color: textColor }}
        >
          <span
            style={{
              fontSize: spanFontSize,
              textShadow: spanTextShadow,
            }}
          >
            {children}
          </span>
        </div>
      </foreignObject>

      <g>
        {rectangles.map((rect, index) => (
          <rect
            key={`pxl-rect-${index}`}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            fill={color}
          />
        ))}
      </g>
    </svg>
  );
}

BtnPxl.propTypes = {
  color: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  shadowColor: PropTypes.string, // Nuevo prop
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Nuevo prop
  size: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
