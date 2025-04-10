
import { useState } from 'react';
import { message, Button, Image, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { createBlog, deleteBlog, getBlogs, updateBlog } from '../../services/blogService';

export const useBlogAdmin = (form) => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: '¿ Sabias Que ?',
      description: 'Conceptos básicos...',
      categoria: {
        id: 1,
        name: "Aromas"
      },
      image: {
        url: "https://example.com"
      },
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const loadBlogs = async (page = 1) => {
    try {
      const response = await getBlogs(page);
      if (response?.data) {
        setBlogs(response.data.data);
        return response.data;
      }
    } catch (error) {
      message.error('Error al cargar los blogs');
    }
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    form.setFieldsValue({
      title: blog.title,
      description: blog.description,
      category: blog.category?.id,
      imagen: blog.image?.url ? [
        {
          uid: '-1',
          name: 'image',
          status: 'done',
          url: blog.image.url,
        }
      ] : []
    });
    setIsModalVisible(true);
  };

  const showModal = (blog = null) => {
    setCurrentBlog(blog);
    setIsModalVisible(true);
    if (blog) {
      form.setFieldsValue({
        title: blog.title,
        description: blog.description,
        category: blog.category?.id,
        imagen: blog.image?.url ? [
          {
            uid: '-1',
            name: 'image',
            status: 'done',
            url: blog.image.url,
          }
        ] : []
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
  
      const blogData = {
        title: values.title,
        description: values.description, 
        category_id: values.category, 
        image: imagenUrl
      };
  
      let response;
      if (currentBlog) {
        console.log("Actualizando");
        
        response = await updateBlog(currentBlog.id, blogData);
      } else {
        console.log("Creando");
        response = await createBlog(blogData);
      }
  
      console.log(response.data);

      if (response.data) {
        // await loadBlogs(pagination.current); 
        message.success(`¡Entrada ${currentBlog ? 'actualizada' : 'creada'}!`);
        setIsModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.log("error");
      message.error(error.response?.data?.message || 'Error al guardar');
    }
  };


  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Eliminar Blog?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        try {
          await deleteBlog(id);
          setBlogs(prev => prev.filter(blog => blog.id !== id));
          message.success('¡Entrada eliminada!');
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
      sorter: (a, b) => a.title.localeCompare(b.title),
      width: "20%"
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      render: (_, record) =>(
        <p className='line-clamp-3 '>
          {record.description}
        </p>
      ),
      width: "35%"
    },
    {
      title: 'Categoría',
      render: (_, record) => record.category?.name,
      filters: [
        { text: 'Aceites', value: 'Aceites' },
        // Agrega más categorías según tu API
      ],
      onFilter: (value, record) => record.category.name === value,
      width: "10%"
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
    blogs,
    isModalVisible,
    currentBlog,
    loadBlogs,
    showModal,
    handleEdit,
    handleSubmit,
    handleDelete,
    convertFileToUrl,
    columns,
    setIsModalVisible,
  };
};
