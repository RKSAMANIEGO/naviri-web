import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, FloatButton, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCommentAdmin } from '../../hooks/coment/useComentClient';
import dayjs from 'dayjs';

const { Option } = Select;

const ComentAdminPage = () => {
  const [form] = Form.useForm();
  const {
    comments,
    isModalVisible,
    currentComment,
    showModal,
    handleSubmit,
    columns,
    setIsModalVisible,
    loadComent
  } = useCommentAdmin(form);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadComent(pagination.current);
      if (data) {
        setPagination(prev => ({
          ...prev,
          total: data.total,
        }));
      }
    };
    fetchData();
  }, [pagination.current]);

  const handlePagination = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  return (
    <div className="p-6">

      {/* tabla */}
      <Table
        columns={columns}
        dataSource={comments}
        rowKey="id"
        pagination={false}
        scroll={{ x: true }}
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

      {/* paginación */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Mostrando {(pagination.current - 1) * pagination.pageSize + 1} -
          {Math.min(pagination.current * pagination.pageSize, pagination.total)} de {pagination.total}
        </span>
        <div className="flex gap-2">
          <Button
            disabled={pagination.current === 1}
            onClick={() => handlePagination(pagination.current - 1)}
          >
            Anterior
          </Button>
          <Button
            disabled={pagination.current * pagination.pageSize >= pagination.total}
            onClick={() => handlePagination(pagination.current + 1)}
          >
            Siguiente
          </Button>
        </div>
      </div>

      {/* modal */}
      <Modal
        title={currentComment ? 'Editar Entrada' : 'Nueva Entrada'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Cliente"
            name="name_customer"
            rules={[{ required: true, message: '¡Por favor ingresa el cliente!' }]}
          >
            <Input placeholder="Nombre del cliente" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: '¡Por favor ingresa el email!' }]}
          >
            <Input placeholder="Correo electrónico" />
          </Form.Item>

          <Form.Item
            label="Estado"
            name="estado"
            rules={[{ required: true, message: '¡Por favor selecciona el estado!' }]}
          >
            <Select placeholder="Selecciona un estado">
              <Option value="pendiente">Pendiente</Option>
              <Option value="aprobado">Aprobado</Option>
              <Option value="rechazado">Rechazado</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Fecha"
            name="date"
            rules={[{ required: true, message: '¡Selecciona una fecha!' }]}
          >
            <DatePicker
              onChange={(date) => {
                if (date) {
                  form.setFieldValue('date', date.format('YYYY-MM-DD'));
                } else {
                  form.setFieldValue('date', null);
                }
              }}
              format="YYYY-MM-DD"
              value={form.getFieldValue('date') ? dayjs(form.getFieldValue('date')) : null}
            />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalVisible(false)}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              {currentComment ? 'Guardar Cambios' : 'Crear Entrada'}
            </Button>
          </div>
        </Form>
      </Modal>

      <FloatButton
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        tooltip={<div>Agregar</div>}
        style={{
          backgroundColor: "rgba(255, 107, 188, 1)",
        }}
      />
    </div>
  );
};

export default ComentAdminPage;
