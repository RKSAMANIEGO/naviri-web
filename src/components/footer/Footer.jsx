import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import styles from "../../styles/footer.module.css";
import logo from '../../assets/image/logo-navi.png';
import { getContact } from "../../services/contactServices";

const Footer = () => {
  const [contact, setContact] = useState({});

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
    <footer className={styles.footer}>
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
            <li><a href="#">Cuidado Facial</a></li>
            <li><a href="#">Maquillaje</a></li>
            <li><a href="#">Cuidado Capilar</a></li>
            <li><a href="#">Fragancias</a></li>
            <li><a href="#">Accesorios</a></li>
          </ul>
        </div>

        <div className={styles.sectionfooter}>
          <h3>Categorías</h3>
          <ul>
            <li><a href="#">Novedades</a></li>
            <li><a href="#">Más vendidos</a></li>
            <li><a href="#">Ofertas</a></li>
            <li><a href="#">Productos Naturales</a></li>
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
      </div>
    </footer>
  );
};

export default Footer;
