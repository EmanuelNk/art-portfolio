import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import GraphiteGallery from './components/GraphiteGallery/GraphiteGallery';
import OilsPage from './components/OilsPage/OilsPage';
import OilsGallery from './components/OilsGallery/OilsGallery';
import AboutPage from './components/AboutPage/AboutPage';
import ContactPage from './components/ContactPage/ContactPage';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/graphite" element={<GraphiteGallery />} />
        <Route path="/oils" element={<OilsPage />} />
        <Route path="/oils/vienna" element={<OilsGallery category="vienna" />} />
        <Route path="/oils/portraits" element={<OilsGallery category="portraits" />} />
        <Route path="/oils/fall" element={<OilsGallery category="fall" />} />
        <Route path="/oils/coffee" element={<OilsGallery category="coffee" />} />
        <Route path="/oils/medium" element={<OilsGallery category="medium" />} />
        <Route path="/oils/minis" element={<OilsGallery category="minis" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
