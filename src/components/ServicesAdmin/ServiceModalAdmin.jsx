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
    
    useEffect(() => {
      if (!isModalVisible) {
        setFileList([]);
        form.resetFields();
      } else if (!currentServices) {
        setFileList([]);
        form.resetFields();
      } else {
        const imagen = form.getFieldValue("imagen") || [];
        console.log(imagen[0].url);
        
        setFileList(imagen);
      }
    }, [isModalVisible, currentServices]);
    
    

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
      title={currentServices ? "Editar Servicio" : "Nuevo Servicio"}
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
              <Input placeholder="Título del servicio" />
            </Form.Item>

            <Form.Item
              label="Características"
              name="features"
              rules={[
                {
                  required: true,
                  message: "¡Agrega al menos una característica!",
                },
              ]}
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
            >
              <Upload.Dragger {...uploadProps}>
                <div style={{ textAlign: "center" }}>
                  <UploadOutlined style={{ fontSize: "32px" }} />
                  <p>Arrastra tu imagen aquí o haz clic para seleccionar</p>
                  <p style={{ fontSize: "12px", color: "#999" }}>
                    Formatos soportados: JPG, PNG, WEBP
                  </p>
                </div>
              </Upload.Dragger>
            </Form.Item>
            {fileList.length > 0 && (
              <div style={imageContainerStyle}>
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
                      e.target.src =
                        "https://via.placeholder.com/350x150?text=Imagen+no+disponible";
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setFileList([]);
                    }}
                  ></Button>
                </div>
              </div>
            )}
          </Col>
        </Row>

        <Form.Item label="Descripción" name="description">
          <Input.TextArea
            rows={4}
            placeholder="Escribe una breve descripción"
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <Button type="primary" htmlType="submit">
            {currentServices ? "Guardar Cambios" : "Crear Servicios"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ServiceModalAdmin;