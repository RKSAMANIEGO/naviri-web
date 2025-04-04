import { useState } from 'react';
import { message, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import dayjs from 'dayjs';
import create from '@ant-design/icons/lib/components/IconFont';
import { createTestimonios } from '../../services/testimoniosServices';



export const useCommentAdmin = (form) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      cliente: 'Juan Pérez',
      comentario: 'Este es un excelente artículo sobre React.',
      fecha: '2025-04-03',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);

  // O usa 'dayjs' si es necesario

  const handleEdit = (comment) => {
    setCurrentComment(comment);
  
    form.setFieldsValue({
      ...comment,
      fecha: comment.fecha ? dayjs(comment.fecha) : null, // Convertir a dayjs
    });
  
    setIsModalVisible(true);
  };
  
  const showModal = (comment = null) => {
    setCurrentComment(comment);
    setIsModalVisible(true);
    if (comment) {
      form.setFieldsValue({
        ...comment,
      });
    } else {
      form.resetFields();
    }
  };

  const handleSubmit = async (values) => {
    try {
      const commentData = {
        name_customer: values.cliente,
       
        description: values.comentario,
        qualification: parseFloat(values.calificacion),
        date: values.fecha ? values.fecha.format('YYYY-MM-DD') : null, // Asegurar formato
      };
    
  
      if (currentComment) {
        setComments((prev) =>
          prev.map((c) => (c.id === currentComment.id ? { ...commentData, id: c.id } : c))
        );
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
  
  const handleDelete = (id) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
    message.success('¡Comentario eliminado!');
  };

  const columns = [
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      sorter: (a, b) => a.cliente.localeCompare(b.cliente),
    },
    {
      title: 'Comentario',
      dataIndex: 'comentario',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
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
    currentComment,
    showModal,
    handleEdit,
    handleSubmit,
    handleDelete,
    columns,
    setIsModalVisible,
  };
};
