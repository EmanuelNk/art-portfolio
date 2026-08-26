import React, { useState, useEffect } from 'react';
import './AboutMe.css';
import aboutMePhoto from '../../assets/images/profile.jpeg'; // Import the about me photo
import aboutMeTextURL from '../../assets/text/aboutMe.txt';

function AboutMe() {
  const [aboutMeText, setAboutMeText] = useState('');

  // Fetch the text file content when the component mounts
  useEffect(() => {
    fetch(aboutMeTextURL)
      .then((response) => response.text())
      .then((text) => {
        setAboutMeText(text);
      })
      .catch((error) => {
        console.error('Error fetching the about me text:', error);
      });
  }, []);
  
  return (
    <div className="about-me">
      <div className="about-me-content">
        <div className="about-me-description">
          <h2>About Me</h2>
          {aboutMeText.split(/\r?\n\s*\r?\n/).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="about-me-photo">
          <img src={aboutMePhoto} alt="Profile" />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;