import { useState } from 'react';
import { message, Image, Modal, Button} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getServices, createService, updateService, deleteService } from "../../services/secServices";

export const useServicesadmin = (form) => {
  const [services, setServices] = useState([
  {
    id: 1,
    title: 'Tratamiento de piel',
    description: 'Se ofrece el servicio de hidratación y nutrición de piel',
    features:[
      "Hidratación profunda",
      "Rapido"
    ],
    image: {
      url: "https://example.com"
    },
  },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const loadServices = async (page = 1) => {
      try {
        const response = await getServices(page);
        if (response?.data) {
          setServices(response.data.data);
          return response.data;
        }
      } catch (error) {
        message.error('Error al cargar los servicios');
      }
    };


    const handleEdit = (services) => {
      setCurrentService(services);
      form.setFieldsValue({
        title: services.title,
        description: services.description,
        features: services.features, 
        imagen: services.image?.url ? [
          {
            uid: '-1',
            name: 'image',
            status: 'done',
            url: services.image.url,
          }
        ] : []
      });
      setIsModalVisible(true);
    };
  

  const showModal = (service = null) => {
    setCurrentService(service);
    setIsModalVisible(true);
    if (service) {
      form.setFieldsValue({
        title: service.title,
        description: service.description,
        features: service.features,
        images: service.images?.url?[{
          uid: '-1',
          name: 'image',
          status: 'done',
          url: service.images?.url,

        },
      ] : [],

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
                      await convertFileToUrl(values.imagen?.[0]?.originFileObj);

      const serviceData = {
        title: values.title,
        description: values.description,
        features: values.features,
        image: imagenUrl,
      };

      let response;
            if (currentService) {
              console.log("Actualizando");
              
              response = await updateService(currentService.id, serviceData);
            } else {
              console.log("Creando");
              response = await createService(serviceData);
            }

            console.log(response.data);

      if (response.data) {
              message.success(`Servicio ${currentService ? 'actualizado' : 'creado'} correctamente!`);
              setIsModalVisible(false);
              form.resetFields();
            }
    } catch (error) {
      console.log("error");
      message.error(error.response?.data?.message || "Error al guardar el servicio");
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
            setServices(prev => prev.filter(services => services.id !== id));
            message.success('Servicio eliminado!');
          } catch (error) {
            message.error(error.message);
          }
        }
      });
    };

    
  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      width: "20%",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      width: "40%",
      render: (_, record) => (
        <p className="line-clamp-3">
          {record.description}
        </p>
      ),
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
      width: "15%",
    },
  ];

  return {
    services,
    isModalVisible,
    currentService,
    loadServices,
    showModal,
    handleEdit,
    handleSubmit,
    handleDelete,
    columns,
    setIsModalVisible,
  };
};

export default useServicesadmin;