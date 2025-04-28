import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Modal, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const PromotionModalAdmin = ({ isModalVisible, setIsModalVisible, form, handleSubmit, currentPromotion }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (isModalVisible && currentPromotion) {
      const imagen = form.getFieldValue("imagen") || [];
      setFileList(imagen);
    } else {
      setFileList([]);
      form.resetFields();
    }
  }, [isModalVisible, currentPromotion, form]);

  useEffect(() => {
    form.setFieldsValue({ imagen: fileList });
  }, [fileList, form]);

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('¡Solo se permiten imágenes (JPG, PNG, WEBP)!');
      }
      return isImage ? false : Upload.LIST_IGNORE;
    },
    onChange: ({ fileList: newFileList }) => {
      const updatedList = newFileList.map(file => {
        if (file.originFileObj && !file.preview) {
          file.preview = URL.createObjectURL(file.originFileObj);
        }
        return file;
      });
      setFileList(updatedList);
    },
    fileList,
    listType: "picture",
    maxCount: 1,
    accept: "image/jpeg,image/png,image/webp",
    multiple: false,
    showUploadList: false,
  };

  return (
    <Modal
      title={currentPromotion ? 'Editar Entrada' : 'Nueva Entrada'}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      destroyOnClose
      width={750}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden', paddingRight: 10 }}
      >
        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: '¡Por favor ingresa el título!' }]}
        >
          <Input placeholder="Título de la promoción" />
        </Form.Item>

        <Form.Item
          label="Imagen"
          name="imagen"
          rules={[{ required: true, message: '¡Debes subir una imagen!' }]}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {fileList.length === 0 ? (
              <Upload.Dragger {...uploadProps}>
                <div style={{ textAlign: 'center' }}>
                  <UploadOutlined style={{ fontSize: '32px' }} />
                  <p>Arrastra tu imagen aquí o haz clic para seleccionar</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>
                    Formatos soportados: JPG, PNG, WEBP
                  </p>
                </div>
              </Upload.Dragger>
            ) : (
              <>
                <div style={{
                  width: '100%',
                  maxWidth: '350px',
                  height: '350px',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}>
                  <img
                    src={fileList[0].preview || fileList[0].url}
                    alt="Vista previa"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => setFileList([])}
                >
                  Eliminar Imagen
                </Button>
              </>
            )}
          </div>
        </Form.Item>

        <Form.Item label="Descripción" name="description">
          <Input.TextArea rows={4} placeholder="Escribe una breve descripción..." />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button type="default" onClick={() => setIsModalVisible(false)}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            {currentPromotion ? 'Guardar Cambios' : 'Crear Entrada'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PromotionModalAdmin;
