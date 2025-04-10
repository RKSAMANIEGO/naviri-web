import { useEffect, useState } from "react";
import { getAboutUsHome } from "../../services/aboutuseHomeService";
import style from "../../styles/Sectionaboutushome.module.css";

const Sectionaboutushome = () => {
    const [aboutUs, setAboutUs] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAboutUsHome()
            setAboutUs(data)
        }
        fetchData()
    }, [])

    return (
        <div className={style.aboutContainer}>
            {aboutUs ? (
                <div>
                    <h2 className={style.title}>{aboutUs.text_section_one}</h2>
                    <p className={style.subtitle}>{aboutUs.text_section_two}</p>
                    {aboutUs.images ? (
                        <img className={style.image} src={aboutUs.images.url} alt="Imagen about" />
                    ) : (
                        <p>No hay imagenes disponibles</p>
                    )}
                </div>
            ) : (
                <p className={style.textcarg}>Cargando datos..</p>
            )}
        </div>
    );
}

export default Sectionaboutushome