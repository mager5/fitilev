'use client';

import { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useContactModal from '@/hooks/useContactModal';
import dynamic from 'next/dynamic';

// Динамический импорт компонентов framer-motion, которые не нужны для первоначального рендеринга
const MotionDiv = dynamic(() => import('framer-motion').then(mod => ({ 
  default: mod.motion.div 
})), { ssr: false });

// Оптимизированные URL для изображений с указанием размера для быстрой загрузки
// Используем версии webp вместо jpg для быстрой загрузки на мобильных устройствах
const heroImage = "/images/hero-bg-mobile.webp"; // Локальные оптимизированные изображения вместо unsplash
const heroImageDesktop = "/images/hero-bg.webp"; 
const trainerImage = "/images/trainer.webp";

// Вспомогательные компоненты, разделенные для мемоизации
const HeroButtons = memo(({ onOpen }: { onOpen: () => void }) => (
  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-fade-in">
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
  </div>
));
HeroButtons.displayName = 'HeroButtons';

// Скролл-индикатор - встраиваем SVG напрямую вместо загрузки
const ScrollIndicator = memo(() => (
  <div className="absolute left-0 right-0 bottom-8 flex items-center justify-center cursor-pointer animate-bounce">
    <Link href="#about" aria-label="Прокрутить к разделу Обо мне">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 22L6 12L7.4 10.6L16 19.2L24.6 10.6L26 12L16 22Z" fill="var(--text-primary)"/>
      </svg>
    </Link>
  </div>
));
ScrollIndicator.displayName = 'ScrollIndicator';

// Лениво загружаемое изображение тренера
const TrainerImage = memo(({ shouldLoad }: { shouldLoad: boolean }) => {
  if (!shouldLoad) return null;
  
  return (
    <div className="hidden md:block flex-1 mt-10 md:mt-0 animate-fade-in">
      <div className="relative h-[400px] lg:h-[500px] glass-card rounded-lg overflow-hidden">
        <Image 
          src={trainerImage}
          alt="Персональный тренер" 
          width={500}
          height={800}
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          fetchPriority="low"
        />
      </div>
    </div>
  );
});
TrainerImage.displayName = 'TrainerImage';

// Выносим фоновое изображение в отдельный компонент для лучшего управления жизненным циклом
const HeroBackground = memo(() => {
  // Определяем, мобильное устройство или нет (client-side)
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Проверяем сразу при загрузке
    checkMobile();
    
    // И при изменении размера окна
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const imgSrc = isMobile ? heroImage : heroImageDesktop;
  
  return (
    <div className="absolute inset-0 z-0">
      <Image 
        src={imgSrc}
        alt="Фитнес тренировка" 
        fill 
        style={{ objectFit: 'cover' }}
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75} // Снижаем качество для ускорения загрузки
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
  );
});
HeroBackground.displayName = 'HeroBackground';

const HeroSection = () => {
  // Используем хук для открытия модального окна
  const { onOpen } = useContactModal();
  
  // Состояние для отложенной загрузки изображений, кроме приоритетных
  const [shouldLoadSecondaryImages, setShouldLoadSecondaryImages] = useState(false);
  
  // Загрузка второстепенных изображений после монтирования компонента
  useEffect(() => {
    // Откладываем второстепенные изображения после LCP
    const timer = setTimeout(() => {
      setShouldLoadSecondaryImages(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-[var(--secondary)] text-[var(--text-primary)] overflow-hidden">
      {/* Background Image with Overlay */}
      <HeroBackground />

      <div className="container mx-auto px-4 md:px-6 z-10 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left md:pr-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            <span className="text-[var(--text-primary)]">Алексей</span> <span className="text-[var(--accent)]">Фитиль</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 text-gray-200 animate-fade-in">
            Персональные онлайн тренировки с профессионалом
          </p>
          
          {/* Кнопки */}
          <HeroButtons onOpen={onOpen} />
        </div>

        {/* Hero Image (on desktop) */}
        <TrainerImage shouldLoad={shouldLoadSecondaryImages} />
      </div>

      {/* Scroll Down Indicator */}
      <ScrollIndicator />
    </section>
  );
};

// Мемоизация всего компонента
export default memo(HeroSection); 