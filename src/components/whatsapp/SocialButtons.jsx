import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaTiktok, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './SocialButtons.css';

const SocialButtons = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showWhatsappMessage, setShowWhatsappMessage] = useState(false);
  const phoneNumber = '+51927987259'; 
  const whatsappMessage = encodeURIComponent('¡Hola! Me gustaría conocer más sobre los productos de Naviri.');
  
  const handleWhatsappClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/navi_natubelleza', '_blank');
  };

  const handleTiktokClick = () => {
    window.open('https://www.tiktok.com/@natubellezanavi26', '_blank');
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div className="social-buttons-container">
      {showButtons && (
        <>
          <button 
            className="social-button tiktok-button"
            onClick={handleTiktokClick}
            aria-label="Visitar TikTok"
          >
            <FaTiktok />
            <span className="tooltip">TikTok</span>
          </button>
          
          <button 
            className="social-button instagram-button"
            onClick={handleInstagramClick}
            aria-label="Visitar Instagram"
          >
            <FaInstagram />
            <span className="tooltip">Instagram</span>
          </button>
        </>
      )}
      
      <button 
        className="social-button toggle-button"
        onClick={toggleButtons}
        aria-label="Mostrar redes sociales"
      >
        {showButtons ? <FaChevronDown /> : <FaChevronUp />}
      </button>
      
      <div className="whatsapp-container" 
           onMouseEnter={() => setShowWhatsappMessage(true)}
           onMouseLeave={() => setShowWhatsappMessage(false)}>
        {showWhatsappMessage && (
          <div className="whatsapp-message">
            <p>¿Buscas productos naturales de calidad? ¡Chatea con nosotros ahora!</p>
          </div>
        )}
        <button 
          className="social-button whatsapp-button"
          onClick={handleWhatsappClick}
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp />
        </button>
      </div>
    </div>
  );
};

export default SocialButtons;