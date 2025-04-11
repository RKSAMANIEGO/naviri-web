import { useEffect, useState } from 'react';
import { message, Button, Modal, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import dayjs from 'dayjs';
import { createTestimonios, deleteTestimonio, getTestimoniosPage, updateTestimonio } from '../../services/testimoniosServices';

export const useCommentAdmin = (form) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name_customer: 'Juan Pérez',
      description: 'Este es un excelente artículo sobre React.',
      qualification: 5,
      date: '2025-04-03',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key

  // O usa 'dayjs' si es necesario
  const loadComent = async (page = 1) => {
      try {
        const response = await getTestimoniosPage(page);
        if (response?.data) {
          setComments(response.data.data);
          return response.data;
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        message.error('Error al cargar los blogs');
      }
    };

    useEffect(() => {
      loadComent();
    }, [refreshKey]);
  
    const handleEdit = (comment) => {
      console.log("Date original:", comment.date); // 👈 Verifica el formato
      setCurrentComment(comment);
      form.setFieldsValue({
        name_customer: comment.name_customer,
        description: comment.description,
        qualification: comment.qualification,
        date: comment.date ? dayjs(comment.date, 'YYYY-MM-DD') : null,
        imagen: comment?.image?.url ? [{
          uid: '-1',
          name: 'image',
          status: 'done',
          url: comment.image.url,
        }] : []
      });
      setIsModalVisible(true);
    };
    


  const showModal = (comment = null) => {
    setCurrentComment(comment);
    setIsModalVisible(true);
    if (comment) {
      form.setFieldsValue({
        name_customer: comment.name_customer,
        description: comment.description,
        qualification: comment.qualification,
        fecha: comment.fecha ? dayjs(comment.fecha) : null, // Convertir a dayjs
        imagen: comment.image?.url ? [{
          uid: '-1',
          name: 'image',
          status: 'done',
          url: comment.image.url,
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

      console.log("Envio:", values); // 👈 Verifica el formato
      
                        
      const commentData = {
        name_customer: values.name_customer,
        description: values.description,
        qualification: parseFloat(values.qualification),
        date: values.date ? values.date.format('YYYY-MM-DD') : null, // Asegurar formato
        image: imagenUrl
      };
    
  
      if (currentComment) {
        console.log("Comentario a actualizar:", commentData); // 👈 Verifica el format 
        console.log("Datos del formulario:", currentComment.id); // 👈 Verifica el formato
        const response = await updateTestimonio(currentComment.id, commentData); // Asegúrate de que esta función esté definida y funcione correctamente   
        if (response && response.data) {
          setComments(prev => prev.map(comment => 
            comment.id === currentComment.id ? { ...response.data } : comment
          ));
        }
      } else {
        console.log("Comentario a guardar:", commentData); // 👈 Verifica el format 
        const response = await createTestimonios(commentData); // Asegúrate de que esta función esté definida y funcione correctamente
        if (response && response.data) {
          setComments(prev => [response.data, ...prev]);
        }
      }
  
      message.success(`¡Comentario ${currentComment ? 'actualizada' : 'creada'}!`);
      setIsModalVisible(false);
      form.resetFields();
      
      // Refresh data from API to ensure consistency
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      message.error('Error al guardar el comentario');
    }
  };
  
  const handleDelete =async (id) => {
    Modal.confirm({
      title: '¿Eliminar Comentario?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        try {
          await deleteTestimonio(id);
          setComments(prev => prev.filter(comment => comment.id !== id));
          message.success('Comentario eliminado!');
        } catch (error) {
          message.error(error.message);
        }
      }
    });
  };

  const columns = [
    {
      title: 'Cliente',
      dataIndex: 'name_customer',
      sorter: (a, b) => a.name_customer.localeCompare(b.name_customer),
    },
    
    {
      title: 'Comentario',
      dataIndex: 'description',
    },
    {
      title: 'Calificacion',
      dataIndex: 'qualification',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
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
    },
  ];

  return {
    comments,
    isModalVisible,
    loadComent,
    currentComment,
    showModal,
    handleEdit,
    handleSubmit,
    handleDelete,
    columns,
    setIsModalVisible,
  };
};