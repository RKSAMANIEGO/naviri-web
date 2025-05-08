import { useState } from "react"
import styles from "../styles/ContactPage.module.css"
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { createEmail } from "../services/emailService"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    cellphone: "",
    disctric: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    cellphone: "",
    disctric: "",
    message: "",
  })

  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: false,
    message: "",
  })

  const validateField = (name, value) => {
    let error = ""

    switch (name) {
      case "name":
      case "lastname":
        if (!value.trim()) {
          error = "Este campo es requerido"
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value)) {
          error = "Solo se permiten letras y espacios"
        } else if (value.length < 2) {
          error = "Mínimo 2 caracteres"
        }
        break

      case "email":
        if (!value.trim()) {
          error = "Este campo es requerido"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Formato de correo inválido"
        }
        break

      case "cellphone":
        if (!value.trim()) {
          error = "Este campo es requerido"
        } else if (!/^[0-9]+$/.test(value)) {
          error = "Solo se permiten números"
        } else if (value.length !== 9) {
          error = "Debe tener 9 dígitos"
        }
        break

      case "disctric":
        if (!value.trim()) {
          error = "Este campo es requerido"
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value)) {
          error = "Solo se permiten letras y espacios"
        } else if (value.length < 2) {
          error = "Mínimo 2 caracteres"
        }
        break

      case "message":
        if (!value.trim()) {
          error = "Este campo es requerido"
        } else if (value.length < 10) {
          error = "Mínimo 10 caracteres"
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value)) {
          error = "Solo se permiten letras y espacios"
        }
        break

      default:
        break
    }
    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let formIsValid = true
    const newErrors = {}

    Object.keys(formData).forEach((key) => {
      if (key !== "disctric" || (key === "disctric" && formData[key].trim())) {
        const error = validateField(key, formData[key])
        newErrors[key] = error
        if (error) formIsValid = false
      }
    })

    setErrors(newErrors)

    if (!formIsValid) {
      setSubmissionStatus({
        success: false,
        error: true,
        message: "Por favor completa correctamente todos los campos requeridos",
      })
      return
    }

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
      setSubmissionStatus({
        success: true,
        error: false,
        message: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      })

      setFormData({
        name: "",
        lastname: "",
        email: "",
        cellphone: "",
        disctric: "",
        message: "",
      })
    } catch (error) {
      setSubmissionStatus({
        success: false,
        error: true,
        message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      })
      console.error("Error al enviar el mensaje:", error)
    }
  }

  return (
    <div className={styles.contactPage}>
      {/* Decorative elements */}
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>

      <div className={styles.contactHeader}>
        <h1>Contáctanos</h1>
        <p>Estamos aquí para ayudarte con cualquier consulta o servicio que necesites</p>
      </div>

      <div className={styles.contactContent}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FaWhatsapp className={styles.icon} />
            </div>
            <h3>WhatsApp</h3>
            <p>Contáctanos directamente a nuestro número de WhatsApp para una respuesta rápida</p>
            <p>+51 927 987 259</p>
            <a href="https://wa.me/+51927987259" target="_blank" rel="noopener noreferrer">
              Enviar mensaje
            </a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FaEnvelope className={styles.icon} />
            </div>
            <h3>Correo Electrónico</h3>
            <p>Escríbenos a nuestro correo electrónico para consultas y cotizaciones</p>
            <p>info@navinatubelleza.com</p>
            <a href="mailto:info@navinatubelleza.com">Enviar email</a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FaMapMarkerAlt className={styles.icon} />
            </div>
            <h3>Ubicación</h3>
            <p>Visítanos en nuestra ubicación en Lima para conocer nuestros servicios</p>
            <p>Lima, Perú</p>
            <a href="https://goo.gl/maps/..." target="_blank" rel="noopener noreferrer">
              Ver en mapa
            </a>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Envíanos un mensaje</h2>
          {submissionStatus.message && (
            <div className={`${styles.alert} ${submissionStatus.success ? styles.success : styles.error}`}>
              {submissionStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? styles.errorInput : ""}
                />
                {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Apellido"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={errors.lastname ? styles.errorInput : ""}
                />
                {errors.lastname && <span className={styles.errorMessage}>{errors.lastname}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.errorInput : ""}
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="cellphone"
                  placeholder="Celular (9 dígitos)"
                  value={formData.cellphone}
                  onChange={handleChange}
                  maxLength="9"
                  className={errors.cellphone ? styles.errorInput : ""}
                />
                {errors.cellphone && <span className={styles.errorMessage}>{errors.cellphone}</span>}
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="disctric"
                  placeholder="Distrito"
                  value={formData.disctric}
                  onChange={handleChange}
                  className={errors.disctric ? styles.errorInput : ""}
                />
                {errors.disctric && <span className={styles.errorMessage}>{errors.disctric}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Mensaje (mínimo 10 caracteres)"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? styles.errorInput : ""}
              ></textarea>
              {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage