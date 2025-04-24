import React from 'react';
import '../style/about.css';
import logoFlores from '../../../assets/image/logo.jpg';
import MisionVisionweb from './MisionVision';
import InfoSection from './InfoSection';
import Clientesgalery from './Gallery';
//import ScrollVelocity from '../components/...';
import ScrollProgressBar from '../components/ScrollProgressBar';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const SobreNosotros = () => {
  return (
    <section className="seccion-sobre-nosotros">
      <p className="beneficios-subtitulo">NUESTROS BENEFICIOS</p>
      <h2 className="titulo-principal">¿POR QUÉ ELEGIRNOS?</h2>
      <p className="descripcion-beneficios">
        Nos comprometemos a brindar a nuestros clientes un servicio excepcional ofreciendo nuestros mejores productos
      </p>

      <div className="bloque-navi">
        <div className="navi-logo">
          <img src={logoFlores} alt="Navi Natubelleza logo" />
        </div>
        <div className="navi-info">
          <h3 className="titulo-navi">¿QUÉ ES NAVI<br />NATUBELLEZA?</h3>
          <p className="texto-navi">
          Navi Natubelleza se dedica a la venta de artículos de belleza femenina, ofreciendo productos de alta calidad para el cuidado personal, 
          maquillaje y accesorios. Nuestro objetivo es ayudar a resaltar la belleza natural de cada mujer con productos innovadores y un servicio excepcional
          </p>
          <div className="botones-contacto">
      <div className="boton pink icono-animado">
        <FaPhoneAlt className="icono" />
        974 584 654
      </div>
      <div className="boton pink icono-animado">
        <FaEnvelope className="icono" />
        about@correo.com
      </div>
    </div>
        </div>
      </div>

      <MisionVisionweb />
      <InfoSection />


      {/* ScrollVelocity para el texto en movimiento
      <ScrollVelocity
        texts={['NAVI 🏵️ NATUBELLEZA']}
        velocity={55}
        numCopies={30}
        className="scroll-text-small" 
      />*/}
      {/* Galería Circular */}
      <Clientesgalery />

      <ScrollProgressBar />
    </section>
  );
};

export default SobreNosotros;
