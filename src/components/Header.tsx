'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import useContactModal from '@/hooks/useContactModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useContactModal();

  const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Обо мне', href: '#about' },
    { name: 'Услуги', href: '#services' },
    { name: 'Цены', href: '#pricing' },
    { name: 'Контакты', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] bg-opacity-95 backdrop-blur-sm border-b border-[var(--border-color)]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="#home" className="text-xl font-bold text-[var(--text-primary)]">
          Алексей<span className="text-[var(--accent)]">Фитиль</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm lg:text-base text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all"
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={onOpen}
            className="btn-primary ml-2"
          >
            Записаться
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[var(--text-primary)] hover:text-[var(--accent)] transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars size={24} />
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 bottom-0 w-[300px] bg-[var(--secondary)] z-50 p-6 flex flex-col"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-[var(--text-primary)]">Меню</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name}
                      href={link.href}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onOpen();
                  }}
                  className="btn-primary mt-8"
                >
                  Записаться
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 