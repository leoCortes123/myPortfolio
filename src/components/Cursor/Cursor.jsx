import { animate, motion } from "motion/react";
import React, { useEffect, useRef } from "react";
import pacman from "../../assets/images/cursors/pacman.gif";

const Cursor = () => {
  const pacmanRef = useRef(null);
  const lastCursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastPacmanSide = useRef("left"); // "left" o "right"
  const lastDirection = useRef("right"); // "left" o "right"
  const moving = useRef(false);
  const moveTimeout = useRef();

  // Offset para que Pacman quede a un costado del cursor
  const OFFSET = 60; // pixeles
  const PACMAN_SIZE = 60;

  useEffect(() => {
    // Inicializa en el centro (con offset a la derecha)
    animate(
      pacmanRef.current,
      {
        x: lastCursorPos.current.x + OFFSET - PACMAN_SIZE / 2,
        y: lastCursorPos.current.y - PACMAN_SIZE / 2,
      },
      { duration: 0 }
    );

    const handleMouseMove = (e) => {
      moving.current = true;
      clearTimeout(moveTimeout.current);

      const { clientX: x, clientY: y } = e;
      const prevX = lastCursorPos.current.x;

      // Detectar dirección
      let direction = "right";
      if (x < prevX) direction = "left";
      lastDirection.current = direction;

      // Offset según dirección: si va a la derecha, Pacman queda a la izquierda; si va a la izquierda, Pacman queda a la derecha
      const offsetX = direction === "right" ? -OFFSET : OFFSET;

      animate(
        pacmanRef.current,
        {
          x: x + offsetX - PACMAN_SIZE / 2,
          y: y - PACMAN_SIZE / 2,
          rotate: direction === "right" ? 0 : 180, // gira la imagen si va a la izquierda
        },
        { duration: 0.23, easing: "ease-out" }
      );

      lastCursorPos.current = { x, y };
      lastPacmanSide.current = direction === "right" ? "left" : "right";

      // Si el cursor se detiene, luego de X ms, Pacman se detiene a su costado
      moveTimeout.current = setTimeout(() => {
        moving.current = false;
        // Pacman se detiene al costado de donde vino
        const staticOffset = lastDirection.current === "right" ? -OFFSET : OFFSET;
        animate(
          pacmanRef.current,
          {
            x: x + staticOffset - PACMAN_SIZE / 2,
            y: y - PACMAN_SIZE / 2,
            rotate: lastDirection.current === "right" ? 0 : 180,
          },
          { duration: 0.18, easing: "ease-out" }
        );
      }, 200); // puedes ajustar el tiempo para detectar "stop"
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(moveTimeout.current);
    };
  }, []);

  return (
    <motion.img
      ref={pacmanRef}
      src={pacman}
      alt="Pacman Cursor"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        pointerEvents: "none",
        zIndex: 9999,
        userSelect: "none",
      }}
      drag={false}
      draggable={false}
    />
  );
};

export default Cursor;
