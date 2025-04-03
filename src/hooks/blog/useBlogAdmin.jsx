
import { useState } from 'react';
import { message, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';

export const useBlogAdmin = (form) => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      titulo: 'Introducción a React',
      descripcion: 'Conceptos básicos...',
      categoria: 'Tutoriales',
      imagen: 'https://via.placeholder.com/150',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    form.setFieldsValue({
      ...blog,
      imagen: blog.imagen
        ? [
            {
              uid: '-1',
              name: 'imagen',
              status: 'done',
              url: blog.imagen,
            },
          ]
        : [],
    });
    setIsModalVisible(true);
  };

  const showModal = (blog = null) => {
    setCurrentBlog(blog);
    setIsModalVisible(true);
    if (blog) {
      form.setFieldsValue({
        ...blog,
        imagen: blog.imagen
          ? [
              {
                uid: '-1',
                name: 'imagen',
                status: 'done',
                url: blog.imagen,
              },
            ]
          : [],
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
      const imagenUrl =
        values.imagen?.[0]?.url ||
        (await convertFileToUrl(values.imagen?.[0]?.originFileObj));
      const blogData = { ...values, imagen: imagenUrl };

      if (currentBlog) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === currentBlog.id ? { ...blogData, id: b.id } : b))
        );
      } else {
        setBlogs((prev) => [...prev, { ...blogData, id: Date.now() }]);
      }

      setIsModalVisible(false);
      form.resetFields();
      message.success('¡Entrada guardada exitosamente!');
    } catch (error) {
      message.error('Error al guardar la entrada');
    }
  };

  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    message.success('¡Entrada eliminada!');
  };

  const columns = [
    {
      title: 'Título',
      dataIndex: 'titulo',
      sorter: (a, b) => a.titulo.localeCompare(b.titulo),
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      filters: [
        { text: 'Tutoriales', value: 'Tutoriales' },
        { text: 'Tecnología', value: 'Tecnología' },
      ],
      onFilter: (value, record) => record.categoria === value,
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      render: (imagen) => (
        <img
          src={imagen}
          alt="thumbnail"
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
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
    blogs,
    isModalVisible,
    currentBlog,
    showModal,
    handleEdit,
    handleSubmit,
    handleDelete,
    convertFileToUrl,
    columns,
    setIsModalVisible,
  };
};
