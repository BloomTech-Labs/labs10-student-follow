import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Image from '../landingPage/LandingImage.jpg';
import Logo from '../landingPage/logo.png';
import '../landingPage/LandingPage.css';
import { OtherNavBar } from '../index.js';

const style = {
  position: 'absolute',
  width: '100%',
  margin: 0,
  padding: 0
};

const LandingPage = props => {
  return (
    <div className="container">
      <div style={style}>
        <OtherNavBar />
        <div className="text">
          <h1>Refreshr</h1>
          <p>
            Send tests to your students over weeks or months. Help them learn
            for the long-term.
          </p>
        </div>
      </div>
      <img className="background-img" alt="image" src={Image} />
    </div>
  );
};

export default withRouter(LandingPage);
