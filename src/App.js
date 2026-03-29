import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ArtPortfolio from './components/ArtPortfolio';
import OilsPage from './components/OilsPage/OilsPage';
import OilsGallery from './components/OilsGallery/OilsGallery';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ArtPortfolio />} />
        <Route path="/oils" element={<OilsPage />} />
        <Route path="/oils/minis" element={<OilsGallery category="minis" />} />
        <Route path="/oils/large" element={<OilsGallery category="large" />} />
      </Routes>
    </div>
  );
}

export default App;
