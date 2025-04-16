'use client';

import { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithBasePathProps extends Omit<ImageProps, 'src'> {
  src: string;
}

/**
 * Компонент для отображения изображений с учетом basePath
 * Автоматически добавляет префикс /fitilev в продакшн-режиме
 */
const ImageWithBasePath: React.FC<ImageWithBasePathProps> = ({ src, ...props }) => {
  const [path, setPath] = useState(src);

  useEffect(() => {
    // В продакшн-режиме добавляем префикс /fitilev к пути
    if (window.location.hostname === 'mager5.github.io') {
      setPath(`/fitilev${src}`);
    }
  }, [src]);

  return <Image src={path} {...props} />;
};

export default ImageWithBasePath; 