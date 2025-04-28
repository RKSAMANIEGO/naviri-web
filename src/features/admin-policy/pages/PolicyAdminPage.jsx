import React, { useEffect, useState } from "react";
import { Upload, Button, message, Row, Col } from 'antd';
import { getPolicies, updatePolicy } from "../services/policyService";
import { UploadOutlined } from '@ant-design/icons';

const PolicyAdminPage = () => {
  const [fileList, setFileList] = useState([]);
  const [policy, setPolicy] = useState({
    title: '',
    description: '',
    image: null
  });

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Solo se permiten imágenes (JPG, PNG, WEBP)!');
      }
      return isImage ? false : Upload.LIST_IGNORE;
    },
    onChange: ({ fileList: newFileList }) => {
      newFileList = newFileList.map(file => {
        if (file.originFileObj && !file.preview) {
          file.preview = URL.createObjectURL(file.originFileObj);
        }
        return file;
      });
      setFileList(newFileList);
    },
    fileList,
    listType: "picture",
    maxCount: 1,
    accept: "image/jpeg,image/png,image/webp",
    multiple: false,
  };

  useEffect(() => {
    const fetchData = async () => {
      const policyData = await getPolicies();

      if (policyData.image?.url) {
        const imageFromServer = {
          uid: '-1',
          name: 'imagen',
          status: 'done',
          url: policyData.image.url,
        };
        setFileList([imageFromServer]);
      }

      setPolicy(policyData);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPolicy({ ...policy, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let imagenUrl = policy.image.url; 

      if (fileList.length > 0 && fileList[0].originFileObj) {
        imagenUrl = await convertFileToBase64(fileList[0].originFileObj);
      }
      
      const policyData = {
        title: policy.title,
        description: policy.description,
        image: imagenUrl,  
      };
      
      console.log(policyData);
      const response = await updatePolicy(policy.id, policyData);

      if (response) {
        message.success('¡Política actualizada correctamente!');
      }
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || 'Error al actualizar la política');
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);  // Base64 generado
      reader.onerror = (error) => reject(error);  // Manejo de errores
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-5xl font-bold mb-6" style={{ fontFamily: "'Great Vibes', Recursive" }}>Políticas de la Empresa</h2>
      <Row gutter={32}>
        {/* Formulario */}
        <Col xs={24} md={12}>
          <div className="space-y-4">
            <div>
              <label className="text-3xl block mb-1 font-medium" style={{ fontFamily: "'Great Vibes', Recursive" }}>Título</label>
              <textarea
                name="title"
                rows={2}
                value={policy.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-3xl block mb-1 font-medium" style={{ fontFamily: "'Great Vibes', Recursive" }}>Descripción</label>
              <textarea
                name="description"
                value={policy.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md h-32"
              />
            </div>

            <div>
              <label className="text-3xl block mb-2 font-medium" style={{ fontFamily: "'Great Vibes', Recursive" }}>Imagen</label>
              <Upload.Dragger {...uploadProps}>
                <div className="text-center">
                  <UploadOutlined className="text-3xl mb-2" />
                  <p>Arrastra tu imagen aquí o haz clic para seleccionar</p>
                  <p className="text-xs text-gray-500">
                    Formatos soportados: JPG, PNG, WEBP
                  </p>
                </div>
              </Upload.Dragger>
            </div>

            <div className="text-right">
              <Button type="primary" onClick={handleSubmit}>
                Guardar Cambios
              </Button>
            </div>
          </div>
        </Col>

        {/* Vista previa */}
        <Col xs={24} md={12}>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-100 min-h-[300px] flex flex-col items-center justify-center text-center">
            <h3 className="text-4xl font-bold" style={{ fontFamily: "'Great Vibes', Recursive" }}>{policy.title || 'Título de política'}</h3>
            <p className="my-4" style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{policy.description || 'Descripción de la política...'}</p>
            {fileList.length > 0 && (
              <div className="w-full max-w-[350px] h-[200px] overflow-hidden rounded">
                <img
                  src={fileList[0].preview || fileList[0].url}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PolicyAdminPage;
