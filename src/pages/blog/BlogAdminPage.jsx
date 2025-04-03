import React, { useDebugValue, useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Modal, Table, Select, FloatButton } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useBlogAdmin } from '../../hooks/blog/useBlogAdmin'; 
const { Option } = Select;

const BlogAdminPage = () => {
  const [form] = Form.useForm();
  const {
    blogs,
    loadBlogs,
    isModalVisible,
    currentBlog,
    showModal,
    handleSubmit,
    columns,
    setIsModalVisible,
  } = useBlogAdmin(form);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadBlogs(pagination.current);
      if (data) {
        setPagination(prev => ({
          ...prev,
          total: data.total,
        }));
      }
    };
    fetchData();
  }, [pagination.current]);

  // Manejo de paginación
  const handlePagination = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };


  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Cantidad de items por página

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
        dataSource={blogs}
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
            name="title"
            rules={[{ required: true, message: '¡Por favor ingresa el título!' }]}
          >
            <Input placeholder="Título del blog" />
          </Form.Item>

          <Form.Item label="Descripción" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Categoría"
            name="category"
            rules={[{ required: true, message: '¡Selecciona una categoría!' }]}
          >
            <Select placeholder="Selecciona una categoría">
              <Option value={1}>Aceites</Option>
              <Option value={2}>Aromas</Option>
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
