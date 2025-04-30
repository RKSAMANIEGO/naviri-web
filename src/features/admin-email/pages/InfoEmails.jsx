import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, Tag, FloatButton, message, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EmailSearch from '../components/EmailSearch';
import { getEmails, deleteEmail, createEmail } from '../services/emailService';

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
          setFilteredEmails(response.data);
        } else {
          console.error("No emails found");
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    }
    fetchEmails();
  }, []);

  //filtrado
  useEffect(() => {
    if (searchQuery.trim() === '') {
       setFilteredEmails(emails);
    } else {
       const query = searchQuery.toLowerCase();
       const filtered = emails.filter(item => 
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.lastname && item.lastname.toLowerCase().includes(query)) ||
      (item.disctric && item.disctric.toLowerCase().includes(query))
    );
    setFilteredEmails(filtered);
  }
}, [searchQuery, emails]);


// agregar y editar
const handleSubmit = async (values) => {
  try {
    if (currentEmail) {
      //editar
      const updated = emails.map((item) =>
        item.id === currentEmail.id ? { ...item, ...values } : item
      );
      setEmails(updated);
      setFilteredEmails(updated);
      message.success('Registro actualizado');
    } else {
      //nuevo registro
      const response = await createEmail({
        ...values,
        active: 1,
      });
      
      const nuevo = {
        ...response.data,
        id: response.data.id || Math.max(...emails.map(e => e.id), 0) + 1
      };
      
      setEmails(prev => [...prev, nuevo]);
      setFilteredEmails(prev => [...prev, nuevo]);
      message.success('Registro agregado exitosamente');
    }
    
    form.resetFields();
    setIsModalVisible(false);
    setCurrentEmail(null);
    } catch (error) {
      console.error("Error al guardar:", error);
      message.error(error.response?.data?.message || 'Error al guardar el registro');
    }
};

// eliminar
const handleDelete = async (id) => {
  try {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este registro?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteEmail(id);
          const updated = emails.filter((item) => item.id !== id);
          setEmails(updated);
          setFilteredEmails(updated);
          message.success('Registro eliminado correctamente');
        } catch (error) {
          console.error("Error al eliminar:", error);
          message.error('Error al eliminar el registro');
        }
      }
    });
  } catch (error) {
    console.error("Error en confirmación:", error);
  }
};


  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Teléfono",
      dataIndex: "cellphone",
      key: "cellphone",
    },
    {
      title: "Distrito",
      dataIndex: "disctric",
      key: "disctric",
    },
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
      <EmailSearch onSearch={setSearchQuery} />
      {/* Tabla */}
      <Table
        columns={columns}
        dataSource={filteredEmails}
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

      <Modal
        title={currentEmail ? 'Editar registro' : 'Nuevo registro'}
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
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="lastname"
            rules={[{ required: true, message: 'Ingrese el apellido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Teléfono"
            name="cellphone"
            rules={[{ required: true, message: 'Ingrese el teléfono' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Distrito"
            name="disctric"
            rules={[{ required: true, message: 'Ingrese el distrito' }]}
          >
            <Input />
          </Form.Item>

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
        tooltip={<div>Agregar registro</div>}
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