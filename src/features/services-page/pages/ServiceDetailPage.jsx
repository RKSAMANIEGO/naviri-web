import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceById } from '../../../core/services/secServices';
import { LoaderCircle } from 'lucide-react'; 
import { motion } from 'framer-motion'; // Importar motion

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const serviceData = await getServiceById(serviceId);
        if (serviceData && serviceData.data) { 
          setService(serviceData.data);
        } else if (serviceData) { 
          setService(serviceData);
        } else {
          setError('No se pudo encontrar el servicio.');
        }
      } catch (err) {
        setError(err.message || 'Error al cargar los detalles del servicio.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: (i = 0) => ({ // Acepta un índice para escalonar el delay
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: i * 0.2, // Escalona la animación
      },
    }),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoaderCircle className="animate-spin h-12 w-12 text-[#B62A69]" />
        <p className="ml-4 text-lg text-gray-700">Cargando detalles del servicio... ⏳</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-red-600">Error: {error} 😭</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-700">Servicio no encontrado. 📝</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-150 overflow-x-hidden"> 
      {service.image && service.image.url && (
        <motion.div 
          className="w-full h-[50vh] overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={variants}
          custom={0} 
        >
          <img 
            src={service.image.url} 
            alt={service.title} 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#fb64b6] mb-6 font-serif"
          initial="hidden"
          animate="visible"
          variants={variants}
          custom={1}>
          {service.title}
        </motion.h1>
        <motion.p 
          className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl "
          initial="hidden"
          animate="visible"
          variants={variants}
          custom={2}
        >
          {service.description}
        </motion.p>
        
        {service.features && service.features.length > 0 && (
          <motion.div 
            className="mb-8 max-w-md"
            initial="hidden"
            animate="visible"
            variants={variants}
            custom={3} 
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Características:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-left text-base md:text-lg">
              {service.features.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  custom={3 + (index * 0.1)} 
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
        
      </div>
    </div>
  );
};

export default ServiceDetailPage;