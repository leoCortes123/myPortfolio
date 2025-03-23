import React from 'react';
import '../styles/City.module.scss'; // Importamos el archivo CSS para los estilos

const City = () => {
  return (
    <div className="city">
      {/* Edificio 1 */}
      <div className="building">
        <div className="window"></div>
        <div className="window"></div>
        <div className="window"></div>
      </div>

      {/* Edificio 2 */}
      <div className="building">
        <div className="window"></div>
        <div className="window"></div>
        <div className="window"></div>
      </div>

      {/* Edificio 3 */}
      <div className="building">
        <div className="window"></div>
        <div className="window"></div>
        <div className="window"></div>
      </div>

      {/* Edificio 4 */}
      <div className="building">
        <div className="window"></div>
        <div className="window"></div>
        <div className="window"></div>
      </div>

      {/* Edificio 5 */}
      <div className="building">
        <div className="window"></div>
        <div className="window"></div>
        <div className="window"></div>
      </div>
    </div>
  );
};

export default City;
