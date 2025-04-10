import { useState } from 'react';
import { message, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { getServicesPage, createService, updateService, deleteService } from "../../services/secServices";

export const useServicesAdmin = (form) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0
  });

  const loadServices = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getServicesPage(page, pagination.pageSize);
      
      if (response?.data) {
        setServices(response.data);
        setPagination(prev => ({
          ...prev,
          total: response.total || 0,
          current: page,
        }));
      }
    } catch (error) {
      message.error('Error al cargar servicios');
    } finally {
      setLoading(false);
    }
  };


  const showModal = (service = null) => {
    setCurrentService(service);
    setIsModalVisible(true);
    if (service) {
      form.setFieldsValue({
        title: service.title,
        description: service.description,
        features: service.features?.join('\n') || '',
      });
    } else {
      form.resetFields();
    }
  };


  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const serviceData = {
        ...values,
        features: values.features.split('\n').filter(item => item.trim() !== '')
      };

      if (currentService) {
        await updateService(currentService.id, serviceData);
        message.success('Servicio actualizado correctamente');
      } else {
        await createService(serviceData);
        message.success('Servicio creado correctamente');
      }

      setIsModalVisible(false);
      form.resetFields();
      loadServices(pagination.current);
    } catch (error) {
      console.error("Error saving service:", error);
      message.error(error.response?.data?.message || 'Error al guardar el servicio');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      message.success('Servicio eliminado correctamente');
      loadServices(pagination.current);
    } catch (error) {
      message.error('Error al eliminar el servicio');
    }
  };


  const columns = [
    {
        title: 'Imágenes',
        dataIndex: 'images',
        key: 'images',
        width: 200,
        render: (images) => (
          images?.length > 0 ? (
            <Image.PreviewGroup>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.url}
                    width={50}
                    height={50}
                    style={{
                      borderRadius: '4px',
                      objectFit: 'cover'
                    }}
                    preview={{
                      mask: <EyeOutlined style={{ color: '#fff' }} />
                    }}
                  />
                ))}
              </div>
            </Image.PreviewGroup>
          ) : (
            <span>Sin imágenes</span>
          )
        )
    },
    {
      title: 'Título',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      render: (text) => text?.substring(0, 50) + (text?.length > 50 ? '...' : ''),
    },
    {
      title: 'Características',
      dataIndex: 'features',
      render: (features) => features?.join(', ').substring(0, 50) + '...',
    },
    {
      title: 'Acciones',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return {
    services,
    loading,
    isModalVisible,
    currentService,
    pagination,
    columns,
    loadServices,
    showModal,
    handleSubmit, 
    handleDelete,
    setIsModalVisible,
    setPagination
  };
};