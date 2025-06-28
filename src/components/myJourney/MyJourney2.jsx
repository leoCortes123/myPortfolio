import { useRef, useState } from 'react';
import styles from "./styles/MyJourney2.module.scss";


const cardsData = [
  {
    title: "Título Card 1",
    detail: "Detalle breve de la card 1",
    expandedContent: (
      <>
        <h2>Contenido Detallado Card 1</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
          nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </>
    ),
  },
  {
    title: "Título Card 2",
    detail: "Detalle breve de la card 2",
    expandedContent: (
      <>
        <h2>Contenido Detallado Card 2</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
          nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </>
    ),
  },
  {
    title: "Título Card 3",
    detail: "Detalle breve de la card 3",
    expandedContent: (
      <>
        <h2>Contenido Detallado Card 3</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
          nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </>
    ),
  },
  {
    title: "Título Card 4",
    detail: "Detalle breve de la card 4",
    expandedContent: (
      <>
        <h2>Contenido Detallado Card 4</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
          nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </>
    ),
  },
  {
    title: "Título Card 5",
    detail: "Detalle breve de la card 5",
    expandedContent: (
      <>
        <h2>Contenido Detallado Card 5</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
          nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </>
    ),
  },
  {
    title: "Título Card 6",
    detail: "Detalle breve de la card 6",
    expandedContent: (
      <>
        <h2>Contenido Detallado Card 6</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
          nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </>
    ),
  },
];

export default function MyJourney2() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [animStyles, setAnimStyles] = useState({});
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const columns = 3;
  const cardHeight = 200;

  const handleExpand = (idx) => {
    if (expandedIndex !== null) return;

    const card = cardsRef.current[idx];
    const container = containerRef.current;
    const rect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const top = rect.top - containerRect.top;
    const left = rect.left - containerRect.left;

    setAnimStyles({
      [idx]: {
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        zIndex: 10,
      },
    });

    // Forzar reflow
    setTimeout(() => {
      setExpandedIndex(idx);
      setAnimStyles((prev) => ({
        ...prev,
        [idx]: {
          ...prev[idx],
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        },
      }));
    }, 10);
  };

  const handleCollapse = (e, idx) => {
    e.stopPropagation();

    const card = cardsRef.current[idx];
    const container = containerRef.current;
    const cards = Array.from(container.children);
    const index = cards.indexOf(card);
    const row = Math.floor(index / columns);
    const col = index % columns;
    const cardWidth = container.offsetWidth / columns;

    setAnimStyles((prev) => ({
      ...prev,
      [idx]: {
        ...prev[idx],
        top: `${row * (cardHeight + 15)}px`,
        left: `${col * (cardWidth + 15)}px`,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
      },
    }));

    setTimeout(() => {
      setExpandedIndex(null);
      setTimeout(() => {
        setAnimStyles({});
      }, 300);
    }, 10);
  };

  return (
    <div className={styles.cardContainer} ref={containerRef}>
      {cardsData.map((card, idx) => {
        const isExpanded = expandedIndex === idx;
        return (
          <div
            key={idx}
            className={`${styles.card} ${isExpanded ? styles["card-expanded"] : ""}`}
            onClick={() => handleExpand(idx)}
            ref={(el) => (cardsRef.current[idx] = el)}
            style={animStyles[idx] || {}}
          >
            <div className={styles["card-header"]}>{card.title}</div>
            <div className={styles["card-detail"]}>{card.detail}</div>
            <div className={styles["card-expanded-content"]}>
              {card.expandedContent}
              <button
                className={styles["close-btn"]}
                onClick={(e) => handleCollapse(e, idx)}
                tabIndex={isExpanded ? 0 : -1}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
