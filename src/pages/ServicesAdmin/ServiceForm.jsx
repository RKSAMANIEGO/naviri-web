import React, { useState } from 'react';
import { Form, Input, Button, Space, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ServiceForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState(initialValues?.images || []);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        title: initialValues.title,
        description: initialValues.description,
        features: initialValues.features?.join('\n') || '',
      });


      if (initialValues.images) {
        setFileList(initialValues.images.map((img, index) => ({
          uid: `-${index}`,
          name: `image-${index}.jpg`,
          status: 'done',
          url: img.url,
        })));
      }
    }
  }, [initialValues, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const serviceData = {
        ...values,
        features: values.features.split('\n').filter(item => item.trim() !== ''),
        images: fileList
      };
      await onSubmit(serviceData);
    } catch (error) {
      message.error('Error al guardar el servicio');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList(fileList.filter(item => item.uid !== file.uid));
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Solo puedes subir archivos de imagen!');
        return Upload.LIST_IGNORE;
      }
      
      const isLt5MB = file.size / 1024 / 1024 < 5;
      if (!isLt5MB) {
        message.error('La imagen debe ser menor a 5MB!');
        return Upload.LIST_IGNORE;
      }
      
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    multiple: true,
    accept: 'image/*',
    listType: 'picture-card',
    maxCount: 5,
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="title"
        label="Título"
        rules={[{ required: true, message: 'Por favor ingrese el título' }]}
      >
        <Input placeholder="Ejemplo: Corte de cabello profesional" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Descripción"
        rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
      >
        <TextArea rows={4} placeholder="Describa el servicio en detalle..." />
      </Form.Item>

      <Form.Item
        name="features"
        label="Características"
        rules={[{ required: true, message: 'Ingrese al menos una característica' }]}
        tooltip="Escriba cada característica en una línea separada"
      >
        <TextArea 
          rows={4} 
          placeholder={`Ejemplo:\n- Duración: 30 minutos\n- Incluye lavado\n- Productos profesionales`} 
        />
      </Form.Item>

      <Form.Item
        label="Imágenes"
        extra="Máximo 5 imágenes (JPEG, PNG)"
      >
        <Upload {...uploadProps}>
          {fileList.length < 5 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Agregar imagen</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        <Space>
          <Button 
            onClick={onCancel}
            style={{
              backgroundColor: '#000',
              borderColor: '#000',
              color: '#fff',
            }}
          >
            Cancelar
          </Button>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={loading}
            style={{
              backgroundColor: '#ff85c0',
              borderColor: '#ff85c0',
              color: '#fff',
            }}
          >
            {initialValues ? 'Actualizar Servicio' : 'Crear Servicio'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ServiceForm;