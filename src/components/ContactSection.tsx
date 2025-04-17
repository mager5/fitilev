'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTelegram, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';
import { sendEmail } from '../utils/emailjs';
import PolicyLink from './PolicyLink';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: '',
    message: '',
    privacyPolicy: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });
  const [charCount, setCharCount] = useState(0);
  const MAX_MESSAGE_LENGTH = 1000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (name === 'phone') return; // Телефон обрабатывается отдельно
    
    // Обрабатываем чекбокс отдельно
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      // Ограничение длины сообщения
      if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) {
        return;
      }
      
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Обновляем счетчик символов для сообщения
      if (name === 'message') {
        setCharCount(value.length);
      }
    }
    
    // Сбрасываем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Простая валидация телефона
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
    
    // Проверка согласия на обработку персональных данных
    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = 'Необходимо согласие на обработку персональных данных';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    try {
      // Формируем параметры для шаблона EmailJS
      const templateParams = {
        name: formData.name,
        phone_number: formData.phone,
        goal: formData.goal || 'Не указана',
        message: formData.message || 'Не указано',
        time: new Date().toLocaleString('ru-RU'),
        reply_to: formData.name
      };
      
      // Отправляем email через нашу утилиту
      const result = await sendEmail(templateParams);
      
      if (result.success) {
        console.log('Форма успешно отправлена:', formData);
        setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
        // Сбрасываем форму
        setFormData({ name: '', phone: '', goal: '', message: '', privacyPolicy: false });
        setCharCount(0);
      } else {
        throw new Error('Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.'
      });
      setErrors(prev => ({ 
        ...prev, 
        form: 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.' 
      }));
    }
  };

  const socialLinks = [
    {
      name: 'Telegram',
      icon: <FaTelegram className="text-2xl" />,
      url: 'https://t.me/Fitil28',
      color: 'bg-[#0088cc]'
    },
    {
      name: 'YouTube',
      icon: <FaYoutube className="text-2xl" />,
      url: 'https://www.youtube.com/@АлексейФитиль',
      display: 'Алексей Фитиль',
      color: 'bg-[#ff0000]'
    },
    {
      name: 'Телефон',
      icon: <FaPhone className="text-2xl" />,
      url: 'tel:+79181845030',
      display: '+7 (918) 184-50-30',
      color: 'bg-[#25D366]'
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="text-2xl" />,
      url: 'mailto:aleksejj-fitiljov@mail.ru',
      display: 'aleksejj-fitiljov@mail.ru',
      color: 'bg-[#4a7aff]'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-[var(--secondary)] text-[var(--text-primary)]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title inline-block text-[var(--text-primary)]">Контакты</h2>
          <p className="text-lg text-[var(--text-primary)] max-w-3xl mx-auto mt-6">
            Свяжитесь со мной для консультации или записи на тренировку
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Свяжитесь со мной</h3>
            <p className="text-[var(--text-primary)] mb-8">
              Для получения дополнительной информации о моих услугах или чтобы записаться на консультацию, 
              свяжитесь со мной любым удобным способом или заполните форму.
            </p>

            <div className="space-y-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="flex items-start justify-start w-full group no-underline hover:bg-[var(--card-bg-hover)] p-3 rounded-lg transition-all"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className={`${link.color} text-[var(--text-primary)] p-3 rounded-full mr-4 group-hover:scale-105 transition-transform flex-shrink-0`}>
                    {link.icon}
                  </div>
                  <div className="group-hover:translate-x-1 transition-transform flex-grow text-left">
                    <h4 className="font-bold text-[var(--text-primary)] text-left">
                      {link.name}
                    </h4>
                    <p className="text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors text-left">
                      {link.display || link.url.replace(/(https?:\/\/)|(mailto:)|(tel:)/g, '')}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Форма заявки */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-[var(--card-bg)] p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Оставить заявку</h3>
              
              {formStatus.isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-[var(--accent)] text-5xl mb-4">✓</div>
                  <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Спасибо за заявку!</h4>
                  <p className="text-[var(--text-primary)]">Я свяжусь с вами в ближайшее время.</p>
                </div>
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
                      autoComplete="name"
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
                      placeholder="+7 (___) ___-__-__"
                      required
                      className={`w-full ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
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
                      maxLength={MAX_MESSAGE_LENGTH}
                    ></textarea>
                    <div className="flex justify-between">
                      <p id="message-hint" className="mt-1 text-xs text-[var(--text-secondary)]">
                        Опишите ваши цели, имеющиеся заболевания или противопоказания
                      </p>
                      <p className={`mt-1 text-xs ${charCount > MAX_MESSAGE_LENGTH * 0.9 ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                        {charCount}/{MAX_MESSAGE_LENGTH}
                      </p>
                    </div>
                  </div>

                  {/* Чекбокс согласия на обработку персональных данных */}
                  <div className="flex items-start mt-6 bg-[var(--background)] p-4 rounded-lg border border-[var(--border-color)] transition-all">
                    <div className="flex items-center h-5">
                      <input
                        id="privacyPolicy"
                        name="privacyPolicy"
                        type="checkbox"
                        checked={formData.privacyPolicy}
                        onChange={handleChange}
                        className={`h-5 w-5 rounded border-2 accent-[var(--accent)] focus:ring-[var(--accent)] focus:ring-offset-2 transition-all cursor-pointer ${errors.privacyPolicy ? 'border-red-500 bg-red-50' : 'border-[var(--border-color)]'}`}
                        aria-invalid={errors.privacyPolicy ? 'true' : 'false'}
                        aria-describedby={errors.privacyPolicy ? 'privacy-error' : undefined}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacyPolicy" className="text-[var(--text-primary)] font-medium cursor-pointer select-none">
                        Я даю согласие на <PolicyLink className="text-[var(--accent)] font-bold hover:underline transition-all">обработку персональных данных</PolicyLink> и соглашаюсь с политикой конфиденциальности
                      </label>
                      {errors.privacyPolicy && (
                        <p id="privacy-error" className="mt-1 text-sm text-red-600 font-medium">
                          {errors.privacyPolicy}
                        </p>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary w-full relative flex justify-center items-center"
                    disabled={formStatus.isSubmitting}
                    aria-busy={formStatus.isSubmitting}
                  >
                    {formStatus.isSubmitting ? (
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 