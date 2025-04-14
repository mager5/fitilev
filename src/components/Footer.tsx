'use client';

import Link from 'next/link';
import { FaTelegram, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: <FaTelegram size={20} />,
      url: 'https://t.me/Fitil28',
      label: 'Telegram'
    },
    {
      icon: <FaYoutube size={20} />,
      url: '#',
      label: 'YouTube'
    },
    {
      icon: <FaPhone size={18} />,
      url: 'tel:+79181845030',
      label: 'Телефон'
    },
    {
      icon: <FaEnvelope size={18} />,
      url: 'mailto:aleksejj-fitiljov@mail.ru',
      label: 'Email'
    }
  ];

  const quickLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Обо мне', href: '#about' },
    { name: 'Услуги', href: '#services' },
    { name: 'Программы', href: '#programs' },
    { name: 'Цены', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Контакты', href: '#contact' }
  ];

  return (
    <footer className="bg-[var(--background)] text-[var(--text-primary)] pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          <div>
            <Link href="#home" className="text-xl md:text-2xl font-bold mb-4 inline-block">
              Алексей <span className="text-[var(--accent)]">Фитиль</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Персональный фитнес-тренер с 7-летним опытом. Онлайн-тренировки, индивидуальный подход,
              профессиональное сопровождение.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Контакты</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-2 text-[var(--accent)]" />
                <span>+7 (918) 184-50-30</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-2 text-[var(--accent)]" />
                <span>aleksejj-fitiljov@mail.ru</span>
              </li>
              <li className="flex items-start">
                <FaTelegram className="mt-1 mr-2 text-[var(--accent)]" />
                <span>@Fitil28</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Алексей Фитиль. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 