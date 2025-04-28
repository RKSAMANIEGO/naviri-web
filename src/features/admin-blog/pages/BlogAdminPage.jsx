import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select, FloatButton } from 'antd';
import { UploadOutlined, PlusOutlined, ProductOutlined } from '@ant-design/icons';
import { useBlogAdmin } from '../hooks/useBlogAdmin';
import BlogModalAdmin from "../components/Modal/BlogModalAdmin";
import BlogAdminCard from "../components/Modal/BlogCardAdmin";

const { Option } = Select;
const { Search } = Input;

const BlogAdminPage = () => {
  const [form] = Form.useForm();
  const {
    blogs,
    loadBlogs,
    isLoading,
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

  const [searchQuery, setSearchQuery] = useState('');
  const [gridView, setGridView] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const filteredBlogs = (blogs || []).filter(blog =>
    (blog?.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedBlogs = filteredBlogs.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  useEffect(() => {
    loadBlogs();
  }, []);

  const handlePagination = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold" style={{ fontFamily: "'Great Vibes', Recursive" }}>Gestión de Blogs</h1>

      <div className="flex gap-2 my-5">
        <Search
          placeholder="Buscar en blogs..."
          onSearch={setSearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
        <Button icon={<ProductOutlined />} onClick={() => setGridView(!gridView)} />
      </div>

      {gridView ? (
        <div className="grid md:grid-cols-4 gap-4">
          {paginatedBlogs.map(blog => (
            <BlogAdminCard key={blog?.id} blog={blog} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredBlogs}
          rowKey="id"
          loading={!blogs}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: filteredBlogs.length,
            onChange: handlePagination,
            showSizeChanger: false
          }}
          scroll={{ x: true }}
          components={{
            header: {
              cell: (props) => (
                <th {...props} style={{
                  backgroundColor: 'rgba(255, 241, 249, 1)',
                  fontWeight: 'bold',
                  color: 'rgba(255, 107, 188, 1)',
                }} />
              ),
            },
          }}
        />
      )}

      {gridView && (
        <div className="flex justify-between items-center mt-4">
          <span>
            Mostrando {(pagination.current - 1) * pagination.pageSize + 1} -{' '}
            {Math.min(pagination.current * pagination.pageSize, filteredBlogs.length)} de {filteredBlogs.length}
          </span>
          <div className="flex gap-2">
            <Button
              disabled={pagination.current === 1}
              onClick={() => handlePagination(pagination.current - 1)}
            >
              Anterior
            </Button>
            <Button
              disabled={pagination.current * pagination.pageSize >= filteredBlogs.length}
              onClick={() => handlePagination(pagination.current + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

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
        style={{ backgroundColor: 'rgba(255, 107, 188, 1)' }}
      />
    </div>
  );
};

export default BlogAdminPage;