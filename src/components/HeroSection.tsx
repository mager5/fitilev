'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageWithBasePath from './ImageWithBasePath';
import useContactModal from '@/hooks/useContactModal';

// Стили анимаций для плавного появления
const animationStyles = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes slideUp {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeSlideRight {
    0% { opacity: 0; transform: translateX(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .hero-section {
    background-color: var(--background); /* Фон всегда виден */
  }
  
  .hero-content-wrapper {
    visibility: hidden;
    opacity: 0;
  }
  
  .hero-content-wrapper.loaded {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s ease-out;
  }
  
  .hero-content.loaded .hero-title,
  .hero-content.loaded .hero-description,
  .hero-content.loaded .hero-buttons {
    animation: slideUp 0.8s ease-out;
  }
  
  .hero-content.loaded .hero-description {
    animation-delay: 0.1s;
  }
  
  .hero-content.loaded .hero-buttons {
    animation-delay: 0.2s;
  }
  
  .hero-image-container {
    background-color: var(--secondary); /* Фон под изображением */
    position: relative;
    overflow: hidden;
  }
  
  .hero-image-container.loaded {
    animation: fadeIn 0.8s ease-out;
  }
  
  .hero-image {
    opacity: 0;
  }
  
  .hero-image.loaded {
    opacity: 1;
    transition: opacity 0.8s ease-out;
  }
`;

const HeroSection = () => {
  // Используем хук для открытия модального окна
  const { onOpen } = useContactModal();
  // Состояние загрузки шрифтов и изображений
  const [contentLoaded, setContentLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Отслеживаем загрузку шрифтов и картинки
  useEffect(() => {
    let fontPromise: Promise<any> = Promise.resolve();
    
    // Проверка загрузки шрифтов
    if (typeof document !== 'undefined' && document.fonts) {
      fontPromise = document.fonts.ready;
    }
    
    // Когда шрифты загружены, показываем контент
    fontPromise.then(() => {
      console.log('Шрифты загружены');
      // Небольшая задержка для гарантии рендеринга
      setTimeout(() => {
        setContentLoaded(true);
      }, 50);
    }).catch(err => {
      console.error('Ошибка загрузки шрифтов:', err);
      setContentLoaded(true);
    });
  }, []);

  // Обработчик загрузки изображения тренера
  const handleTrainerImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section id="home" className="hero-section relative h-screen flex items-center justify-center bg-[var(--secondary)] text-[var(--text-primary)] overflow-hidden">
      {/* Встраиваем стили анимации */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* Background Image with Overlay */}
      <div id="hero-bg-container" className="absolute inset-0 z-0 overflow-hidden">
        <ImageWithBasePath 
          src="/images/backgrounds/fitness.jpg"
          alt="Фитнес тренировка" 
          fill 
          style={{ objectFit: 'cover' }}
          priority
          loading="eager"
          fetchPriority="high"
        />
        <div 
          className="absolute inset-0 bg-black z-[2]" 
          style={{ opacity: 0.6 }}
        ></div>
      </div>

      <div className={`hero-content-wrapper container mx-auto px-4 md:px-6 z-10 flex flex-col md:flex-row items-center ${contentLoaded ? 'loaded' : ''}`}>
        {/* Text Content - появляется после загрузки шрифтов */}
        <div className={`hero-content flex-1 text-center md:text-left md:pr-10 ${contentLoaded ? 'loaded' : ''}`}>
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-[var(--text-primary)]">Алексей</span> <span className="text-[var(--accent)]">Фитиль</span>
          </h1>
          <p className="hero-description text-xl md:text-2xl mb-6 text-gray-200">
            Персональные онлайн тренировки с профессионалом
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
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
        </div>

        {/* Hero Image (on desktop) - появляется после загрузки */}
        <div className={`hidden md:block flex-1 mt-10 md:mt-0 ${contentLoaded ? 'loaded' : ''}`}>
          <div className={`hero-image-container relative h-[400px] lg:h-[500px] glass-card rounded-lg overflow-hidden ${contentLoaded ? 'loaded' : ''}`}>
            <div className={`hero-image absolute inset-0 ${imageLoaded ? 'loaded' : ''}`}>
              <ImageWithBasePath 
                src="/images/backgrounds/trainer.jpg"
                alt="Персональный тренер" 
                fill 
                style={{ objectFit: 'cover' }}
                priority
                onLoadingComplete={handleTrainerImageLoad}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator - появляется только когда все загружено */}
      <div className={`absolute left-0 right-0 bottom-8 flex items-center justify-center cursor-pointer animate-bounce ${contentLoaded ? 'opacity-100' : 'opacity-0'}`}
           style={{ transition: 'opacity 0.3s ease-out' }}>
        <Link href="#about">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 22L6 12L7.4 10.6L16 19.2L24.6 10.6L26 12L16 22Z" fill="var(--text-primary)"/>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection; 