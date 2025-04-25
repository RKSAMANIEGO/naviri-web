import { useEffect, useState } from "react";

import SectionPrincipal from "../components/SectionPrincipal/SectionPrincipal";
import SectionCategorias from "../components/SectionCategorias/SectionCategorias";
import SectionServices from "../components/SectionServices/SectionServices";
import SectionBlog from "../components/SectionBlog/SectionBlog";
import FormularioModal from "../components/modal-anuncio/formulario-modal.jsx";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Verifica si el usuario seleccionó "No mostrar de nuevo" (persiste entre sesiones)
    const dontShow = localStorage.getItem("dontShowModal");
    
    // Verifica si el usuario ya cerró el modal en esta sesión
    const closedModalThisSession = sessionStorage.getItem("modalClosedThisSession");
    
    // Muestra el modal si no seleccionó "No mostrar de nuevo" y no lo ha cerrado en esta sesión
    if (!dontShow && !closedModalThisSession) {
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Marca que el usuario cerró el modal en esta sesión
    sessionStorage.setItem("modalClosedThisSession", "true");
  };

   return (
      <>
         {isModalOpen && <FormularioModal isOpen={isModalOpen} onClose={handleCloseModal} />}
         <SectionPrincipal/>
         <hr className="text-gray-50"/>
         <div className="max-full mx-auto">
            <SectionCategorias/>
            <SectionServices/>
            <SectionBlog/>
         </div>
      </>
   )
}

export default HomePage;
