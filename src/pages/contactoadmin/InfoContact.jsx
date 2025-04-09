import React, { useEffect, useState } from "react";
import { Upload, Button, message, Row, Col, Input } from 'antd';
import { getContact, updateContact } from "../../services/contactServices";


const InfoContact= () => {
  
  const [contact, setcontact] = useState({
    
  });

 

  useEffect(() => {
    const fetchData = async () => {
      const contactData = await getContact();
      setcontact(contactData);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setcontact({ ...contact, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      
  
      const response = await updateContact(contact.id, contact);

      if (response.data) {
        message.success('¡Política actualizada correctamente!');
      }
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || 'Error al actualizar la política');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Políticas de la Empresa</h2>
      <Row gutter={32}>
        {/* Formulario */}

        <Col xs={24} md={12}>
        
          <div className="space-y-4">
           

            <div>
              <label className="block mb-1 font-medium">Locación</label>
              <Input
                name="location"
                rows={2}
                value={contact.location}
                onChange={handleChange}
                
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Celular</label>
              <Input
                name="cellphone"
                rows={2}
                value={contact.cellphone}
                onChange={handleChange}
                
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Correo</label>
              <Input
                name="email"
                rows={2}
                value={contact.email}
                onChange={handleChange}
                
              />
            </div>


            <div>
              <label className="block mb-1 font-medium">Horario de Atención</label>
              <Input
                name="attention_hours"
                rows={2}
                value={contact.attention_hours}
                onChange={handleChange}
                
              />
            </div>

            <div>

            <div className="text-right">
              <Button type="primary" onClick={handleSubmit}>
                Guardar Cambios
              </Button>
            </div>
          </div>
            </div>
        </Col>

        {/* Vista previa */}
        <Col xs={24} md={12}>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-100 min-h-[300px] flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold">{contact.location || 'Título de política'}</h3>
            <p className="my-4">{contact.cellphone || 'Descripción de la política...'}</p>
            <p className="my-4">{contact.email || 'Descripción de la política...'}</p>
            <p className="my-4">{contact.attention_hours || 'Descripción de la política...'}</p>
            
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InfoContact;
