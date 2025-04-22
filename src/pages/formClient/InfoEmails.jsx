import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, Tag, FloatButton, message, Tooltip, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EmailSearch from '../../components/InfoEmailAdmin/EmailSearch';
import { getEmails, createEmail, updateEmail, deleteEmail } from '../../services/emailService';

const InfoEmails = () => {
  const [form] = Form.useForm();
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [emailToDelete, setEmailToDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await getEmails();
        if (response && response.data.length > 0) {
          setEmails(response.data);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
        message.error('Error al cargar los correos');
      }
    }
    fetchEmails();
  }, []);

  const showDeleteConfirm = (email) => {
    setEmailToDelete(email);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteEmail(emailToDelete.id);
      if (response && response.status === 200) {
        setEmails(prev => prev.filter(item => item.id !== emailToDelete.id));
        message.success('Correo eliminado exitosamente');
      }
      setIsDeleteModalVisible(false);
      setEmailToDelete(null);
    } catch (error) {
      console.error("Error al eliminar:", error);
      message.error('Error al eliminar el correo');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const emailData = {
        email: values.email,
        active: values.active
      };

      if (currentEmail) {
        const response = await updateEmail(currentEmail.id, emailData);
        if (response && response.status === 200) {
          setEmails(prev => 
            prev.map(item => 
              item.id === currentEmail.id ? { ...item, ...emailData } : item
            )
          );
          message.success('Correo actualizado exitosamente');
        }
      } else {
        const response = await createEmail(emailData);
        if (response && response.status === 201) {
          setEmails(prev => [...prev, response.data]);
          message.success('Correo agregado exitosamente');
        }
      }
      setIsModalVisible(false);
      form.resetFields();
      setCurrentEmail(null);
    } catch (error) {
      console.error("Error en la operación:", error);
      message.error(error.response?.data?.message || 'Error al procesar la operación');
    }
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
      render: (active) => (
        <Tag color={active ? "green" : "volcano"}>
          {active ? "Activo" : "Inactivo"}
        </Tag>
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
                form.setFieldsValue({
                  email: record.email,
                  active: record.active
                });
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <EmailSearch onSearch={setSearchQuery} />

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

      {/* Modal de edición/creación */}
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

          <Form.Item
            label="Estado"
            name="active"
            initialValue={true}
          >
            <Select>
              <Select.Option value={true}>Activo</Select.Option>
              <Select.Option value={false}>Inactivo</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalVisible(false)}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              {currentEmail ? 'Guardar Cambios' : 'Agregar'}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal
        title="Confirmar eliminación"
        open={isDeleteModalVisible}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setEmailToDelete(null);
        }}
        footer={[
          <Button 
            key="cancel" 
            onClick={() => {
              setIsDeleteModalVisible(false);
              setEmailToDelete(null);
            }}
          >
            Cancelar
          </Button>,
          <Button 
            key="delete" 
            type="primary" 
            danger
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        ]}
      >
        <p>¿Estás seguro que deseas eliminar el correo {emailToDelete?.email}?</p>
        <p>Esta acción no se puede deshacer.</p>
      </Modal>

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