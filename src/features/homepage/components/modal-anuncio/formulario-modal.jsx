"use client"

import { useState, useEffect } from "react"
import styles from "./formulario-modal.module.css"
import InputField from "./input-field"
import modalImage from '../../../../assets/image/logomodal.jpg'

export default function FormularioModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    telefono: "",
    email: "",
    distrito: "",
    servicio: "",
    comoNosConociste: "",
  })

  const [errors, setErrors] = useState({
    nombreCompleto: "",
    telefono: "",
    email: "",
    distrito: "",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = "El nombre completo es requerido"
      valid = false
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
      valid = false
    } else if (!/^\d{8,15}$/.test(formData.telefono.trim())) {
      newErrors.telefono = "Ingrese un número de teléfono válido"
      valid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido"
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Ingrese un correo electrónico válido"
      valid = false
    }

    if (!formData.distrito.trim()) {
      newErrors.distrito = "El distrito de envío es requerido"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Formulario enviado:", formData)
      alert("¡Formulario enviado con éxito!")

      setFormData({
        nombreCompleto: "",
        telefono: "",
        email: "",
        distrito: "",
        servicio: "",
        comoNosConociste: "",
      })

      onClose()
    }
  }

  // Edwin, aquí agregué la función para manejar el botón "No mostrar de nuevo"
  // y guardé el estado en localStorage.
  const handleDontShowAgain = () => {
    localStorage.setItem("dontShowModal", "true")
    onClose()
  }

  if (!isOpen) return null

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
              <h2 className={styles.title}>10% de descuento</h2>
              <h3 className={styles.subtitle}>en tu primera compra</h3>
              <p className={styles.description}>
                Regístrate y disfruta de la maravilla que genera hacer un regalo desde el corazón
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <InputField
                label=""
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                placeholder="Nombre y Apellido"
                required
                error={errors.nombreCompleto}
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
                  <div className={styles.flag}>🇵🇪</div>
                  <span>+51</span>
                </div>
                <InputField
                  label=""
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  required
                  error={errors.telefono}
                  className={styles.phoneInput}
                />
              </div>

              <InputField
                label=""
                name="distrito"
                value={formData.distrito}
                onChange={handleChange}
                placeholder="Distrito de envío"
                required
                error={errors.distrito}
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
