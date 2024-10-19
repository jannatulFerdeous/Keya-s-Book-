import React, { useState, useEffect } from 'react';
import bg3 from '../../../assets/image/bg1.png';
import bg2 from '../../../assets/image/bg2.jpg';
import bg1 from '../../../assets/image/bg3.jpg';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(bg1);
  const images = [bg1, bg2, bg3]; 
  const changeInterval = 3000; 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prevBg) => {
        const currentIndex = images.indexOf(prevBg);
        const nextIndex = (currentIndex + 1) % images.length; 
        return images[nextIndex];
      });
    }, changeInterval);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div
      className="h-screen w-full flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${currentBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} id="home"
    >
      <div className="p-4">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Website</h1>
        <p className="mt-4 text-lg md:text-xl">We are glad to have you here.</p>
        <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-800 transition-colors text-white rounded-lg">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
