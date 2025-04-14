import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

const MobileContactButtons = () => {
  return (
    <div className="mobile-contact-buttons">
      <a
        href="https://wa.me/79184505030"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button"
        aria-label="Написать в WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
      <a
        href="https://t.me/Fitil28"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button"
        aria-label="Написать в Telegram"
      >
        <FaTelegram size={24} />
      </a>
    </div>
  );
};

export default MobileContactButtons; 