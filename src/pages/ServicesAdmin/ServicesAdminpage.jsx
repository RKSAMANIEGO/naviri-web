import React, { useEffect } from 'react';
import { Table, Button, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useServicesAdmin } from '../../hooks/serviceshook/useServicesadmin';
import ServiceForm from './ServiceForm';

const ServicesAdminPage = () => {
  const [form] = Form.useForm();
  const {
    services = [],
    loading = false,
    isModalVisible = false,
    currentService = null,
    pagination = { current: 1, pageSize: 5, total: 0 },
    columns = [],
    loadServices = () => {},
    showModal = () => {},
    handleSubmit = () => {},
    setIsModalVisible = () => {}
  } = useServicesAdmin(form) || {};

  useEffect(() => {
    loadServices();
  }, []);

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', textAlign: 'right' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ backgroundColor: '#ff85c0', borderColor: '#ff85c0' }}
        >
          Agregar Servicio
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={services}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        scroll={{ x: true }}
        components={{
            header: {
              cell: (props) => (
                <th {...props} style={{ 
                  backgroundColor: 'rgb(255, 241, 249)', 
                  color: 'rgb(255, 107, 188)', 
                  fontWeight: 'bold', 
                }} />
              )
            }
          }}
      />

      <Modal
        title={currentService ? 'Editar Servicio' : 'Nuevo Servicio'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <ServiceForm 
          initialValues={currentService} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default ServicesAdminPage;