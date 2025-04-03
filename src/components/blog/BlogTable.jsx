import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BlogTable = ({ blogs, onEdit, onDelete }) => {
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
          alt="Thumbnail" 
          className="w-12 h-12 object-cover rounded"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/150';
          }}
        />
      ),
    },
    {
      title: 'Acciones',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button 
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="¿Eliminar esta entrada?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={blogs}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      scroll={{ x: true }}
    />
  );
};

export default BlogTable;