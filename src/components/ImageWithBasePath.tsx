'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

// Интерфейс для пропсов, исключающий оригинальный src
interface ImageWithBasePathProps extends Omit<ImageProps, 'src'> {
  src: string;
}

/**
 * Компонент, который автоматически добавляет базовый путь к изображениям.
 * Это позволяет использовать относительные пути в компонентах.
 * Добавлена обработка ошибок с использованием заглушек изображений.
 */
const ImageWithBasePath: React.FC<ImageWithBasePathProps> = ({ src, alt, ...props }) => {
  const [error, setError] = useState(false);

  // Если путь ведет к изображениям блога или отзывов, для которых у нас могут быть проблемы,
  // используем универсальные заглушки
  const handleError = () => {
    setError(true);
  };

  // Определяем заглушку на основе пути
  let fallbackSrc = 'https://via.placeholder.com/800x600?text=Image';

  if (src.includes('/testimonials/')) {
    fallbackSrc = 'https://via.placeholder.com/400x400?text=Avatar';
  } else if (src.includes('/blog/')) {
    fallbackSrc = 'https://via.placeholder.com/800x600?text=Blog+Image';
  }
  
  return (
    <Image 
      src={error ? fallbackSrc : src} 
      alt={alt || 'Image'} 
      onError={handleError}
      {...props} 
    />
  );
};

export default ImageWithBasePath; 