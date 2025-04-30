import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// Nuevo hook
import ClientModalAdmin from '../components/PromotionModalAdmin'; // Nuevo componente para el modal
import  {usePromotionAdmin}  from '../hook/usePromotionAdmin'; // Nuevo hook para la lógica del modal
const { Search } = Input;

const ClientAdminPage = () => {
  const [form] = Form.useForm();
  const {
    promotions,
    loadPromotions,
    isModalVisible,
    currentPromotion,
    showModal,
    //handleDelete,
    //handleEdit,
    handleSubmit,
    columns,
    setIsModalVisible,
  } = usePromotionAdmin(form);

  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const filteredClients = (promotions || []).filter(client =>
    (client?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadPromotions();
  }, []);

  const handlePagination = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl">Gestión de Clientes de Envío</h1>

      <div className="flex gap-2 my-5">
        <Search
          placeholder="Buscar cliente por nombre..."
          onSearch={setSearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredClients}
        rowKey="id"
        loading={!promotions}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: filteredClients.length,
          onChange: handlePagination,
          showSizeChanger: false
        }}
        scroll={{ x: true }}
        components={{
          header: {
            cell: (props) => (
              <th {...props} style={{
                backgroundColor: 'rgba(230, 247, 255, 1)',
                fontWeight: 'bold',
                color: 'rgba(24, 144, 255, 1)',
              }} />
            ),
          },
        }}
      />

      <ClientModalAdmin
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        handleSubmit={handleSubmit}
        currentClient={currentPromotion}
      />

      <FloatButton
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        tooltip={<div>Agregar Cliente</div>}
        style={{ backgroundColor: 'rgba(24, 144, 255, 1)' }}
      />
    </div>
  );
};

export default ClientAdminPage;
