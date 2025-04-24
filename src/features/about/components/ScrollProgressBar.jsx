import React, { useState, useEffect } from 'react';
import '../style/progressBar.css'; // Si lo deseas, puedes incluir los estilos aquí

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const scrollPercent = (currentScroll / totalHeight) * 100;

    setScrollProgress(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
  );
};

export default ScrollProgressBar;