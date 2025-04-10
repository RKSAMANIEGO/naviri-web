
import { useState } from 'react';
import { message, Button, Image, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { createBlog, deleteBlog, getBlogs, updateBlog } from '../../services/blogService';
import { getCategories } from '../../services/categoriesService';

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
  const [categories, setCategories] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const loadBlogs = async (page = 1, category = '') => {
    try {
      const response = await getBlogs(page, 5, category); 
      const categoriesData = await getCategories();
      
      if (response?.data && categoriesData.data) {
        setBlogs(response.data.data);
        setCategories(categoriesData.data);
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
        response = await updateBlog(currentBlog.id, blogData);
        setBlogs(prev => prev.map(blog => 
          blog.id === currentBlog.id ? { ...blog, ...blogData, image: { url: imagenUrl } } : blog
        ));
      } else {
        response = await createBlog(blogData);
        const newBlog = {
          ...blogData,
          id: Date.now(),
          category: categories.find(cat => cat.id === blogData.category_id),
          image: { url: imagenUrl }
        };
        setBlogs(prev => [newBlog, ...prev]);
      }
  
      if (response.data) {
        message.success(`¡Entrada ${currentBlog ? 'actualizada' : 'creada'}!`);
        setIsModalVisible(false);
        form.resetFields();
        
        loadBlogs(pagination.current);
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error al guardar');
      if (!currentBlog) {
        setBlogs(prev => prev.filter(blog => blog.id !== Date.now()));
      }
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
          // Eliminación local inmediata
          setBlogs(prev => prev.filter(blog => blog.id !== id));
          await deleteBlog(id);
          message.success('¡Entrada eliminada!');
        } catch (error) {
          setBlogs(prev => [...prev, blogs.find(blog => blog.id === id)]);
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
      filters: categories.map(category => ({
        text: category.name,
        value: category.id,
      })),
      onFilter: (value, record) => record.category.id === value,
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
    categories,
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
