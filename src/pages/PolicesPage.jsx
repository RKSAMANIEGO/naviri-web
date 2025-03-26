import React, { useEffect, useState } from 'react'
import { Leaf, ShieldCheck, Globe, ChevronRight, Lock } from 'lucide-react'
import { getPolicies } from '../services/policyService'

const PolicesPage = () => {
  const [policy, setPolicy] = useState({})

  useEffect(() => {
    const fetchData = async () =>  {
      const policyData = await getPolicies()
      setPolicy(policyData)
    }
    fetchData()
  }, [])

  // Ejemplo de estructura de secciones - ajustar según tu API
  const sections = [
    { icon: <ShieldCheck />, title: "Seguridad de Datos" },
    { icon: <Globe />, title: "Alcance Global" },
    { icon: <Leaf />, title: "Sostenibilidad" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F6FB] to-[#FFF5F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header con gradiente */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 text-[#7E5A9F]">
            <Lock className="w-6 h-6" />
            <span className="font-medium">Privacidad y Seguridad</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            {policy.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprometidos con la transparencia y protección de tus datos
          </p>
        </div>

        {/* Navegación rápida */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#F8EBFC] rounded-lg text-[#7E5A9F]">
                  {React.cloneElement(section.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <ChevronRight className="ml-auto text-gray-400 group-hover:text-[#7E5A9F] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="prose lg:prose-lg max-w-none text-gray-700">
              {/* Asumiendo que el contenido viene en HTML */}
              <div 
                dangerouslySetInnerHTML={{ __html: policy.description }} 
                className="space-y-8"
              />
              
              {/* Sección de contacto */}
              <div className="mt-12 p-8 bg-[#FFF9FC] rounded-xl border border-[#FFEBF3]">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-[#7E5A9F]" />
                  ¿Tienes preguntas?
                </h3>
                <p className="text-lg text-gray-600">
                  Contáctanos en{" "}
                  <a href="mailto:privacidad@empresa.com" className="text-[#7E5A9F] hover:underline">
                    privacidad@empresa.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer decorativo */}
        <div className="mt-12 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
          <Leaf className="w-5 h-5 text-[#8BC7A1]" />
          <span>Actualizado el {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default PolicesPage