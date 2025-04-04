import { useEffect, useState} from "react";
import { getAboutUs } from "../../services/aboutUseService";
import { Link, ArrowRightCircle, Heart, Youtube } from "lucide-react"; 
import styles from "../../styles/Sectionaboutus.module.css";


  
const sectionaboutus = () => {
  const [aboutUs, setAboutUs] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
        const data = await getAboutUs()
        setAboutUs(data)
    }
    fetchData()
  }, [])


    return (
        <div className={styles.section}>
        {aboutUs ? (
          <>
          <div className={styles.container}>
            <h1 className={styles.title}>Valores de la empresa</h1>
          </div>
          <div className={styles.containerabout}>
            <div className={styles.leftColumn}>
              {aboutUs.images ? (
                <img className={styles.image} src={aboutUs.images.url} alt="Imagen sobre nosotros" />
              ) : (
                <p>No hay imágenes disponibles</p>
              )}
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.mission}>
                <Heart size={35} color="#ff6bbc" />
                <h2>Misión: {aboutUs.mission}</h2>
              </div>
              <div className={styles.vision}>
                <ArrowRightCircle size={35} color="#ff6bbc" />
                <p>Visión: {aboutUs.vision}</p>
              </div>
              <div className={styles.youtube}>
                <Youtube size={30} color="#ff6bbc" />
                <p>Canal de YouTube: <a href={aboutUs.url_yt} target="_blank" rel="noopener noreferrer">{aboutUs.name_yt}</a></p>
              </div>
            </div>
          </div>
          </>
        
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    );

};

export default sectionaboutus