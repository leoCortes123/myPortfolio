import React, { useEffect, useState } from 'react';
import Earth from '../../assets/images/contactMe/earth.gif';
import letter1 from '../../assets/images/contactMe/letter1.png';
import letter2 from '../../assets/images/contactMe/letter2.png';
import PCPixel from '../../assets/images/contactMe/PCPixel.gif';
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
        if (value && (!/^[0-9+\-\s]+$/.test(value) || value.replace(/\D/g, '').length < 7)) {
          error = 'Ingresa un teléfono válido (mínimo 7 dígitos)';
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
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'phone' || formData[key]) {
        newErrors[key] = validateField(key, formData[key]);
      }
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true });
    const hasErrors = Object.values(newErrors).some(error => error);
    if (hasErrors) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/yourFormId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({ name: '', email: '', phone: '', message: '' });
        setTouched({ name: false, email: false, phone: false, message: false });
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


      <div className={styles.contact}>
        <h2 className={styles.title}>CONTACTAME<span>_</span></h2>
        <div className={styles.subtitle}>ENVÍAME UN MENSAJE</div>

        <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
          {['name', 'email', 'phone', 'message'].map((field) => (
            <div key={field} className={styles.imputContainer}>
              <label htmlFor={field} className={styles.formLabel}>
                {field.toUpperCase()}:
              </label>
              {field === 'message' ? (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field)}
                  onBlur={() => handleBlur(field)}
                  required={field !== 'phone'}
                  className={`${styles.formTextarea} ${activeInput === field ? styles.active : ''} ${touched[field] && errors[field] ? styles.inputError : ''}`}
                  aria-invalid={touched[field] && errors[field] ? 'true' : 'false'}
                  aria-describedby={`${field}-error`}
                />
              ) : (
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field)}
                  onBlur={() => handleBlur(field)}
                  required={field !== 'phone'}
                  placeholder={field === 'phone' ? 'Opcional' : ''}
                  className={`${styles.formInput} ${activeInput === field ? styles.active : ''} ${touched[field] && errors[field] ? styles.inputError : ''}`}
                  aria-invalid={touched[field] && errors[field] ? 'true' : 'false'}
                  aria-describedby={`${field}-error`}
                />
              )}
              <span id={`${field}-error`} className={styles.errorMessage} aria-live="polite">
                {touched[field] && errors[field] ? errors[field] : '\u00A0'}
              </span>
            </div>
          ))}

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
            <div className={styles.successMessage}>✓ MENSAJE ENVIADO</div>
          )}
          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>✗ ERROR AL ENVIAR</div>
          )}
        </form>
      </div>
      <div className={styles.contactAnimation}>
        <div className={styles.Animation}>
          <img src={letter1} alt="letter1" className={styles.letter1} />
          <img src={letter2} alt="letter2" className={styles.letter2} />
        </div>
        <div className={styles.earth}><img src={Earth} alt="Earth" /></div>
        <div className={styles.pc}><img src={PCPixel} alt="Pc Pixel art" /></div>
      </div>
    </div>
  );
}
