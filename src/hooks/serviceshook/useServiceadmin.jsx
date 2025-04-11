import { useState, useEffect } from 'react';
import { message, Button, Image, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getServices, updateService, createService, deleteService} from '../../services/secServices';

export const useServiceAdmin = (form) => {
  const [services, setservices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key
  const [isLoading, setIsloading] = useState(false);

  const loadServices = async () => {
    try {
      const servicesResponse = await getServices()
      if (servicesResponse?.data) {
        setservices(servicesResponse.data);
      }
    } catch (error) {
      message.error('Error al cargar los services');
    }
  };

  // Reload services when refreshKey changes
  useEffect(() => {
    loadServices();
  }, [refreshKey]);

  const handleEdit = (services) => {
    setCurrentService(services);
    form.setFieldsValue({
      title: services?.title,
      description: services?.description,
      features: services?.features,
      imagen: services?.image?.url ? [{
        uid: '-1',
        name: 'image',
        status: 'done',
        url: services.image.url,
      }] : []
    });
    setIsModalVisible(true);
  };

  const showModal = (services = null) => {
    setCurrentService(services);
    setIsModalVisible(true);
    if (services) {
      form.setFieldsValue({
        title: services.title,
        description: services.description,
        features: services?.features,
        imagen: services?.image?.url ? [{
          uid: '-1',
          name: 'image',
          status: 'done',
          url: services.image.url,
        }] : []
      });
    } else {
      form.resetFields();
    }
  };

  const convertFileToUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  };

  const handleSubmit = async (values) => {
    try {
      const imagenUrl = values.imagen?.[0]?.url || 
                        (values.imagen?.[0]?.originFileObj && await convertFileToUrl(values.imagen?.[0]?.originFileObj));

      const serviceData = {
        title: values.title,
        description: values.description,
        features: values.features,
        image: imagenUrl
      };

      let response;

      if (currentService) {
        response = await updateService(currentService.id, serviceData);
        
        // Update locally for immediate UI update
        if (response && response.data) {
          setservices(prev => prev.map(service => 
            service.id === currentService.id ? { ...response.data } : service
          ));
        }
      } else {
        response = await createService(serviceData);
        
        // Add to beginning of array for immediate UI update
        if (response && response.data) {
          setservices(prev => [response.data, ...prev]);
        }
      }

      message.success(`Servicio ${currentService ? 'actualizada' : 'creada'}!`);
      setIsModalVisible(false);
      form.resetFields();
      
      // Refresh data from API to ensure consistency
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      message.error(error.response?.data?.message || 'Error al guardar');
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Eliminar Servicio?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        try {
          await deleteService(id);
          setservices(prev => prev.filter(service => service.id !== id));
          message.success('¡Servicio eliminada!');
        } catch (error) {
          message.error(error.message);
        }
      }
    });
  };

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      sorter: (a, b) => a.title?.localeCompare(b.title),
      width: "20%"
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      render: (_, record) => <p className='line-clamp-3'>{record.description}</p>,
      width: "35%"
    },
    {
      title: 'Características',
      dataIndex: 'features',
      render: (_, record) =>
      record.features?.length > 0 ? (
         <ul className="list-disc pl-4">
           {record.features.map((feature, idx) => (
             <li key={idx}>{feature}</li>
           ))}
         </ul>
        ) : (
        <span>—</span>
        ),
      width: "20%",
    },
    {
      title: 'Imagen',
      render: (_, record) => (
        <Image
          src={record.image?.url || 'https://via.placeholder.com/150'}
          style={{ width: 90, height: 80, objectFit: 'cover' }}
        />
      ),
      width: "10%"
    },
    {
      title: 'Acciones',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
      width: "15%"
    },
  ];

  return {
    services,
    isModalVisible,
    currentService,
    isLoading,
    loadServices,
    showModal,
    handleEdit,
    handleSubmit,
    handleDelete,
    convertFileToUrl,
    columns,
    setIsModalVisible,
  };
};

export default useServiceAdmin;