import styles from './Footer.module.css'
import { MapPin, Phone, Mail, Clock, Github } from "lucide-react";
import img from '../assets/image/logo-navi.png'
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Columna de la izquierda - Logo y descripción */}
        <div className={styles.footerColumn}>
          <div className={styles.logoContainer}>
            <img
              src={img}
              alt="Navi Logo"
              width={120}
              height={120}
              className={styles.logo}
            />
          </div>
          <p className={styles.tagline}>
            Tu destino de belleza integral, donde la calidad y los mejores productos se unen para realzar tu belleza natural.
          </p>
        </div>

        {/* Columna de Productos */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Productos</h3>
          <ul className={styles.footerLinks}>
            <li><a href="/productos/cuidado-facial">Cuidado Facial</a></li>
            <li><a href="/productos/maquillaje">Maquillaje</a></li>
            <li><a href="/productos/cuidado-capilar">Cuidado Capilar</a></li>
            <li><a href="/productos/fragancias">Fragancias</a></li>
            <li><a href="/productos/accesorios">Accesorios</a></li>
          </ul>
        </div>

        {/* Columna de Categorías */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Categorías</h3>
          <ul className={styles.footerLinks}>
            <li><a href="/categorias/novedades">Novedades</a></li>
            <li><a href="/categorias/mas-vendidos">Más vendidos</a></li>
            <li><a href="/categorias/ofertas">Ofertas</a></li>
            <li><a href="/categorias/productos-naturales">Productos Naturales</a></li>
          </ul>
        </div>

        {/* Columna de Contacto */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Contacto</h3>
          <ul className={styles.contactInfo}>
            <li>
              <MapPin size={18} className={styles.icon} />
              <span>Av. Principal 123, Ciudad</span>
            </li>
            <li>
              <Phone size={18} className={styles.icon} />
              <span>+123 456 7890</span>
            </li>
            <li>
              <Mail size={18} className={styles.icon} />
              <span>info@beautyglow.com</span>
            </li>
            <li>
              <Clock size={18} className={styles.icon} />
              <span>Lun-Sáb: 9:00 - 20:00</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className={styles.divider}></div>

      {/* Pie de página con copyright */}
      <div className={styles.copyright}>
        <p>© {currentYear} NaviNatubelleza. Todos los derechos reservados.</p>
        <a href="https://github.com/navibeauty" className={styles.socialLink}>
          <Github size={24} />
        </a>
      </div>
    </footer>
  );
}
