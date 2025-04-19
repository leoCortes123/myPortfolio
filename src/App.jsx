import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import home from './assets/images/home.png';
import Background from './assets/images/svg/BackGround.jsx';
import AboutMe from './components/aboutMe/AboutMe.jsx';
import Contact from './components/contact/Contact.jsx';
import Home from './components/Home/Home.jsx';
import MyJourney from './components/myJourney/MyJourney.jsx';
import './styles/App.scss';
import NoiseCanvas from './utilities/NoiseCanvas.jsx';


export default function App() {
  const [canvasVisible, setCanvasVisible] = useState(true);

  const toggleCanvasVisibility = () => {
    setCanvasVisible(!canvasVisible);
  };

  const location = useLocation();

  return (
    <div className='main'>
      <button onClick={toggleCanvasVisibility} className='btnFix'>
        {canvasVisible ? 'FIX' : 'BREACK DOWN'}
      </button>
      {canvasVisible && <NoiseCanvas colorMode="oldGrayscale" pixelSize={1} />}

      <Background className='background' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1728 972" />


      <div className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/myJourney" element={<MyJourney />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      {location.pathname !== '/' && (
        <div className='homeButton'>
          <Link to="/"><img src={home} alt="Home" /></Link>
          <span>HOME</span>
        </div>
      )}
    </div>
  );
}
