"use client"
import { useState, useEffect } from "react"
import styles from "./formulario-modal.module.css"
import InputField from "./input-field"
import modalImage from '../../../../assets/image/logomodal.jpg'
import { createEmail } from "../../../contacts/services/emailService"

export default function FormularioModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    cellphone: "",
    email: "",
    disctric: "",
    message: ''
  })

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    cellphone: "",
    email: "",
    disctric: "",
    message: ''
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  
  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === "cellphone") {
      const numericValue = value.replace(/\D/g, '')
      setFormData(prev => ({ ...prev, [name]: numericValue }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }


  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
      valid = false
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(formData.name)) {
      newErrors.name = "Solo se permiten letras y espacios"
      valid = false
    }

    if (formData.lastname && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(formData.lastname)) {
      newErrors.lastname = "Solo se permiten letras y espacios"
      valid = false
    }

    if (!formData.cellphone.trim()) {
      newErrors.cellphone = "El teléfono es requerido"
      valid = false
    } else if (!/^\d{8,15}$/.test(formData.cellphone.trim())) {
      newErrors.cellphone = "Ingrese un número de teléfono válido"
      valid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido"
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Ingrese un correo electrónico válido"
      valid = false
    }

    if (!formData.disctric.trim()) {
      newErrors.disctric = "El distrito de envío es requerido"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const userData = {
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          cellphone: formData.cellphone,
          disctric: formData.disctric,
          message: formData.message,
          active: 1,
        }

        await createEmail(userData)
        alert("¡Formulario enviado con éxito!")

        setFormData({
          name: "",
          lastname: "",
          email: "",
          cellphone: "",
          disctric: "",
          message: ''
        })
        onClose()

      } catch (error) {
        console.error("Error al enviar el formulario:", error)
        alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.")
      }
    }
  }

  // Edwin, aquí agregué la función para manejar el botón "No mostrar de nuevo"
  // y guardé el estado en localStorage.
  const handleDontShowAgain = () => {
    localStorage.setItem("dontShowModal", "true")
    onClose()
  }
  if (!isOpen) return null

  const PeruFlag = () => (
    <svg 
      width="20" 
      height="15" 
      viewBox="0 0 20 15"
      className={styles.flagIcon}
    >
      <rect x="6" y="0" width="8" height="15" fill="white"/>
      <rect x="0" y="0" width="6" height="15" fill="#D91023"/>
      <rect x="14" y="0" width="6" height="15" fill="#D91023"/>
    </svg>
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          
          <div className={styles.imageSection}>
            <img src={modalImage} alt="Imagen promocional" className={styles.promoImage} />
          </div>

          <div className={styles.formSection}>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>

            <div className={styles.formHeader}>
              <h2 className={styles.title}>10% de descuento en tu primera compra</h2>
              <p className={styles.description}>
                Regístrate y disfruta de la maravilla que genera hacer un regalo desde el corazón
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <InputField
                label=""
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                required
                error={errors.name}
              />

              <InputField
                label=""
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Apellido"
                required
                error={errors.lastname}
              />

              <InputField
                label=""
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                error={errors.email}
              />

              <div className={styles.phoneContainer}>
                <div className={styles.countryCode}>
                  <PeruFlag/>
                  <span>+51</span>
                </div>
                <InputField
                  label=""
                  name="cellphone"
                  type="tel"
                  value={formData.cellphone}
                  onChange={handleChange}
                  placeholder="Teléfono (9 digitos)"
                  required
                  error={errors.cellphone}
                  className={styles.phoneInput}
                  maxLength={9}
                />
              </div>

              <InputField
                label=""
                name="disctric"
                value={formData.disctric}
                onChange={handleChange}
                placeholder="Distrito de envío"
                required
                error={errors.disctric}
              />

              <InputField
                label=""
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mensaje"
                required
                error={errors.message}
              />

              <button type="submit" className={styles.submitButton}>
                Enviar
              </button>

              <p className={styles.privacyNote}>
                Al registrarte, aceptas recibir correos electrónicos de marketing. Consulta nuestra{" "}
                <a href="#" className={styles.privacyLink}>
                  política de privacidad
                </a>{" "}
                 y {" "}
                <a href="#" className={styles.privacyLink}>
                  términos de servicio
                </a>{" "}
                para obtener más información.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
