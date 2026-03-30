import React from 'react';
import Header from '../Header/Header';
import AboutMe from '../AboutMe/AboutMe';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <Header />
      <div className="about-page-content">
        <AboutMe />
      </div>
    </div>
  );
}

export default AboutPage;
