'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import useContactModal from '@/hooks/useContactModal';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Добавляем внутренние стили, гарантирующие непрозрачность
const menuStyles = `
  .menu-container {
    background-color: #000000 !important;
    background: #000000 !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    opacity: 1 !important;
  }
`;

// Анимированная иконка бургер-меню
const BurgerIcon = ({ isOpen, onClick }) => {
  return (
    <button
      className="md:hidden relative w-8 h-8 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] transition-all"
      onClick={onClick}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <div className="relative w-6 h-6">
        {/* Верхняя линия */}
        <motion.span 
          className="absolute h-0.5 w-6 bg-current rounded-full"
          style={{ top: '25%', left: 0 }}
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        {/* Средняя линия */}
        <motion.span 
          className="absolute h-0.5 w-6 bg-current rounded-full"
          style={{ top: '50%', left: 0 }}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Нижняя линия */}
        <motion.span 
          className="absolute h-0.5 w-6 bg-current rounded-full"
          style={{ top: '75%', left: 0 }}
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </button>
  );
};

const MobileMenu = ({ isOpen, onClose, navLinks, onContactClick }) => {
  // Предотвращаем скролл при открытом меню
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
  
  // Добавляем обработку клавиши Escape для закрытия меню
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (typeof window === 'undefined') return null;

  // Рисуем меню в body через портал, чтобы избежать наследования стилей
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Затемнение заднего фона */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9998
            }} 
            aria-hidden="true"
          />
          
          {/* Меню с абсолютным позиционированием и явным стилем */}
          <motion.div 
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '300px',
              backgroundColor: 'var(--background)',
              color: 'var(--text-primary)',
              zIndex: 9999,
              boxShadow: '-4px 0 15px rgba(0,0,0,0.5)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Шапка меню с кнопкой закрытия */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '32px'
            }}>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: 'var(--text-primary)'
              }}>
                Меню
              </span>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                aria-label="Закрыть меню"
                style={{ 
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}
                whileHover={{ color: 'var(--accent)' }}
              >
                <FaTimes size={24} />
              </motion.button>
            </div>
            
            {/* Навигационные ссылки с прокруткой */}
            <motion.nav 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                overflow: 'auto',
                maxHeight: 'calc(100vh - 180px)' // Оставляем место для шапки и кнопки внизу
              }}
              role="navigation"
              aria-label="Основная навигация"
            >
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  style={{ 
                    color: 'var(--text-secondary)', 
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    window.location.href = link.href;
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.nav>

            {/* Кнопка "Записаться" */}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              onClick={() => {
                onClose();
                onContactClick();
              }}
              style={{
                marginTop: '20px',
                padding: '14px 20px',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                marginBottom: '20px'
              }}
              aria-label="Записаться на тренировку"
            >
              Записаться
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useContactModal();

  // Все доступные ссылки
  const allNavLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Обо мне', href: '#about' },
    { name: 'Услуги', href: '#services' },
    { name: 'Программы', href: '#programs' },
    { name: 'Преимущества', href: '#advantages' },
    { name: 'Видео', href: '#videos' },
    { name: 'Результаты', href: '#results' },
    { name: 'Отзывы', href: '#testimonials' },
    { name: 'Расписание', href: '#schedule' },
    { name: 'Цены', href: '#pricing' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '#contact' }
  ];
  
  // Основные ссылки для десктопной версии
  const desktopLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Обо мне', href: '#about' },
    { name: 'Услуги', href: '#services' },
    { name: 'Программы', href: '#programs' },
    { name: 'Отзывы', href: '#testimonials' },
    { name: 'Цены', href: '#pricing' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '#contact' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] bg-opacity-95 backdrop-blur-sm border-b border-[var(--border-color)]" role="banner">
        {/* Встроенные стили для меню */}
        <style dangerouslySetInnerHTML={{ __html: menuStyles }} />
        
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="#home" className="text-xl font-bold text-[var(--text-primary)]">
            Алексей<span className="text-[var(--accent)]">Фитиль</span>
          </Link>

          {/* Desktop Navigation - только основные ссылки */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4" role="navigation" aria-label="Основная навигация">
            {desktopLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs lg:text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all py-2 px-1"
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={onOpen}
              className="btn-primary ml-2 text-xs lg:text-sm px-3 py-2"
              aria-label="Записаться на тренировку"
            >
              Записаться
            </button>
          </nav>

          {/* Анимированная иконка бургер-меню */}
          <BurgerIcon 
            isOpen={isOpen} 
            onClick={() => setIsOpen(!isOpen)} 
          />
        </div>
      </header>

      {/* Мобильное меню рендерится через портал, передаем все ссылки */}
      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        navLinks={allNavLinks} 
        onContactClick={onOpen} 
      />
    </>
  );
};

export default Header; 