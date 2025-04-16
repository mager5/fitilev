'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

// Расширяем стандартные свойства Image компонента
interface OptimizedImageProps extends ImageProps {
  isPriority?: boolean; // Для LCP изображений
  lowQualityUrl?: string; // URL для предварительной загрузки с низким качеством
  loadAfterInteractive?: boolean; // Загрузка после интерактивности страницы
  delay?: number; // Задержка перед загрузкой в мс (для неприоритетных изображений)
}

export default function OptimizedImage({ 
  isPriority = false, 
  lowQualityUrl,
  loadAfterInteractive = false,
  delay = 0,
  ...props 
}: OptimizedImageProps) {
  const [shouldLoad, setShouldLoad] = useState(!loadAfterInteractive);
  const [loaded, setLoaded] = useState(false);

  // Используем эффект для отложенной загрузки, если необходимо
  useEffect(() => {
    if (loadAfterInteractive) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [loadAfterInteractive, delay]);

  return (
    <div className={`relative ${props.className || ''}`} style={props.style}>
      {/* Показываем placeholder с низким качеством до загрузки основного изображения */}
      {lowQualityUrl && !loaded && (
        <div className="absolute inset-0">
          <Image 
            {...props}
            src={lowQualityUrl}
            quality={10}
            style={{ objectFit: props.style?.objectFit || 'cover', filter: 'blur(10px)' }}
            alt={props.alt || "Loading..."}
          />
        </div>
      )}
      
      {/* Основное изображение */}
      {shouldLoad && (
        <Image 
          {...props}
          priority={isPriority}
          fetchPriority={isPriority ? "high" : "auto"}
          loading={isPriority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          className={`${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ${props.className || ''}`}
          sizes={props.sizes || "(max-width: 768px) 100vw, 50vw"} // Default responsive sizes если не указаны другие
        />
      )}
    </div>
  );
} 