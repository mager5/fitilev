'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp, FaTelegram, FaPhone } from 'react-icons/fa';

const MobileContactButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Функция для проверки, прокручена ли страница до/ниже секции услуг
    const checkScrollPosition = () => {
      const servicesSection = document.getElementById('services');
      
      if (servicesSection) {
        const servicesSectionTop = servicesSection.getBoundingClientRect().top;
        // Если верхняя граница секции услуг находится выше середины экрана,
        // или уже прокручена за пределы видимости вверх, показываем панель
        setIsVisible(servicesSectionTop <= window.innerHeight / 2);
      }
    };

    // Проверяем при первой загрузке
    checkScrollPosition();
    
    // Добавляем обработчик события прокрутки
    window.addEventListener('scroll', checkScrollPosition);
    
    // Очистка при размонтировании
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 left-0 right-0 w-full px-8 flex justify-between md:hidden z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      role="navigation" 
      aria-label="Быстрые контакты"
    >
      <a
        href="https://wa.me/79181845030"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-button bg-[var(--accent)] backdrop-blur-md shadow-xl rounded-full p-3 flex items-center justify-center group border border-white border-opacity-20"
        aria-label="Написать в WhatsApp"
      >
        <span className="sr-only">WhatsApp</span>
        <FaWhatsapp size={30} className="text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp
        </span>
      </a>
      <a
        href="https://t.me/Fitil28"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-button bg-[var(--accent)] backdrop-blur-md shadow-xl rounded-full p-3 flex items-center justify-center group border border-white border-opacity-20"
        aria-label="Написать в Telegram"
      >
        <span className="sr-only">Telegram</span>
        <FaTelegram size={30} className="text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Telegram
        </span>
      </a>
      <a
        href="tel:+79181845030"
        className="floating-contact-button bg-[var(--accent)] backdrop-blur-md shadow-xl rounded-full p-3 flex items-center justify-center group border border-white border-opacity-20"
        aria-label="Позвонить"
      >
        <span className="sr-only">Телефон</span>
        <FaPhone size={30} className="text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Позвонить
        </span>
      </a>
    </div>
  );
};

export default MobileContactButtons; 