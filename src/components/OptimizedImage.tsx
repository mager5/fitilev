'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
}

/**
 * Компонент OptimizedImage для улучшения производительности загрузки изображений
 * Поддерживает ленивую загрузку, оптимизацию размеров и отслеживание загрузки
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Обработчик загрузки изображения
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
    // Сообщаем о метрике LCP
    if (priority) {
      try {
        if ('performance' in window) {
          const entries = performance.getEntriesByType('element');
          if (entries && entries.length) {
            console.log('LCP candidate loaded:', entries[entries.length - 1]);
          }
        }
      } catch (e) {
        // Игнорируем ошибки, связанные с Performance API
      }
    }
  };

  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setIsError(true);
    console.warn(`Не удалось загрузить изображение: ${src}`);
  };

  // Возвращаем заглушку в случае ошибки
  if (isError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: width || '100%', height: height || '300px' }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-500">Изображение недоступно</span>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${isLoaded ? 'loaded' : 'loading'} ${className}`}>
      {inView || priority ? (
        <Image
          src={src}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
          sizes={sizes}
          quality={quality}
          priority={priority}
          fill={fill}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        // Показываем заглушку до того, как изображение войдет в область видимости
        <div 
          className={`bg-gray-100 animate-pulse ${className}`}
          style={{ width: width || '100%', height: height || '300px' }}
          role="img"
          aria-label={`Загрузка: ${alt}`}
        />
      )}
    </div>
  );
};

export default OptimizedImage; 