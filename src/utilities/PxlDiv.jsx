import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from './styles/PxlDiv.module.scss';

export default function PxlDiv({ ...props }) {
    const { size = 1 } = props;

    const cornerSize = 5 * size;

    PxlDiv.propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        children: PropTypes.node,
    };

    const childDivRef = useRef(null);
    const svgRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        svgWidth: 0,
        svgHeight: 0
    });

    useEffect(() => {
        const observers = [];

        if (childDivRef.current) {
            const childObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { width, height } = entry.contentRect;
                    setDimensions(prev => ({
                        ...prev,
                        width,
                        height
                    }));
                }
            });
            childObserver.observe(childDivRef.current);
            observers.push(childObserver);
        }

        if (svgRef.current) {
            const svgObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { width, height } = entry.contentRect;
                    setDimensions(prev => ({
                        ...prev,
                        svgWidth: width - (width > 0 ? (cornerSize * 2) : 0),
                        svgHeight: height - (height > 0 ? (cornerSize * 2) : 0)
                    }));
                }
            });
            svgObserver.observe(svgRef.current);
            observers.push(svgObserver);
        }

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);


    //border pixel
    const rectangles = useMemo(() =>

        [
            { x: cornerSize, y: 0, width: dimensions.svgWidth, height: 1 * size },
            { x: cornerSize, y: dimensions.svgHeight + (cornerSize * 2) - 3, width: dimensions.svgWidth, height: 1 * size },

            { x: 0, y: cornerSize, width: 1 * size, height: dimensions.svgHeight },
            { x: cornerSize * 2 + dimensions.svgWidth - 1 * size, y: cornerSize, width: 1 * size, height: dimensions.svgHeight },

            { x: 3 * size, y: 1 * size, width: 2 * size, height: 1 * size },
            { x: 1 * size, y: 3 * size, width: 1 * size, height: 2 * size },
            { x: 2 * size, y: 2 * size, width: 1 * size, height: 1 * size },
            { x: 5 * size + dimensions.svgWidth, y: 1 * size, width: 2 * size, height: 1 * size },
            { x: 8 * size + dimensions.svgWidth, y: 3 * size, width: 1 * size, height: 2 * size },
            { x: 7 * size + dimensions.svgWidth, y: 2 * size, width: 1 * size, height: 1 * size },
            { x: 3 * size, y: 8 * size + dimensions.svgHeight, width: 2 * size, height: 1 * size },
            { x: 1 * size, y: 5 * size + dimensions.svgHeight, width: 1 * size, height: 2 * size },
            { x: 2 * size, y: 7 * size + dimensions.svgHeight, width: 1 * size, height: 1 * size },
            { x: 5 * size + dimensions.svgWidth, y: 8 * size + dimensions.svgHeight, width: 2 * size, height: 1 * size },
            { x: 8 * size + dimensions.svgWidth, y: 5 * size + dimensions.svgHeight, width: 1 * size, height: 2 * size },
            { x: 7 * size + dimensions.svgWidth, y: 7 * size + dimensions.svgHeight, width: 1 * size, height: 1 * size }
        ], [dimensions, size, cornerSize]);


    return (
        <svg
            ref={svgRef}
            preserveAspectRatio="none"
            x={0}
            y={0}
            width={'100%'}
            height={dimensions.height + (cornerSize * 2) || '100%'}
            className={styles.svgContainer}
            {...props}
        >
            <foreignObject
                x={cornerSize}
                y={cornerSize}
                width={dimensions.svgWidth - (dimensions.svgWidth > 0 ? (cornerSize * 2) : 0) || '100%'}
                height={dimensions.height || '100%'}
                className={styles.foreignObject}
            >
                <div ref={childDivRef} className={styles.pxlContent} >
                    {props.children}
                </div>
            </foreignObject>

            <g>
                {rectangles.map((rect, index) => (
                    <rect key={index} x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill="#000000" />
                ))}
            </g>

        </svg>
    );
}
