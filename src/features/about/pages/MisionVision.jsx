import React, { useState, useEffect } from 'react';
import '../style/MisionVision.css';
import CountUp from '../components/countUp';

const InfoSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [aboutUsData, setAboutUsData] = useState({ mission: '', vision: '' });

  useEffect(() => {
    fetch('https://api.navinatubelleza.com/api/about-us')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.mission && data.vision) {
          setAboutUsData({
            mission: data.mission,
            vision: data.vision,
          });
        }
      })
      .catch((error) => {
        console.error('Error al obtener la información de About Us:', error);
      });
  }, []);

  return (
    <div className="info-wrapper">
      <div className="stats-container">
        <div className="stat-box">
          <div className="stat-card">
            <div className="stat-text">
              <h2>
                <CountUp
                  from={0}
                  to={100}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </h2>
              <p>USUARIOS</p>
            </div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-card">
            <div className="stat-text">
              <h2>
                <CountUp
                  from={0}
                  to={50}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </h2>
              <p>PRODUCTOS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="missions">
        <div
          className={`mission-box ${activeCard === 'mision' ? 'active' : ''}`}
          onMouseEnter={() => setActiveCard('mision')}
          onMouseLeave={() => setActiveCard(null)}
          onClick={() => setActiveCard('mision')}
        >
          <div className={`box-content initial-content`}>
            <h3>MISIÓN</h3>
          </div>
          <div className="box-content text-content ">
            <p>{aboutUsData.mission}</p>
          </div>
        </div>

        <div
          className={`mission-box ${activeCard === 'vision' ? 'active' : ''}`}
          onMouseEnter={() => setActiveCard('vision')}
          onMouseLeave={() => setActiveCard(null)}
          onClick={() => setActiveCard('vision')}
        >
          <div className="box-content initial-content">
            <h3>VISIÓN</h3>
          </div>
          <div className="box-content text-content">
            <p>{aboutUsData.vision}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
