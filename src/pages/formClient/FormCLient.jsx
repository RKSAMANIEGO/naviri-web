import React, { useState } from "react";
import { Table, Button, Tag, message } from 'antd';

const InfoEmails = () => {
  const [emails, setEmails] = useState([
    {
      id: 1,
      email: "usuario1@empresa.com",
      estado: "Activo",
    },
    {
      id: 2,
      email: "usuario2@empresa.com",
      estado: "Inactivo",
    },
    {
      id: 3,
      email: "usuario3@empresa.com",
      estado: "Activo",
    },
  ]);

  const toggleEstado = (id) => {
    const updatedEmails = emails.map((item) => {
      if (item.id === id) {
        const nuevoEstado = item.estado === "Activo" ? "Inactivo" : "Activo";
        message.success(`Estado cambiado a ${nuevoEstado}`);
        return { ...item, estado: nuevoEstado };
      }
      return item;
    });
    setEmails(updatedEmails);
  };

  const columns = [
    {
      title: "Correo electrónico",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) => (
        <Tag color={estado === "Activo" ? "green" : "volcano"}>
          {estado}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Button type="primary" onClick={() => toggleEstado(record.id)}>
          {record.estado === "Activo" ? "Desactivar" : "Activar"}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Lista de Correos</h2>
      <Table
        dataSource={emails}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default InfoEmails;
