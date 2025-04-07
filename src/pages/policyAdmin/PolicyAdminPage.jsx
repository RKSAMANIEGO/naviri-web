import React from "react";

const PolicyAdminPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Políticas de la Empresa</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">
            Política de Privacidad
          </label>
          <textarea
            className="w-2xl p-2 border rounded-md h-32"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Términos de Servicio</label>
          <textarea
            className="w-2xl p-2 border rounded-md h-32"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Política de Cookies</label>
          <textarea
            className="w-2xl p-2 border rounded-md h-32"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Política de Reembolsos
          </label>
          <textarea
            className="w-2xl p-2 border rounded-md h-32"
          />
        </div>

        <div className="flex ">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyAdminPage;
