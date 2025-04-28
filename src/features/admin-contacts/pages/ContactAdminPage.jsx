import React, { useEffect, useState } from "react";
import { Upload, Button, message, Row, Col, Input } from 'antd';
import { getContact, updateContact } from "../services/adminContactsApi"; // Updated path


const ContactAdminPage= () => { // Renamed component

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
      <h2 className="text-5xl font-bold mb-6" style={{ fontFamily: "'Great Vibes', Recursive" }}>Información de la Empresa</h2>
      <Row gutter={32}>
        {/* Formulario */}

        <Col xs={24} md={12}>

          <div className="space-y-4">


            <div>
              <label className="text-3xl block mb-1 font-medium" style={{ fontFamily: "'Great Vibes', Recursive"}}>Locación</label>
              <Input
                name="location"
                rows={2}
                value={contact.location}
                onChange={handleChange}

              />
            </div>
            <div>
              <label className="text-3xl block mb-1 font-medium" style={{ fontFamily: "'Great Vibes', Recursive"}}>Celular</label>
              <Input
                name="cellphone"
                rows={2}
                value={contact.cellphone}
                onChange={handleChange}

              />
            </div>

            <div>
              <label className="text-3xl block mb-1 font-medium" style={{ fontFamily: "'Great Vibes', Recursive"}}>Correo</label>
              <Input
                name="email"
                rows={2}
                value={contact.email}
                onChange={handleChange}
              />
            </div>


            <div>
              <label className="text-3xl block mb-1 font-medium" style={{ fontFamily: "'Great Vibes', Recursive"}}>Horario de Atención</label>
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
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[400px] flex flex-col items-center justify-center text-center">
            <h3 className="text-4xl font-bold"  style={{ fontFamily: "'Great Vibes', Recursive"}}>{contact.location || 'Título de política'}</h3>
            <p className="my-2" >{contact.cellphone || 'Descripción de la política...'}</p>
            <p className="my-2">{contact.email || 'Descripción de la política...'}</p>
            <p className="my-2">{contact.attention_hours || 'Descripción de la política...'}</p>

          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactAdminPage; // Updated export