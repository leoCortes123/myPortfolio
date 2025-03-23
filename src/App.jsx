import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import HouseIcon from './assets/images/icons/houseIcon1.svg';
import Background from './assets/images/svg/BackGround.jsx';
import AboutMe from './components/aboutMe/AboutMe.jsx';
import Contact from './components/contact/Contact.jsx';
import Home from './components/home/Home.jsx';
import MyJourney from './components/myJourney/MyJourney.jsx';
import './styles/App.scss';
import NoiseCanvas from './utilities/NoiseCanvas.jsx';

export default function App() {
  const [colorMode, setColorMode] = useState('oldGrayscale');
  const [pixelSize, setPixelSize] = useState(1);
  const [canvasVisible, setCanvasVisible] = useState(false);

  const toggleCanvasVisibility = () => {
    setCanvasVisible(!canvasVisible);
  };

  const location = useLocation();

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

        {/* <RGBTool /> */}

        {location.pathname !== '/' && (<div className='homeButton'> <Link to="/"><img src={HouseIcon} alt="About Me" /></Link></div>)}

        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/myJourney" element={<MyJourney />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
