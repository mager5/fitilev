'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import useContactModal from '@/hooks/useContactModal';

const HeroSection = () => {
  // Используем хук для открытия модального окна
  const { onOpen } = useContactModal();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-[var(--secondary)] text-[var(--text-primary)] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070"
          alt="Фитнес тренировка" 
          fill 
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-center md:text-left md:pr-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[var(--text-primary)]">Алексей</span> <span className="text-[var(--accent)]">Фитиль</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-6 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Персональные онлайн тренировки с профессионалом
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={onOpen} 
              className="btn-primary responsive-btn"
              data-short-text="Записаться"
            >
              <span>Записаться на тренировку</span>
            </button>
            <Link 
              href="#services" 
              className="btn-secondary flex items-center justify-center responsive-btn min-w-[120px] sm:min-w-[140px]" 
              data-short-text="Ещё"
            >
              <span>Узнать больше</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Image (on desktop) */}
        <motion.div 
          className="hidden md:block flex-1 mt-10 md:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative h-[400px] lg:h-[500px] glass-card rounded-lg overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1740"
              alt="Персональный тренер" 
              fill 
              style={{ objectFit: 'cover' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute left-0 right-0 bottom-8 flex items-center justify-center cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Link href="#about">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 22L6 12L7.4 10.6L16 19.2L24.6 10.6L26 12L16 22Z" fill="var(--text-primary)"/>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection; 