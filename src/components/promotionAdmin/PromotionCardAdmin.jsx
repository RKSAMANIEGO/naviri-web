import React from 'react';
import { Button, Image, Tooltip } from 'antd';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const PromotionCardAdmin = ({ promotion, onEdit, onDelete }) => {
  return (
    <div className="m-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:shadow-gray-600 transition-shadow bg-white">
      {/* Imagen */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <Image 
          src={promotion.image?.url || 'https://via.placeholder.com/300'}
          alt={promotion.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="font-semibold text-sm mb-2">
          {promotion.title}
        </h3>
        
        <p className=" text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
          {promotion.description}
        </p>

        {/* acciones */}
        <div className="border-t pt-3 mt-auto flex justify-end gap-2">
          <Tooltip title="Editar">
            <Button 
              type="text" 
              icon={<FiEdit className="text-blue-500" />}
              onClick={() => onEdit(promotion)}
            />
          </Tooltip>
          
          <Tooltip title="Eliminar">
            <Button 
              type="text" 
              icon={<FiTrash2 className="text-red-500" />}
              onClick={() => onDelete(promotion.id)}
              danger
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default PromotionCardAdmin;