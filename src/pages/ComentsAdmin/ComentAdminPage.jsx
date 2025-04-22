import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, FloatButton, DatePicker,message, Col, Row, Upload } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCommentAdmin } from '../../hooks/coment/useComentAdmin';
import dayjs from 'dayjs';
import CommentSearch from '../../components/ComentsAdmin/ComentAdmin'; // <-- nuevo

const ComentAdminPage = () => {
  const [form] = Form.useForm();
  const {
    comments,
    isModalVisible,
    currentComment,
    showModal,
    handleSubmit,
    columns,
    setIsModalVisible,
    loadComent
  } = useCommentAdmin(form);

  const [fileList, setFileList] = useState([]);
    
    useEffect(() => {
      if (!isModalVisible) {
        setFileList([]);
        form.resetFields();
      } else if (!currentComment) {
        setFileList([]);
        form.resetFields();
      } else {
        const imagen = form.getFieldValue("imagen") || [];
        console.log(imagen[0].url);
        
        setFileList(imagen);
      }
    }, [isModalVisible, currentComment]);


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadComent(pagination.current);
      if (data) {
        setPagination(prev => ({
          ...prev,
          total: data.total,
        }));
      }
    };
    fetchData();
  }, [pagination.current]);

  useEffect(() => {
    const results = comments.filter(comment =>
      comment.name_customer.toLowerCase().includes(searchQuery)
    );
    setFilteredComments(results);
  }, [comments, searchQuery]);

  const handlePagination = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

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
    <div className="p-6">
      {/* Sección de búsqueda */}
      <CommentSearch onSearch={setSearchQuery} />

      {/* Tabla */}
      <Table
        columns={columns}
        dataSource={filteredComments}
        rowKey="id"
        pagination={false}
        scroll={{ x: true }}
        components={{
          header: {
            cell: (props) => (
              <th {...props} style={{ backgroundColor: 'rgba(255, 241, 249, 1)', fontWeight: 'bold', color: 'rgba(255, 107, 188, 1)' }} />
            )
          }
        }}
      />

      {/* Paginado */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Mostrando {(pagination.current - 1) * pagination.pageSize + 1} - 
          {Math.min(pagination.current * pagination.pageSize, pagination.total)} de {pagination.total}
        </span>
        <div className="flex gap-2">
          <Button disabled={pagination.current === 1} onClick={() => handlePagination(pagination.current - 1)}>
            Anterior
          </Button>
          <Button disabled={pagination.current * pagination.pageSize >= pagination.total} onClick={() => handlePagination(pagination.current + 1)}>
            Siguiente
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={currentComment ? 'Editar Entrada' : 'Nueva Entrada'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={24}>
            <Col span={12}> 
              <Form.Item label="Cliente" name="name_customer" rules={[{ required: true, message: '¡Por favor ingresa el cliente!' }]}>
                <Input placeholder="Nombre del cliente" />
              </Form.Item>
              <Form.Item label="Comentario" name="description" rules={[{ required: true, message: '¡Debes Colocar un Comentario!' }]}>
                <Input.TextArea rows={4} />
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
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Calificación" name="qualification" rules={[{ required: true, message: '¡Por favor ingresa la puntuación!' }]}>
                <Input placeholder="Puntuación del cliente" type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Fecha" name="date" rules={[{ required: true, message: '¡Selecciona una fecha!' }]}>
                <DatePicker
                  onChange={(date) => {
                    if (date) {
                      form.setFieldValue('fecha', date.format('YYYY-MM-DD'));
                    } else {
                      form.setFieldValue('fecha', null);
                    }
                  }}
                  format="YYYY-MM-DD"
                  value={form.getFieldValue('fecha') ? dayjs(form.getFieldValue('fecha')) : null}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalVisible(false)}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              {currentComment ? 'Guardar Cambios' : 'Crear Entrada'}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Botón flotante */}
      <FloatButton
        icon={<PlusOutlined />}
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
