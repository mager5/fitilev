'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTelegram, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    // Имитация отправки формы
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      setFormData({ name: '', phone: '', goal: '', message: '' });
    }, 1000);
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
      url: '#',
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
                <div key={index} className="flex items-center">
                  <a 
                    href={link.url} 
                    className={`${link.color} text-[var(--text-primary)] p-3 rounded-full mr-4`}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)]">{link.name}</h4>
                    <p className="text-[var(--text-primary)]">{link.display || link.url.replace(/(https?:\/\/)|(mailto:)|(tel:)/g, '')}</p>
                  </div>
                </div>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">Ваше имя *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">Телефон *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="goal" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">Цель тренировок</label>
                    <select 
                      id="goal" 
                      name="goal" 
                      value={formData.goal}
                      onChange={handleChange}
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
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">Сообщение</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={formStatus.isSubmitting}
                  >
                    {formStatus.isSubmitting ? 'Отправка...' : 'Отправить заявку'}
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