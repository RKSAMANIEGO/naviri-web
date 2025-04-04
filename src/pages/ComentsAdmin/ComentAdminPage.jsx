import React, { useState } from 'react';
import { Form, Input, Button, Upload, Modal, Table, Select, FloatButton, DatePicker } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useCommentAdmin } from '../../hooks/coment/useComentAdmin'; 
const { Option } = Select;
import dayjs from 'dayjs';


const ComentAdminPage = () => {
  const [form] = Form.useForm();
  const {
    comments,
    isModalVisible,
    currentBlog,
    showModal,
    handleSubmit,
    columns,
    setIsModalVisible,
  } = useCommentAdmin(form);


  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Cantidad de items por página

  const paginatedBlogs = comments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

 

  return (
    <div className="p-6">

      {/* tabla */}
      <Table
        columns={columns}
        dataSource={paginatedBlogs}
        rowKey="id"
        pagination={false}
        scroll={{ x: true }}
        components={{
          header: {
            cell: (props) => (
              <th {...props} style={{ backgroundColor: 'rgba(255, 241, 249, 1)'
                , fontWeight: 'bold' , color: 'rgba(255, 107, 188, 1)'}}/>
            )
          }
        }}
      />

      {/* seccion de paginado */}
      <div className="flex justify-end gap-2 mt-4">
        <Button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Anterior
        </Button>
        <Button 
          disabled={currentPage * pageSize >= comments.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>

      {/* modal para editar y registrar */}

      <Modal
        title={currentBlog ? 'Editar Entrada' : 'Nueva Entrada'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Cliente"
            name="cliente"
            rules={[{ required: true, message: '¡Por favor ingresa el cliente' }]}
          >
            <Input placeholder="Nombre del cliente" />
          </Form.Item>

          <Form.Item label="Comentario" name="comentario">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Calificacion"
            name="calificacion"
            rules={[{ required: true, message: '¡Por favor ingresa el cliente' }]}
          >
            <Input placeholder="Puntuacion del cliente" type='number' />
          </Form.Item>


          <Form.Item
  label="Fecha"
  name="fecha"
  rules={[{ required: true, message: '¡Selecciona una fecha!' }]}
>
  <DatePicker 
    onChange={(date) => form.setFieldValue('fecha', date)} 
    value={form.getFieldValue('fecha') ? dayjs(form.getFieldValue('fecha')) : null}
  />
</Form.Item>


        

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalVisible(false)}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              {currentBlog ? 'Guardar Cambios' : 'Crear Entrada'}
            </Button>
          </div>
        </Form>
      </Modal>

      <FloatButton 
          icon={<PlusOutlined/>} 
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