import { useState } from 'react';
import { message, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import dayjs from 'dayjs';
import { deleteTestimonio, getTestimoniosPage, updateTestimonio } from '../../services/testimoniosServices';

import { createTestimonios } from '../../services/testimoniosServices';



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


  
    const handleEdit = (comment) => {
      console.log("Date original:", comment.date); // 👈 Verifica el formato
      setCurrentComment(comment);
      form.setFieldsValue({
        name_customer: comment.name_customer,
        description: comment.description,
        qualification: comment.qualification,
        date: comment.date ? dayjs(comment.date, 'YYYY-MM-DD') : null,
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
      });
    } else {
      form.resetFields();
    }
  };

  const handleSubmit = async (values) => {
    try {
      const commentData = {
        name_customer: values.name_customer,
       
        description: values.description,
        qualification: parseFloat(values.qualification),
        date: values.date ? values.date.format('YYYY-MM-DD') : null, // Asegurar formato
      };
    
  
      if (currentComment) {
        console.log("Comentario a actualizar:", commentData); // 👈 Verifica el format 
        console.log("Datos del formulario:", currentComment.id); // 👈 Verifica el formato
        await updateTestimonio(currentComment.id, commentData); // Asegúrate de que esta función esté definida y funcione correctamente   
      } else {
        await createTestimonios(commentData); // Asegúrate de que esta función esté definida y funcione correctamente
        setComments((prev) => [...prev, { ...commentData, id: Date.now() }]);
      }
  
      setIsModalVisible(false);
      form.resetFields();
      message.success('¡Comentario guardado exitosamente!');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error('Error al guardar el comentario');
    }
  };
  
  const handleDelete =async (id) => {
    await deleteTestimonio(id); // Asegúrate de que esta función esté definida y funcione correctamente
    message.success('¡Comentario eliminado!');
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
