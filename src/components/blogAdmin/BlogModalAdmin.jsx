import React from 'react'
import { Form, Input, Button, Upload, Modal, Select} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const BlogModalAdmin = ({isModalVisible, setIsModalVisible, form, handleSubmit, uploadProps, currentBlog}) => {
  return (
    <Modal
    title={currentBlog ? 'Editar Entrada' : 'Nueva Entrada'}
    open={isModalVisible}
    onCancel={() => setIsModalVisible(false)}
    footer={null}
    destroyOnClose
    width={600}
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
        <Upload.Dragger {...uploadProps}>
            <div >
              <UploadOutlined style={{ fontSize: '32px' }} />
              <p>Arrastra tu imagen aquí o haz clic para seleccionar</p>
              
              <p style={{fontSize: '12px',color: '#999'}}>
                Formatos soportados: JPG, PNG, WEBP
              </p>
            </div>
        </Upload.Dragger>
      </Form.Item>

      <div className="flex justify-end gap-2">
        <Button onClick={() => setIsModalVisible(false)}>Cancelar</Button>
        <Button type="primary" htmlType="submit">
          {currentBlog ? 'Guardar Cambios' : 'Crear Entrada'}
        </Button>
      </div>
    </Form>
  </Modal>

  )
}

export default BlogModalAdmin