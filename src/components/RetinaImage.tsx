'use client';

import { useState, useEffect, memo } from 'react';
import Image, { ImageProps } from 'next/image';

interface RetinaImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  srcRetina?: string; // Путь к ретина-версии изображения (2x)
  srcRetina3x?: string; // Путь к версии изображения с ещё более высоким разрешением (3x)
  fallbackSrc?: string; // Запасной источник изображения, если основной не загрузится
  alt: string;
  className?: string;
  onLoad?: () => void;
}

/**
 * Компонент для работы с ретина-изображениями
 * Автоматически подбирает подходящее изображение в зависимости от устройства
 * и плотности пикселей (DPR - device pixel ratio)
 */
const RetinaImage = ({
  src,
  srcRetina,
  srcRetina3x,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  onLoad,
  ...props
}: RetinaImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [devicePixelRatio, setDevicePixelRatio] = useState<number>(1);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Определяем плотность пикселей устройства
  useEffect(() => {
    // Используем window.devicePixelRatio для определения плотности пикселей
    const detectPixelRatio = () => {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      setDevicePixelRatio(dpr);
      
      // Выбираем подходящее изображение в зависимости от DPR
      if (dpr >= 3 && srcRetina3x) {
        setImageSrc(srcRetina3x);
      } else if (dpr >= 2 && srcRetina) {
        setImageSrc(srcRetina);
      } else {
        setImageSrc(src);
      }
    };

    detectPixelRatio();
    
    // Слушаем изменения ориентации, которые могут влиять на dpr на некоторых устройствах
    window.addEventListener('resize', detectPixelRatio);
    return () => {
      window.removeEventListener('resize', detectPixelRatio);
    };
  }, [src, srcRetina, srcRetina3x]);

  // Обработчики загрузки и ошибок
  const handleLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className || ''} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transition: 'opacity 0.3s ease',
        ...props.style,
      }}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default memo(RetinaImage); 