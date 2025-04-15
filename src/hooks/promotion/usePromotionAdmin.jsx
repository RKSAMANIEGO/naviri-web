import { useState, useEffect } from 'react';
import { message, Button, Image, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from '../../services/blogService';
import { createPromotion, deletePromotion, getPromotions, updatePromotion } from '../../services/promotionService';

export const usePromotionAdmin = (form) => {
  const [promotions, setPromotions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsloading] = useState(false);

  const loadPromotions = async () => {
    try {
      const response = await getPromotions();
      console.log(response);
      
      if (response?.data) {
        setPromotions(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      message.error('Error al cargar los blogs');
    }
  };

  // Reload blogs when refreshKey changes
  useEffect(() => {
    loadPromotions();
  }, [refreshKey]);

  const handleEdit = (promotion) => {
    setCurrentPromotion(promotion);
    form.setFieldsValue({
      title: promotion?.title,
      description: promotion?.description,
      imagen: promotion?.image?.url ? [{
        uid: '-1',
        name: 'image',
        status: 'done',
        url: promotion.image.url,
      }] : []
    });
    setIsModalVisible(true);
  };

  const showModal = (promotion = null) => {
    setCurrentPromotion(promotion);
    setIsModalVisible(true);
    if (promotion) {
      form.setFieldsValue({
        title: promotion.title,
        description: promotion.description,
        imagen: promotion.image?.url ? [{
          uid: '-1',
          name: 'image',
          status: 'done',
          url: promotion.image.url,
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

      const promotionData = {
        title: values.title,
        description: values.description,
        image: imagenUrl
      };

      let response;

      if (currentPromotion) {
        console.log(promotionData);
        response = await updatePromotion(currentPromotion.id, promotionData);
        
        // Update locally for immediate UI update
        if (response && response.data) {
          setPromotions(prev => prev.map(promotion => 
            promotion.id === currentPromotion.id ? { ...response.data } : promotion
          ));
        }
      } else {
        console.log(promotionData);
        
        response = await createPromotion(promotionData);
        
        // Add to beginning of array for immediate UI update
        if (response && response.data) {
          setPromotions(prev => [response.data, ...prev]);
        }
      }

      message.success(`¡Entrada ${currentPromotion ? 'actualizada' : 'creada'}!`);
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
      title: '¿Eliminar Promoción?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        try {
          await deletePromotion(id);
          setPromotions(prev => prev.filter(promotion => promotion.id !== id));
          message.success('¡Promocion eliminada!');
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
    promotions,
    isModalVisible,
    currentPromotion,
    isLoading,
    loadPromotions,
    showModal,
    handleEdit,
    handleSubmit,
    handleDelete,
    convertFileToUrl,
    columns,
    setIsModalVisible,
  };
};
