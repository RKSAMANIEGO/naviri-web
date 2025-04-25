import React from 'react';
import styles from './ContactPage.module.css';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.contactHeader}>
        <h1>Contáctanos</h1>
        <p>Estamos aquí para ayudarte</p>
      </div>

      <div className={styles.contactContent}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <FaWhatsapp className={styles.icon} />
            <h3>WhatsApp</h3>
            <p>+51 927 987 259</p>
            <a href="https://wa.me/+51927987259" target="_blank" rel="noopener noreferrer">
              Enviar mensaje
            </a>
          </div>

          <div className={styles.infoCard}>
            <FaEnvelope className={styles.icon} />
            <h3>Correo Electrónico</h3>
            <p>info@navinatubelleza.com</p>
            <a href="mailto:info@navinatubelleza.com">Enviar email</a>
          </div>

          <div className={styles.infoCard}>
            <FaMapMarkerAlt className={styles.icon} />
            <h3>Ubicación</h3>
            <p>Lima, Perú</p>
            <a href="https://goo.gl/maps/..." target="_blank" rel="noopener noreferrer">
              Ver en mapa
            </a>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Envíanos un mensaje</h2>
          <form>
            <div className={styles.formGroup}>
              <input type="text" placeholder="Nombre completo" required />
            </div>
            <div className={styles.formGroup}>
              <input type="email" placeholder="Correo electrónico" required />
            </div>
            <div className={styles.formGroup}>
              <input type="tel" placeholder="Teléfono" />
            </div>
            <div className={styles.formGroup}>
              <textarea placeholder="Mensaje" rows="5" required></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;