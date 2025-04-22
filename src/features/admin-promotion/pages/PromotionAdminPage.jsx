import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select, FloatButton } from 'antd';
import { UploadOutlined, PlusOutlined, ProductOutlined } from '@ant-design/icons';
import { usePromotionAdmin } from '../hook/usePromotionAdmin';
import PromotionModalAdmin from '../component/PromotionModalAdmin.jsx';
import PromotionCardAdmin from '../component/PromotionCardAdmin copy.jsx';

const { Search } = Input;

const PromotionAdminPage = () => {
  const [form] = Form.useForm();
  const {
    promotions,
    loadPromotions,
    isModalVisible,
    currentPromotion,
    showModal,
    handleDelete,
    handleEdit,
    handleSubmit,
    columns,
    setIsModalVisible,
  } = usePromotionAdmin(form);

  const [searchQuery, setSearchQuery] = useState('');
  const [gridView, setGridView] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  // Filtrado seguro con valor por defecto
  const filteredPromotions = (promotions || []).filter(promotion =>
    (promotion?.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginación segura
  const paginatedPromotions = filteredPromotions.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  useEffect(() => {
    loadPromotions();
  }, []);

  const handlePagination = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl">Gestión de Promociones</h1>
      
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
          {paginatedPromotions.map(promotion => (
            <PromotionCardAdmin key={promotion?.id} promotion={promotion} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredPromotions}  // Changed from paginatedBlogs to apply filters to all data
          rowKey="id"
          loading={!promotions}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: filteredPromotions.length,
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
                }}/>
              ),
            },
          }}
        />
      )}

      {/* Manual pagination, only needed for grid view */}
      {gridView && (
        <div className="flex justify-between items-center mt-4">
          <span>
            Mostrando {(pagination.current - 1) * pagination.pageSize + 1} -{' '}
            {Math.min(pagination.current * pagination.pageSize, filteredPromotions.length)} de {filteredPromotions.length}
          </span>
          <div className="flex gap-2">
            <Button 
              disabled={pagination.current === 1} 
              onClick={() => handlePagination(pagination.current - 1)}
            >
              Anterior
            </Button>
            <Button
              disabled={pagination.current * pagination.pageSize >= filteredPromotions.length}
              onClick={() => handlePagination(pagination.current + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      <PromotionModalAdmin
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        handleSubmit={handleSubmit}
        currentPromotion={currentPromotion}
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

export default PromotionAdminPage;