import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";
import styles from "./Footer.module.css";
import logo from '../../../assets/image/logo-navi.png';
import { getContact } from "../../../core/services/contactService";
import { Link } from "react-router-dom";

const Footer = () => {
  const [contact, setContact] = useState({});
  const socialLinks = {
    instagram: "https://www.instagram.com/navi_natubelleza",
    tiktok: "https://www.tiktok.com/@natubellezanavi26",
    whatsapp: "https://wa.me/+51927987259",
    whatsappMessage: "¡Hola! Me gustaría conocer más sobre los productos de Navi Natubelleza.",
    facebook: "https://www.facebook.com/share/1J3jvCRaNW/?mibextid=wwXIfr",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactData = await getContact();
        setContact(contactData);
      } catch (error) {
        console.error("Error al obtener el contacto:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.sectionfooter}>
          <div className={styles.logoContainer}>
            <img src={logo} className={styles.logo} alt="Logo" />
          </div>
          <h1 className={styles.footerdescrip}>
            <p>
              Tu destino de belleza integral, donde la calidad y los mejores productos
              se unen para realzar tu belleza natural.
            </p>
          </h1>
        </div>

        <div className={styles.sectionfooter}>
          <h3>Productos</h3>
          <ul>
            <li><a href="/categories/cuidado capilar">Cuidado Capilar</a></li>
            <li><a href="/categories/cosmeticos">Maquillaje</a></li>
            <li><a href="/categories/Exfoliante Corporal">Cuidado Corporal</a></li>
            <li><a href="/categories/accesorios">Accesorios</a></li>
            <Link to="PreguntasFrecuentes"><li> <li><a href="/PreguntasFrecuentes">Preguntas Frecuentes</a></li></li> </Link>
          </ul>
        </div>

        <div className={styles.sectionfooter}>
          <h3>Categorías</h3>
          <ul>
            <li><a href="/new-products">Novedades</a></li>
            <li><a href="/promotions">Ofertas</a></li>
            <li><a href="/products">Productos Naturales</a></li>
            <li><a href="/policy">Políticas</a></li>
            <li><a href="/blog">Blogs</a></li>
          </ul>
        </div>

        <div className={styles.sectionfooter}>
          <h3>Contacto</h3>
          <ul>
            <li className={styles.contactItem}>
              <MapPin className={styles.icon} size={18} /> {contact.location || 'Av. Principal 123, Ciudad'}
            </li>
            <li className={styles.contactItem}>
              <Phone className={styles.icon} size={18} /> {contact.cellphone || '+234 456 789'}
            </li>
            <li className={styles.contactItem}>
              <Mail className={styles.icon} size={18} /> {contact.email || 'info@beautyglow.com'}
            </li>
            <li className={styles.contactItem}>
              <Clock className={styles.icon} size={18} /> {contact.attention_hours || 'Lun-Sáb: 9:00 - 20:00'}
            </li>
          </ul>
        </div>


        <div className={styles.sectionfooter}>
          <h3>Nuestras redes sociales</h3>
          <div className={styles.socialIcons}>
            <a
              href={socialLinks.instagram}
              className={styles.socialIcon}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip="Síguenos en Instagram"
            >
              <Instagram size={20} />
            </a>
            
            <a
              href={socialLinks.tiktok}
              className={styles.socialIcon}
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip="Síguenos en TikTok"
            >
              <FaTiktok size={20} />
            </a>
            
            <a
              href={`${socialLinks.whatsapp}?text=${encodeURIComponent(socialLinks.whatsappMessage)}`}
              className={styles.socialIcon}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip="Contáctanos por WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>

            <a
              href={`${socialLinks.facebook}?text=${encodeURIComponent}`}
              className={styles.socialIcon}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip="Contáctanos por WhatsApp"
            >
              <FaFacebookF size={20} />
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;