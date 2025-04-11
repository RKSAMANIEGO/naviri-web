import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Modal, Table, Select, FloatButton } from 'antd';
import { UploadOutlined, PlusOutlined, ProductOutlined } from "@ant-design/icons";
import { useServiceAdmin }  from "../../hooks/serviceshook/useServiceadmin";
import Search from 'antd/es/input/Search';
import ServiceModalAdmin from '../../components/ServicesAdmin/ServiceModalAdmin';
import ServicesCardAdmin from "../../components/ServicesAdmin/ServicesCardAdmin";


const { Option } = Select;


const ServiceAdminPage = () => {
  const [form] = Form.useForm();
  const {
    services,
    loadServices,
    isModalVisible,
    currentService,
    showModal,
    handleEdit,
    handleSubmit,
    handleDelete,
    columns,
    setIsModalVisible,
  } = useServiceAdmin(form);

    const [searchQuery, setSearchQuery] = useState('');
    const [gridView, setGridView] = useState(false);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 5,
    });
  
    const filteredServices = (services || []).filter(service =>
      (service?.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const paginatedServices = filteredServices.slice(
      (pagination.current - 1) * pagination.pageSize,
      pagination.current * pagination.pageSize
    );
  
    useEffect(() => {
      loadServices();
    }, []);
  
    const handlePagination = (page) => {
      setPagination(prev => ({ ...prev, current: page }));
    };


   return (
    <div className="p-6">
      <h1 className='text-5xl font-semibold' style={{ fontFamily: "'Great Vibes', cursive" }}>Gestion de Servicios</h1>
      
      <div className="flex gap-2 my-5 w-full">
        <Search 
          placeholder="Buscar por título" 
          onSearch={setSearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ width: 1800 }}
        />
        <Button 
          icon={<ProductOutlined />} 
          onClick={() => setGridView(!gridView)} 
          tooltip={gridView ? "Vista de tabla" : "Vista de cuadrícula"}
        />
      </div>
      
      {gridView ? 
        <div className='grid md:grid-cols-4 gap-4'>
          {paginatedServices.map((service) => (
            <ServicesCardAdmin 
              key={service.id} 
              services={service} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
        :

        <div className="overflow-x-auto">
        <Table
        columns={columns}
        dataSource={filteredServices}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: filteredServices.length,
          onChange: handlePagination,
          showSizeChanger: false
        }}

        scroll={{ x: 'max-content' }}
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
   </div>
  }
      {gridView && (     

      <div className="flex justify-between items-center mt-4">
        <span>
          Mostrando {(pagination.current - 1) * pagination.pageSize + 1} - 
          {Math.min(pagination.current * pagination.pageSize, filteredServices.length)} de {filteredServices.length}
        </span>
        <div className="flex gap-2">
          <Button 
            disabled={pagination.current === 1}
            onClick={() => handlePagination(pagination.current - 1)}
          >
            Anterior
          </Button>
          <Button 
            disabled={pagination.current * pagination.pageSize >= filteredServices.length}
            onClick={() => handlePagination(pagination.current + 1)}
          >
            Siguiente
          </Button>
        </div>
      </div>
      )}

      <ServiceModalAdmin 
        isModalVisible={isModalVisible} 
        setIsModalVisible={setIsModalVisible}
        handleSubmit={handleSubmit}
        currentServices={currentService}
        form={form}
      />
      

      <FloatButton 
          icon={<PlusOutlined/>} 
          onClick={() => showModal()} 
          tooltip={<div>Agregar</div>} 
          style={{
            backgroundColor: "rgba(255, 107, 188, 1)",
          }}
      />
    </div>
  );
};


export default ServiceAdminPage;
