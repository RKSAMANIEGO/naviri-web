import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select, FloatButton } from 'antd';
import { UploadOutlined, PlusOutlined, ProductOutlined } from '@ant-design/icons';
import { useBlogAdmin } from '../../hooks/blog/useBlogAdmin';
import BlogModalAdmin from '../../components/blogAdmin/BlogModalAdmin';
import BlogAdminCard from '../../components/blogAdmin/BlogCardAdmin';
const { Option } = Select;
const { Search } = Input;

const BlogAdminPage = () => {
  const [form] = Form.useForm();
  const {
    blogs,
    loadBlogs,
    categories,
    isModalVisible,
    currentBlog,
    showModal,
    handleDelete,
    handleEdit,
    handleSubmit,
    columns,
    setIsModalVisible,
  } = useBlogAdmin(form);

  const [gridView, setGridView] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const filteredBlogs = blogs.filter((blog) =>
    (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const onSearch = (value) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadBlogs(pagination.current);
      if (data) {
        setPagination((prev) => ({
          ...prev,
          total: data.total,
        }));
      }
    };
    fetchData();
  }, [pagination.current]);

  const handlePagination = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl">Gestión de Blogs</h1>
      {/* Barra de búsqueda */}
      <div className="flex gap-2 my-5">
        <Search
          placeholder="Buscar en blogs..."
          onSearch={onSearch}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
        <Button icon={<ProductOutlined />} onClick={() => setGridView(!gridView)} />
      </div>

      {gridView ? (
        // Vista de grid
        <div className="grid md:grid-cols-4 gap-4">
          {filteredBlogs.map((blog) => (
            <BlogAdminCard key={blog.id} blog={blog} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        // Vista de tabla
        <Table
          columns={columns}
          dataSource={filteredBlogs}
          rowKey="id"
          pagination={false}
          scroll={{ x: true }}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{
                    backgroundColor: 'rgba(255, 241, 249, 1)',
                    fontWeight: 'bold',
                    color: 'rgba(255, 107, 188, 1)',
                  }}
                />
              ),
            },
          }}
        />
      )}

      {/* Sección de paginado */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Mostrando {(pagination.current - 1) * pagination.pageSize + 1} -{' '}
          {Math.min(pagination.current * pagination.pageSize, pagination.total)} de {pagination.total}
        </span>
        <div className="flex gap-2">
          <Button disabled={pagination.current === 1} onClick={() => handlePagination(pagination.current - 1)}>
            Anterior
          </Button>
          <Button
            disabled={pagination.current * pagination.pageSize >= pagination.total}
            onClick={() => handlePagination(pagination.current + 1)}
          >
            Siguiente
          </Button>
        </div>
      </div>

      {/* Modal para editar y registrar */}
      <BlogModalAdmin
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        categoriesList={categories}
        form={form}
        handleSubmit={handleSubmit}
        currentBlog={currentBlog}
      />
      

      <FloatButton
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        tooltip={<div>Agregar</div>}
        style={{
          backgroundColor: 'rgba(255, 107, 188, 1)',
        }}
      />
    </div>
  );
};

export default BlogAdminPage;
