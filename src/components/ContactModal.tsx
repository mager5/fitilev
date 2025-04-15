'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import InputMask from 'react-input-mask';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Создаем рефы для ловушки фокуса
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementBeforeModal = useRef<Element | null>(null);

  // Сохраняем элемент, на котором был фокус перед открытием модального окна
  useEffect(() => {
    if (isOpen) {
      lastFocusedElementBeforeModal.current = document.activeElement;
      // Устанавливаем фокус на первый элемент формы
      setTimeout(() => {
        initialFocusRef.current?.focus();
      }, 100);
    } else if (lastFocusedElementBeforeModal.current instanceof HTMLElement) {
      // Возвращаем фокус на предыдущий элемент при закрытии
      lastFocusedElementBeforeModal.current.focus();
    }
  }, [isOpen]);

  // Ловушка фокуса - предотвращает выход фокуса за пределы модального окна
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // Если нажат Shift+Tab и активный элемент - первый, переходим к последнему
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // Если нажат Tab и активный элемент - последний, переходим к первому
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  // Обработка нажатия клавиши Escape для закрытия модального окна
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        console.log('Escape нажат, закрываем контактную форму');
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Блокировка прокрутки при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const formatPhone = (value: string) => {
    if (!value) return value;
    
    // Удаляем все нецифровые символы
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // Форматируем номер телефона
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
    if (phoneNumber.length < 10) return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formattedPhone }));
    
    // Сбрасываем ошибку при изменении поля
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Проверка имени
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать не менее 2 символов';
    }
    
    // Проверка телефона
    if (!formData.phone) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона';
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 11) {
        newErrors.phone = 'Введите корректный номер телефона';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Имитация отправки формы
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Форма отправлена:', formData);
      
      setSubmitSuccess(true);
      
      // Закрываем форму через 2 секунды после успешной отправки
      setTimeout(() => {
        setFormData({ name: '', phone: '', goal: '', message: '' });
        setSubmitSuccess(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      setErrors(prev => ({ 
        ...prev, 
        form: 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') return; // Телефон обрабатывается отдельно
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Сбрасываем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="contact-form-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg mx-4 bg-[var(--secondary)] rounded-lg shadow-xl p-6 z-50"
            onClick={e => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 rounded-full p-1"
              aria-label="Закрыть"
              tabIndex={0}
            >
              <FaTimes size={24} />
            </button>

            <h3 id="contact-form-title" className="text-2xl font-bold mb-6 text-[var(--text-primary)]">
              Оставить заявку
            </h3>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Успешно!</strong>
                <span className="block sm:inline"> Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errors.form && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{errors.form}</span>
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                    Ваше имя *
                  </label>
                  <input
                    ref={initialFocusRef}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Иван Иванов"
                    tabIndex={0}
                    autoComplete="name"
                    autoFocus
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                    placeholder="+7 (___) ___-__-__"
                    className={`w-full ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    tabIndex={0}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="goal" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                    Цель тренировок
                  </label>
                  <select
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full"
                    tabIndex={0}
                  >
                    <option value="">Выберите цель</option>
                    <option value="Похудение">Похудение</option>
                    <option value="Набор массы">Набор массы</option>
                    <option value="Восстановление">Восстановление после травмы</option>
                    <option value="ОФП">Общая физподготовка</option>
                    <option value="Другое">Другое</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full resize-none"
                    aria-describedby="message-hint"
                    placeholder="Опишите ваши цели или задайте вопрос"
                    tabIndex={0}
                  />
                  <p id="message-hint" className="mt-1 text-xs text-[var(--text-secondary)]">
                    Опишите ваши цели, имеющиеся заболевания или противопоказания
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full relative flex justify-center items-center"
                  disabled={isSubmitting}
                  tabIndex={0}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Отправка...</span>
                    </>
                  ) : <span>Отправить заявку</span>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal; 