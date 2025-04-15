import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

const MobileContactButtons = () => {
  return (
    <div 
      className="mobile-contact-buttons" 
      role="navigation" 
      aria-label="Быстрые контакты"
    >
      <a
        href="https://wa.me/79184505030"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button group"
        aria-label="Написать в WhatsApp"
      >
        <span className="sr-only">WhatsApp</span>
        <FaWhatsapp size={28} className="text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp
        </span>
      </a>
      <a
        href="https://t.me/Fitil28"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button group"
        aria-label="Написать в Telegram"
      >
        <span className="sr-only">Telegram</span>
        <FaTelegram size={28} className="text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Telegram
        </span>
      </a>
    </div>
  );
};

export default MobileContactButtons; 