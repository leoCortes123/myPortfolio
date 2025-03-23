import React, { useState } from 'react';
import Background from './assets/images/svg/BackGround.jsx';
import Home from './components/Home/Home.jsx';
import './styles/App.scss';
import NoiseCanvas from './utilities/NoiseCanvas.jsx';


export default function App() {
  const [colorMode, setColorMode] = useState('oldGrayscale');
  const [pixelSize, setPixelSize] = useState(1);
  const [canvasVisible, setCanvasVisible] = useState(false);

  const toggleCanvasVisibility = () => {
    setCanvasVisible(!canvasVisible);
  };

  return (
    <>
      <div className='main'>

        {/* //TODO: add the logic to animate canvas  */}
        <button type="button" onClick={toggleCanvasVisibility}>
          {canvasVisible ? 'Disable Canvas' : 'Enable Canvas'}
        </button>
        {canvasVisible && <NoiseCanvas colorMode={colorMode} pixelSize={pixelSize} />}


        <Background
          xmlns={"http://www.w3.org/2000/svg"}
          viewBox={"0 0 1728 972"} />

        {/* <div>
          <label>
            Color Mode:
            <select value={colorMode} onChange={(e) => setColorMode(e.target.value)}>
              <option value="oldGrayscale">Old Grayscale</option>
              <option value="newGrayscale">New Grayscale</option>
              <option value="color">Color</option>
            </select>
          </label>
          <label>
            Pixel Size:
            <input
              type="number"
              value={pixelSize}
              min="1"
              max="10"
              onChange={(e) => setPixelSize(parseInt(e.target.value))}
            />
          </label>
        </div> */}

        {/* <RGBTool /> */}
        <div className='main-content'>
          <Home />
          {/* <MyJourney />
          <Contact /> */}
        </div>
      </div>
    </>
  );
}


