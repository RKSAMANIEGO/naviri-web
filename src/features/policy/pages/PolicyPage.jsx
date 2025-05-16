import React from 'react'
import { Leaf, ShieldCheck, Globe, ChevronRight, Lock } from 'lucide-react'
import { getPolicies } from "../../policy/services/policyService";
import { useQuery } from '@tanstack/react-query'

const PolicyPage = () => {
  const { data: policy, error, isLoading } = useQuery({
    queryKey: ["policy"], 
    queryFn: getPolicies,
    staleTime: 1000 * 60 * 5,
  })  

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error al cargar la política: {error.message}</p>
      </div>
    )
  }

  const sections = [
    { icon: <ShieldCheck />, title: "Seguridad de Datos" },
    { icon: <Globe />, title: "Alcance Global" },
    { icon: <Leaf />, title: "Sostenibilidad" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F6FB] to-[#FFF5F9] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 text-[#7E5A9F] justify-center">
            <Lock className="w-6 h-6" />
            <span className="font-medium">Privacidad y Seguridad</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            {policy.title}
          </h1>
          <p className="text-xl text-gray-600 mx-auto leading-relaxed">
            Comprometidos con la transparencia y protección de tus datos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16 w-full">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex-1"
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

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="prose lg:prose-lg text-gray-700 mx-auto text-center">
              <div
                className="prose lg:prose-lg text-gray-700 mx-auto text-left"
                style={{ whiteSpace: 'pre-line' }}
              >
                {policy.description}
              </div>

              <div>
                {policy.image?.url && <img src={policy.image.url} alt="Imagen de la política" />}
              </div>
              <div className="mt-12 p-8 bg-[#FFF9FC] rounded-xl border border-[#FFEBF3] text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2 justify-center">
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

        <div className="mt-12 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
          <Leaf className="w-5 h-5 text-[#8BC7A1]" />
          <span>Actualizado el {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default PolicyPage
