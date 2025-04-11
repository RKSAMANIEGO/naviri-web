"use client";

import React, { useState } from "react";
import styles from "./Formulario.module.css";
import { createEmail } from "../../services/emailService";

export default function Formulario() {
  const [form, setEmail] = useState({
    email: "",
    active: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const resp = await createEmail(form);
      setIsSubmitting(true);
      setMessage("");

      setMessage("¡Gracias por suscribirte! Pronto recibirás nuestras novedades.");
      setMessageType("success");
      setEmail("");
    } catch (error) {
      setMessage("Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(
      (prevForm) => ({
        ...prevForm,
        [name]: value,
      })   
    );
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContent}>
        <h2 className={styles.title}>Únete a nuestra comunidad</h2>
        <p className={styles.subtitle}>
          Suscríbete a nuestro boletín para recibir consejos de belleza, ofertas exclusivas y ser el primero en conocer
          nuestros nuevos productos.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={form.email}
              name="email"
              onChange={handleChange}
              placeholder="Tu correo electrónico"
              className={styles.emailInput}
              disabled={isSubmitting}
              aria-label="Tu correo electrónico"
            />
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Suscribirse"}
            </button>
          </div>

          {message && <div className={`${styles.message} ${styles[messageType]}`}>{message}</div>}

          <p className={styles.privacyNote}>
            Al suscribirte, aceptas nuestra{" "}
            <a href="/policy" className={styles.privacyLink}>
              política de privacidad
            </a>
            . Nunca compartiremos tu correo electrónico.
          </p>
        </form>
      </div>
    </div>
  );
}
