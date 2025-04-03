import React, { useState } from 'react';
import { Form, Input, Button, Upload, Modal, Table, Select, FloatButton } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useBlogAdmin } from '../../hooks/blog/useBlogAdmin'; 
const { Option } = Select;

const BlogAdminPage = () => {
  const [form] = Form.useForm();
  const {
    blogs,
    isModalVisible,
    currentBlog,
    showModal,
    handleSubmit,
    columns,
    setIsModalVisible,
  } = useBlogAdmin(form);


  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Cantidad de items por página

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage){
        message.error('Solo se permiten imágenes!');
      }
      return isImage ? false : Upload.LIST_IGNORE;
    },
    listType: 'picture-card',
    maxCount: 1,
    showUploadList: {
      showPreviewIcon: false,
      showRemoveIcon: true,
    },
  };

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
          disabled={currentPage * pageSize >= blogs.length}
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
            label="Título"
            name="titulo"
            rules={[{ required: true, message: '¡Por favor ingresa el título!' }]}
          >
            <Input placeholder="Título del blog" />
          </Form.Item>

          <Form.Item label="Descripción" name="descripcion">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Categoría"
            name="categoria"
            rules={[{ required: true, message: '¡Selecciona una categoría!' }]}
          >
            <Select placeholder="Selecciona una categoría">
              <Option value="Tutoriales">Tutoriales</Option>
              <Option value="Tecnología">Tecnología</Option>
              <Option value="Desarrollo">Desarrollo</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Imagen"
            name="imagen"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
            rules={[{ required: true, message: '¡Debes subir una imagen!' }]}
          >
            <Upload {...uploadProps}>
              <div>
                <UploadOutlined />
                <p>Haz clic o arrastra para subir</p>
              </div>
            </Upload>
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

export default BlogAdminPage;
