import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DevGif from '../../assets/images/myJourney/DevGif.gif';
import cardsData from "./data/MyJourneyData.json";
import styles from "./styles/MyJourney.module.scss";

const images = import.meta.glob("../../assets/images/myJourney/*");

const MyJourney = () => {
  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardsContainerRef = useRef(null);
  const expandedContentRef = useRef(null);

  const loadImages = useCallback(async () => {
    try {
      const loadedCards = await Promise.all(
        cardsData.map(async (card) => {
          const imageLoader = images[`../../assets/images/myJourney/${card.img}`];
          const img = imageLoader ? (await imageLoader()).default : card.img;
          return { ...card, img };
        })
      );
      setCards(loadedCards);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeCard) {
        handleClose(e);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCard]);

  const handleCardClick = useCallback((card) => {
    setActiveCard(card);
    setIsAnimating(true);

    const cardsContainer = cardsContainerRef.current;
    const cardElement = document.querySelector(`[data-card-id="${card.id}"]`);

    if (cardElement && cardsContainer) {
      const cardRect = cardElement.getBoundingClientRect();
      const containerRect = cardsContainer.getBoundingClientRect();

      const position = {
        top: cardRect.top - containerRect.top + cardsContainer.scrollTop,
        left: cardRect.left - containerRect.left,
        width: cardRect.width,
        height: cardRect.height
      };

      setExpandedCard({ ...card, position });

    }
  }, []);

  const handleClose = useCallback((e) => {
    setActiveCard(null);
  }, []);

  const renderCardBar = () => (
    <div
      className={styles.showCardsBar}
      onClick={() => setShowCards(!showCards)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setShowCards(!showCards)}
      aria-label="Mostrar tarjetas"
    >
      <span className={styles.showCardsLabel}>
        {showCards ? 'Volver' : 'Mostrar Recorrido'}
      </span>
    </div>
  );

  return (
    <div className={styles.myJourneyMain}>
      <div className={styles.myJourneyContainer} role="region" aria-label="My Journey">
        <header className={styles.header}>
          <h1 className={styles.title}>MI EXPERIENCIA</h1>
        </header>
        {!showCards ? (
          <div className={styles.myJourneySection}>
            <div className={styles.introImageContainer}>
              <img className={styles.introImg} src={DevGif} alt="Developer Image" />
            </div>
            <div className={styles.introText}>
              <p className={styles.introTextP}>
                A lo largo de mi trayectoria como desarrollador, he tenido la oportunidad de colaborar en diversas empresas, participando en el mantenimiento y evolución de productos que van desde sistemas ERP hasta software especializado en la gestión de teatros.</p>
              <p>
                Esta experiencia con productos tan variados me ha llevado a comprender que lo más importante es lograr que cada solución esté diseñada para facilitar al máximo los procesos del usuario, tanto en términos operativos como en la experiencia de uso. Por ello, en los últimos tiempos me he enfocado en fortalecer mis conocimientos en desarrollo frontend, ya que es en la interfaz donde ocurre el primer contacto entre el usuario y la aplicación, y donde se define en gran medida su satisfacción.
              </p>
            </div>
            {renderCardBar()}
          </div>
        ) : (
          <div className={styles.myJourneySection}>
            {renderCardBar()}
            <div
              className={`${styles.cards} ${activeCard ? styles.hasExpandedCard : ''}`}
              ref={cardsContainerRef}
              role="list"
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  data-card-id={card.id}
                  className={`${styles.card} ${activeCard?.id === card.id ? styles.activeCard : ''} ${isAnimating ? styles.animating : ''}`}
                  onClick={() => handleCardClick(card)}
                  role="listitem"
                  tabIndex={0}
                  aria-expanded={activeCard?.id === card.id}
                  onKeyDown={(e) => e.key === "Enter" && handleCardClick(card)}
                >
                  <div className={styles['card-inner']}>
                    <img
                      src={card.img}
                      className={styles['card-image']}
                      alt={card.company}
                      loading="lazy"
                    />
                    <h2 className={styles['card-name']}>{card.company}</h2>
                    <p className={styles['card-mode']}>{card.mode}</p>
                  </div>

                  <div className={styles['card-overlay']}>
                    {card.stats.map((stat, index) => (
                      <React.Fragment key={index}>
                        <div className={styles['card-stat']}>
                          <span className={styles['card-stat-label']}>{stat.label}</span>
                          <span className={styles['card-stat-value']}>{stat.value}/100</span>
                        </div>
                        <div className={styles['card-stat-bar']}>
                          <div
                            className={styles['card-stat-fill']}
                            style={{ "--fill-percent": `${stat.value}%` }}
                            aria-valuenow={stat.value}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </React.Fragment>
                    ))}
                    <div className={styles['card-time']}>{card.time}</div>
                  </div>
                </div>
              ))}

              <AnimatePresence>
                {activeCard && (
                  <motion.div
                    ref={expandedContentRef}
                    className={styles.expandedContent}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, easing: "ease-in-out" }}
                  >
                    <div className={styles.expandedCardInner}>
                      <div className={styles['expandedCard-leftSection']}>
                        <div className={styles['expandedCard-inner']}>
                          <img
                            src={expandedCard.img}
                            className={styles['expandedCard-image']}
                            alt={expandedCard.company}
                          />
                          <h2 className={styles['expandedCard-name']}>{expandedCard.company}</h2>
                          <p className={styles['expandedCard-mode']}>{expandedCard.mode}</p>
                        </div>

                        <div className={styles['expandedCard-overlay']}>
                          {expandedCard.stats.map((stat, index) => (
                            <React.Fragment key={index}>
                              <div className={styles['expandedCard-stat']}>
                                <span className={styles['expandedCard-stat-label']}>{stat.label}</span>
                                <span className={styles['expandedCard-stat-value']}>{stat.value}/100</span>
                              </div>
                              <div className={styles['expandedCard-stat-bar']}>
                                <div
                                  className={styles['expandedCard-stat-fill']}
                                  style={{ "--fill-percent": `${stat.value}%` }}
                                  aria-valuenow={stat.value}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </React.Fragment>
                          ))}
                          <div className={styles['expandedCard-time']}>{expandedCard.time}</div>
                        </div>
                      </div>

                      <div className={styles['expandedCard-rightSection']}>
                        <div className={styles['expandedCard-description']}>
                          <p>{expandedCard.description}</p>
                        </div>

                        <div className={styles['expandedCard-achievements']}>
                          <ul>
                            {expandedCard.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        className={styles.closeButton}
                        onClick={handleClose}
                        aria-label="Close card"
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default MyJourney;
