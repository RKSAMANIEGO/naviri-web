import React, { useEffect, useState } from "react";
import { Button, message, Row, Col } from "antd";
import { getCompanyInfo, updateCompanyInfo } from "../services/aboutService";

const MissionVisionAdminPage = () => {
  const [info, setInfo] = useState({ mission: "", vision: "", id: null });
  const [originalInfo, setOriginalInfo] = useState({ mission: "", vision: "" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompanyInfo();
      setInfo({
        mission: data?.mission || "",
        vision: data?.vision || "",
        id: data?.id || null,
      });
      setOriginalInfo({
        mission: data?.mission || "",
        vision: data?.vision || "",
      });
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = (field) => {
    setInfo((prev) => ({ ...prev, [field]: originalInfo[field] }));
  };

  const handleSubmit = async () => {
    try {
      const response = await updateCompanyInfo({
        id: info.id,
        mission: info.mission,
        vision: info.vision,
      });

      if (response) {
        message.success("¡Información actualizada correctamente!");
        setOriginalInfo({ mission: info.mission, vision: info.vision });
      }
    } catch (error) {
      message.error("Error al actualizar información.");
      console.error(error);
    }
  };

  const hasChanged = (field) => info[field] !== originalInfo[field];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Misión y Visión</h2>
      <Row gutter={32}>
        <Col xs={24} md={12}>
          <div className="space-y-6">
            {/* Misión */}
            <div>
              <label className="block mb-1 font-medium">Misión</label>
              <textarea
                name="mission"
                value={info.mission}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded-md"
              />
              {hasChanged("mission") && (
                <div className="flex justify-end gap-2 mt-2">
                  <Button onClick={() => handleCancel("mission")}>Cancelar</Button>
                  <Button type="primary" onClick={handleSubmit}>Actualizar</Button>
                </div>
              )}
            </div>

            {/* Visión */}
            <div>
              <label className="block mb-1 font-medium">Visión</label>
              <textarea
                name="vision"
                value={info.vision}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded-md"
              />
              {hasChanged("vision") && (
                <div className="flex justify-end gap-2 mt-2">
                  <Button onClick={() => handleCancel("vision")}>Cancelar</Button>
                  <Button type="primary" onClick={handleSubmit}>Actualizar</Button>
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Vista previa */}
        <Col xs={24} md={12}>
          <div className="border border-gray-300 rounded-xl p-6 bg-gray-100 shadow-md min-h-[300px]">
            <h3 className="text-lg font-semibold text-center mb-4">Vista Previa</h3>
            <div className="grid gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-md font-bold mb-2">Misión</h4>
                <p>{info.mission || "Tu misión aparecerá aquí..."}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-md font-bold mb-2">Visión</h4>
                <p>{info.vision || "Tu visión aparecerá aquí..."}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MissionVisionAdminPage;
