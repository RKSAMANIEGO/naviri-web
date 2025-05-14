import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebookF} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../../features/cart/context/CartContext';
import './SocialButtons.css';

const SocialButtons = () => {
  const [showWhatsappMessage, setShowWhatsappMessage] = useState(false);
  const phoneNumber = '+51927987259'; 
  const whatsappMessage = encodeURIComponent('¡Hola! Me gustaría conocer más sobre los productos de Navi Natubelleza.');
  const location = useLocation();
  const { isCartOpen } = useCart(); 
  

  const hiddenRoutes = ['/admin/panel', '/checkout', 'login', ];
  const shouldHideButtons = hiddenRoutes.some(path => location.pathname.includes(path)) || isCartOpen;
  if (shouldHideButtons) {
    return null;
  }
  
  const handleWhatsappClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/navi_natubelleza', '_blank');
  };

  const handleTiktokClick = () => {
    window.open('https://www.tiktok.com/@natubellezanavi26', '_blank');
  };

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/share/1J3jvCRaNW/?mibextid=wwXIfr', '_blank');
  };




  return (
   <>
     <div className="left-social-buttons">

         <button 
            className="social-button facebook-button"
            onClick={handleFacebookClick}
            aria-label="Visitar TikTok"
          >
          <FaFacebookF />
         </button>
         <button 
            className="social-button instagram-button"
            onClick={handleInstagramClick}
            aria-label="Visitar Instagram"
           >
           <FaInstagram/>
          </button>
        
          <button 
            className="social-button tiktok-button"
            onClick={handleTiktokClick}
            aria-label="Visitar TikTok"
          >
          <FaTiktok />
          </button>
      </div>

      <div className="right-social-buttons">
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
   </>
  );
}


export default SocialButtons;