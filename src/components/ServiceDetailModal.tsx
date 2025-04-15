'use client';

import { useEffect, useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const ServiceDetailModal = ({ isOpen, onClose, title, content }: ServiceDetailModalProps) => {
  // Состояние для клиентского рендеринга
  const [isMounted, setIsMounted] = useState(false);
  
  // Рефы для управления фокусом
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementBeforeModal = useRef<Element | null>(null);

  // Инициализируем состояние монтирования при первом рендеринге
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Блокируем прокрутку при открытом модальном окне
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

  // Обработка нажатия клавиши Escape для закрытия модального окна
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        console.log('Escape нажат, закрываем модальное окно');
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  // Управление фокусом и его сохранение
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущий активный элемент
      lastFocusedElementBeforeModal.current = document.activeElement;
      
      // Устанавливаем фокус на кнопку закрытия
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else if (lastFocusedElementBeforeModal.current instanceof HTMLElement) {
      // Возвращаем фокус на элемент, который был активен до открытия модального окна
      lastFocusedElementBeforeModal.current.focus();
    }
  }, [isOpen]);
  
  // Ловушка фокуса - предотвращает выход фокуса за пределы модального окна
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      // Если нажата клавиша Shift вместе с Tab и активен первый элемент,
      // переводим фокус на последний элемент
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // Если нажата клавиша Tab без Shift и активен последний элемент,
      // переводим фокус на первый элемент
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

  // Логируем для отладки
  useEffect(() => {
    console.log('ServiceDetailModal [CLIENT]: isOpen =', isOpen);
  }, [isOpen]);

  // Не рендерим на сервере или если окно закрыто
  if (!isMounted || !isOpen) return null;

  // Создаем портал для рендеринга модального окна
  return createPortal(
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
      >
        {/* Затемнение фона */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black"
          onClick={onClose}
        />

        {/* Модальное окно */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 500, damping: 30 }}
          className="relative z-10 w-[95%] md:w-[90%] max-w-xl bg-[var(--background)] rounded-lg shadow-xl max-h-[90vh] overflow-hidden mx-auto my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Шапка модального окна */}
          <div className="flex justify-between items-center p-4 md:p-6 border-b border-[var(--border-color)]">
            <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">{title}</h2>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
              aria-label="Закрыть"
            >
              <FaTimes size={20} className="md:text-2xl" />
            </button>
          </div>

          {/* Содержимое модального окна */}
          <div className="p-4 md:p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 140px)' }}>
            {content}
          </div>

          {/* Футер модального окна */}
          <div className="p-4 md:p-6 border-t border-[var(--border-color)] flex justify-end">
            <button
              onClick={onClose}
              className="btn-primary text-sm md:text-base px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            >
              Закрыть
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ServiceDetailModal; 