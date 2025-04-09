import { useState } from 'react';
import { message, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import dayjs from 'dayjs';
import { deleteTestimonio, getTestimoniosPage, updateTestimonio, createTestimonios } from '../../services/testimoniosServices';

export const useCommentAdmin = (form) => {
  const [comments, setComments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);

  const loadComent = async (page = 1) => {
    try {
      const response = await getTestimoniosPage(page);
      if (response?.data) {
        setComments(response.data.data);
        return response.data;
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error('Error al cargar los comentarios');
    }
  };

  const showModal = (comment = null) => {
    setCurrentComment(comment);
    setIsModalVisible(true);
    if (comment) {
      form.setFieldsValue({
        name_customer: comment.name_customer,
        email: comment.email,
        estado: comment.estado,
        date: comment.date ? dayjs(comment.date) : null,
      });
    } else {
      form.resetFields();
    }
  };

  const handleEdit = (comment) => {
    setCurrentComment(comment);
    form.setFieldsValue({
      name_customer: comment.name_customer,
      email: comment.email,
      estado: comment.estado,
      date: comment.date ? dayjs(comment.date) : null,
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      const commentData = {
        name_customer: values.name_customer,
        email: values.email,
        estado: values.estado,
        date: values.date ? values.date.format('YYYY-MM-DD') : null,
      };

      if (currentComment) {
        await updateTestimonio(currentComment.id, commentData);
      } else {
        await createTestimonios(commentData);
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

  const handleDelete = async (id) => {
    await deleteTestimonio(id);
    setComments((prev) => prev.filter((comment) => comment.id !== id));
    message.success('¡Comentario eliminado!');
  };

  const columns = [
    {
      title: 'Cliente',
      dataIndex: 'name_customer',
      sorter: (a, b) => a.name_customer.localeCompare(b.name_customer),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
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
