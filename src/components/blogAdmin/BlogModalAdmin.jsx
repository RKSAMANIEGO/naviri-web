import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Modal, Select, Row, Col, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const BlogModalAdmin = ({categoriesList = [], isModalVisible, setIsModalVisible, form, handleSubmit, currentBlog }) => {
  const [fileList, setFileList] = useState([]);
  
  useEffect(() => {
    if (!isModalVisible) {
      setFileList([]);
      form.resetFields();
    } else if (!currentBlog) {
      setFileList([]);
      form.resetFields();
    } else {
      const imagen = form.getFieldValue("imagen") || [];
      console.log(imagen[0].url);
      
      setFileList(imagen);
    }
  }, [isModalVisible, currentBlog]);
  
  
  // Sincronizamos el estado fileList con el formulario
  useEffect(() => {
    form.setFieldsValue({ imagen: fileList });
  }, [fileList, form]);

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Solo se permiten imágenes (JPG, PNG, WEBP)!');
      }
      // Evita la subida automática
      return isImage ? false : Upload.LIST_IGNORE;
    },
    onChange: ({ fileList: newFileList }) => {
      // Genera el preview para mostrar la imagen localmente
      newFileList = newFileList.map(file => {
        if (file.originFileObj && !file.preview) {
          file.preview = URL.createObjectURL(file.originFileObj);
        }
        return file;
      });
      setFileList(newFileList);
    },
    fileList,
    listType: "picture",
    maxCount: 1,
    accept: "image/jpeg,image/png,image/webp",
    multiple: false,
    showUploadList: false
  };

  // Contenedor fijo para la imagen para evitar movimiento de inputs adyacentes
  const imageContainerStyle = {
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <Modal
      title={currentBlog ? 'Editar Entrada' : 'Nueva Entrada'}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      destroyOnClose
      width={750}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleSubmit(values)}
        style={{ maxHeight: '70vh', overflowY: 'auto',overflowX: 'hidden', paddingRight: 10 }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: '¡Por favor ingresa el título!' }]}
            >
              <Input placeholder="Título del blog" />
            </Form.Item>

            <Form.Item
              label="Categoría"
              name="category"
              rules={[{ required: true, message: '¡Selecciona una categoría!' }]}
            >
              <Select placeholder="Selecciona una categoría">
                {categoriesList.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Imagen"
              name="imagen"
              valuePropName="fileList"
              // Eliminamos getValueFromEvent ya que sincronizamos con useEffect
              rules={[{ required: true, message: '¡Debes subir una imagen!' }]}
            >
              <div style={imageContainerStyle}>
                {fileList.length === 0 ? (
                  <Upload.Dragger {...uploadProps} >
                    <div style={{ textAlign: 'center' }}>
                      <UploadOutlined style={{ fontSize: '32px' }} />
                      <p>Arrastra tu imagen aquí o haz clic para seleccionar</p>
                      <p style={{ fontSize: '12px', color: '#999' }}>
                        Formatos soportados: JPG, PNG, WEBP
                      </p>
                    </div>
                  </Upload.Dragger>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '350px',
                        height: '150px',
                        margin: '0 auto 8px',
                        overflow: 'hidden',
                        borderRadius: '4px',
                      }}
                    >
                      <img
                        src={fileList[0].preview || fileList[0].url}
                        alt="Vista previa"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button icon={<DeleteOutlined />} onClick={() => setFileList([])}>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Descripción" name="description">
          <Input.TextArea rows={4} placeholder="Escribe una breve descripción" />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button type="primary" htmlType="submit">
            {currentBlog ? 'Guardar Cambios' : 'Crear Entrada'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default BlogModalAdmin;
