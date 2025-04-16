import { FaWhatsapp, FaTelegram, FaPhone } from 'react-icons/fa';

const MobileContactButtons = () => {
  return (
    <div 
      className="fixed bottom-6 left-0 right-0 w-full px-8 flex justify-between md:hidden z-50" 
      role="navigation" 
      aria-label="Быстрые контакты"
    >
      <a
        href="https://wa.me/79181845030"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-button bg-[var(--accent)] shadow-lg rounded-full p-4 flex items-center justify-center group"
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
        className="floating-contact-button bg-[var(--accent)] shadow-lg rounded-full p-4 flex items-center justify-center group"
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
        className="floating-contact-button bg-[var(--accent)] shadow-lg rounded-full p-4 flex items-center justify-center group"
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