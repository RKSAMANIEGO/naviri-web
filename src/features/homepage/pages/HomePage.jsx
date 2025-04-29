import { useEffect, useState } from "react";

import SectionPrincipal from "../components/SectionPrincipal/SectionPrincipal";
import SectionCategorias from "../components/SectionCategorias/SectionCategorias";
import SectionServices from "../components/SectionServices/SectionServices";
import SectionBlog from "../components/SectionBlog/SectionBlog";
import FormularioModal from "../components/modal-anuncio/formulario-modal.jsx";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Aquí se verifica si ya se mostro el modal
    const modalShownThisSession = sessionStorage.getItem("modalShownThisSession");
    const dontShowEver = localStorage.getItem("dontShowModal");
    
    if (!modalShownThisSession && !dontShowEver) {
      setIsModalOpen(true);
      // Marcar que el modal ya se mostró en esta sesión
      sessionStorage.setItem("modalShownThisSession", "true");
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
