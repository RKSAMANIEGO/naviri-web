import { useEffect, useState } from "react";
import { getAboutUsHome } from "../../services/aboutuseHomeService";
import style from "../../styles/Sectionaboutushome.module.css";

const Sectionaboutushome = () => {
    const [aboutUs, setAboutUs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getAboutUsHome();
                setAboutUs(data);
            } catch (error) {
                console.error("Error fetching about us data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className={style.loadingContainer}>
                <div className={style.loadingSpinner}></div>
                <p className={style.loadingText}>Cargando...</p>
            </div>
        );
    }

    return (
        <section id="aboutus" className={style.aboutSection}>
            <div className={style.aboutContainer}>
                {aboutUs ? (
                    <div className={style.aboutContent}>
                        <div className={style.textContent}>
                            <h2 className={style.sectionPreTitle}>Nuestra esencia</h2>
                            <h1 className={style.sectionTitle}>{aboutUs.text_section_one}</h1>
                            <div className={style.divider}></div>
                            <p className={style.sectionDescription}>{aboutUs.text_section_two}</p>
                        </div>
                        
                        {aboutUs.images && (
                            <div className={style.imageContainer}>
                                <img 
                                    className={style.aboutImage} 
                                    src={aboutUs.images.url} 
                                    alt="Sobre nosotros" 
                                />
                                <div className={style.imageOverlay}></div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={style.errorContainer}>
                        <p className={style.errorText}>No se pudieron cargar los datos</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Sectionaboutushome;