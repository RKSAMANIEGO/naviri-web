import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Modal, Table, Select, FloatButton, DatePicker } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useCommentAdmin } from '../../hooks/coment/useComentAdmin';
import dayjs from 'dayjs';
import CommentSearch from '../../components/ComentsAdmin/ComentAdmin'; // <-- nuevo

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

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);
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

  useEffect(() => {
    const results = comments.filter(comment =>
      comment.name_customer.toLowerCase().includes(searchQuery)
    );
    setFilteredComments(results);
  }, [comments, searchQuery]);

  const handlePagination = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  return (
    <div className="p-6">
      {/* Sección de búsqueda */}
      <CommentSearch onSearch={setSearchQuery} />

      {/* Tabla */}
      <Table
        columns={columns}
        dataSource={filteredComments}
        rowKey="id"
        pagination={false}
        scroll={{ x: true }}
        components={{
          header: {
            cell: (props) => (
              <th {...props} style={{ backgroundColor: 'rgba(255, 241, 249, 1)', fontWeight: 'bold', color: 'rgba(255, 107, 188, 1)' }} />
            )
          }
        }}
      />

      {/* Paginado */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Mostrando {(pagination.current - 1) * pagination.pageSize + 1} - 
          {Math.min(pagination.current * pagination.pageSize, pagination.total)} de {pagination.total}
        </span>
        <div className="flex gap-2">
          <Button disabled={pagination.current === 1} onClick={() => handlePagination(pagination.current - 1)}>
            Anterior
          </Button>
          <Button disabled={pagination.current * pagination.pageSize >= pagination.total} onClick={() => handlePagination(pagination.current + 1)}>
            Siguiente
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={currentComment ? 'Editar Entrada' : 'Nueva Entrada'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Cliente" name="name_customer" rules={[{ required: true, message: '¡Por favor ingresa el cliente!' }]}>
            <Input placeholder="Nombre del cliente" />
          </Form.Item>
          <Form.Item label="Comentario" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Calificación" name="qualification" rules={[{ required: true, message: '¡Por favor ingresa la puntuación!' }]}>
            <Input placeholder="Puntuación del cliente" type="number" />
          </Form.Item>
          <Form.Item label="Fecha" name="date" rules={[{ required: true, message: '¡Selecciona una fecha!' }]}>
            <DatePicker
              onChange={(date) => {
                if (date) {
                  form.setFieldValue('fecha', date.format('YYYY-MM-DD'));
                } else {
                  form.setFieldValue('fecha', null);
                }
              }}
              format="YYYY-MM-DD"
              value={form.getFieldValue('fecha') ? dayjs(form.getFieldValue('fecha')) : null}
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

      {/* Botón flotante */}
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
