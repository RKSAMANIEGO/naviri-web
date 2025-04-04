import { useEffect, useState} from "react";
import { getServices } from "../../services/secServices"
import styles from "../../styles/SectionServices.module.css";

const sectionservices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await getServices();
            setServices(response.data)
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        }
        fetchData();
    }, []);

    return (

        <div className={styles.container}>
         <h1>Servicios especiales</h1>
         <p>Ofrecemos una variedad de servicios para satisfacer tus necesidades.</p>
          <div className={styles.containerCards}>
           {services.map(service => (
            <div key={service.id} className={styles.servicecard}>
             <h3>{service.title}</h3>
             <p>{service.description}</p>
             <ul>
               {service.features.map((feature, index) => (
               <li key={index}>{feature}</li>
               ))}
             </ul>
            {service.image ? <img src={service.image} alt={service.title}/> : null}
          </div>
          ))}
       </div>
     </div>
);

};

export default sectionservices;