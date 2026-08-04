// import React from 'react'
import './Hero.css';
import handIcon from '../Assets/hand_icon.png'; 
import arrowIcon from '../Assets/arrow.png';
import heroImage from '../Assets/hero_image.png'; 

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={handIcon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrowIcon} alt="" />
        </div>
      </div>
      <div className="hero-right">
    <img src={heroImage} alt="" />
      </div>
    </div>
  )
}
