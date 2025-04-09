import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "../../styles/footer.module.css"
import logo from '../../assets/image/logo-navi.png'


const Footer = () => {
  return (
      <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.sectionfooter}>
                <div className={styles.logoContainer}>
                  <img src ={logo} className={styles.logo}/>
                </div>
                <h1 className={styles.footerdescrip}>
                    <p>Tu destino de belleza integral, donde la calidad y los mejores productos
                    se unen para realzar tu belleza natural.</p>
                </h1>
            </div>

            <div className={styles.sectionfooter}>
                <h3>Productos</h3>
                <ul>
                    <li><a href="#">Ciudado Facial</a></li>
                    <li><a href="#">Maquillaje</a></li>
                    <li><a href="#">Ciudado capilar</a></li>
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
                    <li><Link to="/policity">Politicas</Link></li>
                    <li><Link to="/blog">Blogs</Link></li>
                </ul>
            </div>


            <div className={styles.sectionfooter}>
                <h3>Contacto</h3>
                <ul>
                  <li className={styles.contactItem}>
                    <MapPin className={styles.icon} size={18} /> Av. Principal 123, Ciudad
                  </li>
                    <li className={styles.contactItem}>
                      <Phone className={styles.icon} size={18} /> +234 456 789
                    </li>
                    <li className={styles.contactItem}>
                      <Mail className={styles.icon} size={18} /> info@beautyglow.com
                    </li>
                    <li className={styles.contactItem}>
                      <Clock className={styles.icon} size={18} /> Lun-Sáb: 9:00 - 20:00
                    </li>
                </ul>
            </div>
        </div>
      </footer>
    );

};

export default Footer;