import { useEffect, useState } from "react";

import SectionPrincipal from "../components/SectionPrincipal/SectionPrincipal";
import SectionCategorias from "../components/SectionCategorias/SectionCategorias";
import SectionServices from "../components/SectionServices/SectionServices";
import SectionBlog from "../components/SectionBlog/SectionBlog";
import FormularioModal from "../components/modal-anuncio/formulario-modal.jsx";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Verifica si el usuario ya seleccionó "No mostrar de nuevo"
    const dontShow = localStorage.getItem("dontShowModal");
    if (!dontShow) {
      setIsModalOpen(true);
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
