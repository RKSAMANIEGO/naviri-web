import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, Tag, FloatButton, message, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EmailSearch from '../components/EmailSearch';
import { getEmails } from '../services/emailService';

const InfoEmails = () => {
  const [form] = Form.useForm();
  const [emails, setEmails] = useState([
    { id: 1, email: 'usuario1@empresa.com', estado: 'Activo' },
    { id: 2, email: 'usuario2@empresa.com', estado: 'Inactivo' },
    { id: 3, email: 'usuario3@empresa.com', estado: 'Activo' }
  ]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);

  useEffect(() => {

    const fetchEmails = async () => {
      try {
        const response = await getEmails();
        console.log(response);
        
        if (response && response.data.length > 0) {
          setEmails(response.data);
        } else {
          console.error("No emails found");
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    }
    fetchEmails();
  }, []);


  const handleDelete = (id) => {
    const updated = emails.filter((item) => item.id !== id);
    setEmails(updated);
    message.success('Correo eliminado');
  };

  const handleSubmit = (values) => {
    if (currentEmail) {
      // Editar
      const updated = emails.map((item) =>
        item.id === currentEmail.id ? { ...item, ...values } : item
      );
      setEmails(updated);
      message.success('Correo actualizado');
    } else {
      // Nuevo
      const nuevo = {
        id: emails.length + 1,
        ...values,
        estado: 'Activo'
      };
      setEmails([...emails, nuevo]);
      message.success('Correo agregado');
    }
    form.resetFields();
    setIsModalVisible(false);
    setCurrentEmail(null);
  };

  const columns = [
    {
      title: "Correo electrónico",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Estado",
      dataIndex: "active",
      key: "estado",
      render: (estado) => (
        <Tag color={estado === "Activo" ? "green" : "volcano"}>{estado}</Tag>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* Editar botón primero */}
          <Tooltip title="Editar">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentEmail(record);
                form.setFieldsValue(record);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>

          {/* Eliminar botón después */}
          <Tooltip title="Eliminar">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Buscador */}
      <EmailSearch onSearch={setSearchQuery} />

      {/* Tabla */}
      <Table
        columns={columns}
        dataSource={emails}
        rowKey="id"
        pagination={false}
        components={{
          header: {
            cell: (props) => (
              <th {...props} style={{ 
                backgroundColor: 'rgba(255, 241, 249, 1)', 
                fontWeight: 'bold', 
                color: 'rgba(255, 107, 188, 1)' 
              }} />
            )
          }
        }}
      />

      {/* Modal */}
      <Modal
        title={currentEmail ? 'Editar correo' : 'Nuevo correo'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setCurrentEmail(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[
              { required: true, message: 'Ingrese un correo válido' },
              { type: 'email', message: 'Formato de correo no válido' }
            ]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalVisible(false)}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              {currentEmail ? 'Guardar Cambios' : 'Agregar'}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Botón flotante */}
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Agregar correo</div>}
        onClick={() => {
          setCurrentEmail(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
        style={{ backgroundColor: "#ec4899" }}
      />
    </div>
  );
};

export default InfoEmails;
