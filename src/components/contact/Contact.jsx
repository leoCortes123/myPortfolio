import React, { useEffect, useState } from 'react';
import styles from './styles/Contact.module.scss';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validar el formulario cada vez que cambien los datos o los errores
    const isValid = !Object.values(errors).some(error => error) &&
      Object.values(formData).every(field => field.trim() || field === formData.phone);
    setIsFormValid(isValid);
  }, [formData, errors]);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'El nombre es requerido';
        } else if (value.length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = 'El nombre solo puede contener letras y espacios';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Ingresa un email válido';
        }
        break;
      case 'phone':
        if (value && !/^[0-9+\-\s]+$/.test(value)) {
          error = 'Ingresa un teléfono válido';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'El mensaje es requerido';
        } else if (value.length < 10) {
          error = 'El mensaje debe tener al menos 10 caracteres';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar solo si el campo ha sido tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));

    // Validar el campo cuando pierde el foco
    const error = validateField(fieldName, formData[fieldName]);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    setActiveInput(null);
  };

  const handleFocus = (fieldName) => {
    setActiveInput(fieldName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'phone' || formData[key]) { // El teléfono es opcional
        newErrors[key] = validateField(key, formData[key]);
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    // Verificar si hay errores
    const hasErrors = Object.values(newErrors).some(error => error);
    if (hasErrors) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/leocortes3567@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTouched({
          name: false,
          email: false,
          phone: false,
          message: false
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.title}>CONTACT<span>_</span></h2>
      <div className={styles.subtitle}>¡HABLEMOS! ENVÍAME UN MENSAJE</div>

      <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
        <div className={`${styles.formGroup} ${activeInput === 'name' ? styles.active : ''} ${touched.name && errors.name ? styles.error : ''}`}>
          <label htmlFor="name" className={styles.label}>NOMBRE:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
            required
            className={styles.input}
          />
          {touched.name && errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>

        <div className={styles.doubleField}>
          <div className={`${styles.formGroup} ${activeInput === 'email' ? styles.active : ''} ${touched.email && errors.email ? styles.error : ''}`}>
            <label htmlFor="email" className={styles.label}>EMAIL:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              required
              className={styles.input}
            />
            {touched.email && errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={`${styles.formGroup} ${activeInput === 'phone' ? styles.active : ''} ${touched.phone && errors.phone ? styles.error : ''}`}>
            <label htmlFor="phone" className={styles.label}>TELÉFONO:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => handleFocus('phone')}
              onBlur={() => handleBlur('phone')}
              className={styles.input}
              placeholder="Opcional"
            />
            {touched.phone && errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
          </div>
        </div>

        <div className={`${styles.formGroup} ${activeInput === 'message' ? styles.active : ''} ${touched.message && errors.message ? styles.error : ''}`}>
          <label htmlFor="message" className={styles.label}>MENSAJE:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={() => handleBlur('message')}
            required
            className={styles.textarea}
          />
          {touched.message && errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className={styles.submitButton}
          >
            <span className={styles.buttonText}>
              {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
            </span>
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className={styles.successMessage}>
            ✓ MENSAJE ENVIADO
          </div>
        )}
        {submitStatus === 'error' && (
          <div className={styles.errorMessage}>
            ✗ ERROR AL ENVIAR
          </div>
        )}
      </form>
    </div>
  );
};
