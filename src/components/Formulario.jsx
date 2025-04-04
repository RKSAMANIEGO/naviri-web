"use client";

import React, { useState } from "react";
import styles from "./Formulario.module.css";

export default function Formulario() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Por favor, introduce un correo electrónico válido.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Simulación de una petición con un timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage("¡Gracias por suscribirte! Pronto recibirás nuestras novedades.");
      setMessageType("success");
      setEmail("");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <a href="/politica-privacidad" className={styles.privacyLink}>
              política de privacidad
            </a>
            . Nunca compartiremos tu correo electrónico.
          </p>
        </form>
      </div>
    </div>
  );
}
