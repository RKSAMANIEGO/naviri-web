import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Modal,
  Select,
  Row,
  Col,
  message,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const ServiceModalAdmin = ({
  isModalVisible,
  setIsModalVisible,
  handleSubmit,
  currentServices,
  form,
}) => {
  const [fileList, setFileList] = useState([]);
  const [hasExistingImage, setHasExistingImage] = useState(false);

  useEffect(() => {
    if (isModalVisible && currentServices) {
      // Limpiamos primero el formulario
      form.resetFields();
      
      // Preparamos la lista de archivos para la imagen existente
      const initialFileList = currentServices.imagen
        ? Array.isArray(currentServices.imagen)
          ? currentServices.imagen
          : [currentServices.imagen]
        : [];

      // Configuramos los valores del formulario
      form.setFieldsValue({
        title: currentServices.title,
        description: currentServices.description,
        features: currentServices.features,
        imagen: initialFileList,
      });

      // Actualizamos el estado de la imagen
      setFileList(initialFileList.map((img, index) => ({
        uid: `existing-${index}-${Date.now()}`,
        name: img.name || "imagen.jpg",
        status: "done",
        url: img.url,
      })));

      setHasExistingImage(initialFileList.length > 0);
    } else if (isModalVisible) {
      // Modo creación: limpiamos todo
      form.resetFields();
      setFileList([]);
      setHasExistingImage(false);
    }
  }, [isModalVisible, currentServices, form]);

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Solo se permiten imágenes (JPG, PNG, WEBP)!");
      }
      return isImage ? false : Upload.LIST_IGNORE;
    },
    onChange: ({ fileList: newFileList }) => {
      const updatedFileList = newFileList.map(file => ({
        ...file,
        preview: file.originFileObj ? URL.createObjectURL(file.originFileObj) : file.url
      }));
      setFileList(updatedFileList);
      setHasExistingImage(updatedFileList.length > 0);
      form.setFieldsValue({ imagen: updatedFileList });
    },
    onRemove: () => {
      setHasExistingImage(false);
    },
    fileList,
    listType: "picture",
    maxCount: 1,
    accept: "image/jpeg,image/png,image/webp",
    multiple: false,
    showUploadList: false,
  };

  const handleRemoveImage = () => {
    setFileList([]);
    setHasExistingImage(false);
    form.setFieldsValue({ imagen: [] });
  };

  const imageValidator = (_, value) => {
    // Si estamos editando y hay una imagen existente, no es requerido
    if (currentServices && hasExistingImage) {
      return Promise.resolve();
    }
    // Si no hay imagen existente y no se ha subido ninguna nueva
    if (!value || value.length === 0) {
      return Promise.reject(new Error('¡Debes subir una imagen!'));
    }
    return Promise.resolve();
  };

  const imageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <Modal
      title={currentServices ? "Editar Servicio" : "Nuevo Servicio"}
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
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: 10,
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Título"
              name="title"
              rules={[
                { required: true, message: "¡Por favor ingresa el título!" },
              ]}
            >
              <Input placeholder="Título del servicio" />
            </Form.Item>

            <Form.Item
              label="Características"
              name="features"
              rules={[{ required: true, message: "¡Agrega al menos una característica!" }]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Agrega o selecciona características"
                tokenSeparators={[","]}
              >
                <Option value="Rápido">Rápido</Option>
                <Option value="Efectivo">Efectivo</Option>
                <Option value="Duradero">Duradero</Option>
                <Option value="Natural">Natural</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Imagen"
              name="imagen"
              valuePropName="fileList"
              rules={[{ validator: imageValidator }]}
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <div style={imageContainerStyle}>
                {fileList.length === 0 ? (
                  <Upload.Dragger {...uploadProps}>
                    <div style={{ textAlign: "center" }}>
                      <UploadOutlined style={{ fontSize: "32px" }} />
                      <p>Arrastra tu imagen aquí o haz clic para seleccionar</p>
                      <p style={{ fontSize: "12px", color: "#999" }}>
                        Formatos soportados: JPG, PNG, WEBP
                      </p>
                    </div>
                  </Upload.Dragger>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "350px",
                        height: "150px",
                        margin: "0 auto 8px",
                        overflow: "hidden",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src={fileList[0]?.url || fileList[0]?.preview}
                        alt="Vista previa"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/350x150?text=Imagen+no+disponible';
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={handleRemoveImage}
                      ></Button>
                    </div>
                  </div>
                )}
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Descripción" name="description">
          <Input.TextArea
            rows={4}
            placeholder="Escribe una breve descripción"
          />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button type="primary" htmlType="submit">
            {currentServices ? "Guardar Cambios" : "Crear Servicios"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ServiceModalAdmin;