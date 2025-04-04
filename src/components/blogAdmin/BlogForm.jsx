import React, { useEffect } from 'react';
import { Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const BlogForm = ({ form, onFinish, initialValues }) => {
  // Efecto para inicializar valores del formulario
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        imagen: initialValues.imagen ? [{
          uid: '-1',
          name: 'image',
          status: 'done',
          url: initialValues.imagen,
        }] : []
      });
    }
  }, [initialValues, form]);

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Solo se permiten imágenes (JPG, PNG)');
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleFileChange = ({ fileList }) => {
    form.setFieldsValue({ imagen: fileList });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Título"
        name="titulo"
        rules={[{ required: true, message: 'Campo obligatorio' }]}
      >
        <Input placeholder="Ej: Guía de React" />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="descripcion"
        rules={[{ required: true, message: 'Campo obligatorio' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Categoría"
        name="categoria"
        rules={[{ required: true, message: 'Seleccione una categoría' }]}
      >
        <Select placeholder="Seleccione...">
          <Select.Option value="Tutoriales">Tutoriales</Select.Option>
          <Select.Option value="Tecnología">Tecnología</Select.Option>
          <Select.Option value="Desarrollo">Desarrollo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Imagen"
        name="imagen"
        valuePropName="fileList"
        getValueFromEvent={(e) => e?.fileList || []}
        rules={[{ required: true, message: 'Suba una imagen' }]}
      >
        <Upload
          listType="picture-card"
          beforeUpload={handleBeforeUpload}
          onChange={handleFileChange}
          onRemove={() => form.setFieldsValue({ imagen: [] })}
          maxCount={1}
        >
          {form.getFieldValue('imagen')?.length > 0 ? null : (
            <div className="upload-area">
              <UploadOutlined style={{ fontSize: 24 }} />
              <p>Arrastre o haga clic para subir</p>
              <p className="text-xs text-gray-500">Formatos: JPG, PNG</p>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          {initialValues?.id ? 'Actualizar' : 'Crear'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BlogForm;