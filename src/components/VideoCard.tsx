'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { FaPlay, FaCalendarAlt } from 'react-icons/fa';
import RetinaImage from './RetinaImage';

export interface VideoCardProps {
  title: string;
  description: string;
  embedCode: string;
  youtubeId: string;
  date: string;
}

// Мемоизируем компонент для предотвращения лишних ререндеров
const VideoCard = ({ title, description, embedCode, youtubeId, date }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  // Обработка клика за пределами видео для остановки воспроизведения на мобильных устройствах
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isPlaying && videoRef.current && !videoRef.current.contains(event.target as Node)) {
        setIsPlaying(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPlaying]);

  // Обработка клавиши ESC для закрытия видео
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (isPlaying && event.key === 'Escape') {
        setIsPlaying(false);
        // Возвращаем фокус на кнопку воспроизведения
        setTimeout(() => {
          playButtonRef.current?.focus();
        }, 50);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Получаем URL для разных разрешений YouTube превью
  const getThumbUrls = () => {
    return {
      // Локальное изображение
      normal: `/images/video-thumbs/${youtubeId}.jpg`,
      // YouTube превью разных размеров
      standard: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`, // 480x360
      medium: `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`, // 320x180
      high: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`, // 480x360
      retina: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`, // 1280x720 (HD) для ретина-дисплеев
    };
  };

  const thumbUrls = getThumbUrls();

  // Создаем безопасный код для воспроизведения
  const createPlayEmbedCode = () => {
    try {
      // Для ретина-дисплеев устанавливаем высокое качество видео
      const highQualityParam = window.devicePixelRatio >= 2 ? '&vq=hd720' : '';
      
      return embedCode
        .replace(/src="([^"]+)"/, (match, src) => {
          if (src.includes('?')) {
            return `src="${src}&autoplay=1${highQualityParam}"`;
          }
          return `src="${src}?autoplay=1${highQualityParam}"`;
        });
    } catch (e) {
      console.error('Ошибка при создании embed кода:', e);
      return embedCode;
    }
  };

  // Используем RetinaImage компонент для оптимизации
  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg overflow-hidden flex flex-col h-full" role="article" aria-labelledby={`video-title-${youtubeId}`}>
      <div ref={videoRef} className="relative aspect-video bg-gray-800">
        {!isPlaying ? (
          <div className="absolute inset-0">
            {/* Используем RetinaImage для автоматического выбора правильного разрешения */}
            <RetinaImage 
              src={thumbUrls.normal}
              srcRetina={thumbUrls.retina}
              fallbackSrc={thumbUrls.high}
              alt={`Превью видео: ${title}`}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: thumbLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onLoad={() => setThumbLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            
            {/* Поверх изображения помещаем кнопку воспроизведения */}
            <button 
              ref={playButtonRef}
              className="absolute inset-0 w-full h-full block focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 bg-black/30 hover:bg-black/40 transition-colors z-10"
              onClick={handlePlay}
              aria-label={`Воспроизвести видео: ${title}`}
              tabIndex={0}
            >
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto" aria-hidden="true">
                <FaPlay className="text-white text-xl ml-1" />
              </div>
            </button>
          </div>
        ) : (
          <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: createPlayEmbedCode() }} />
        )}
      </div>
      
      <div className="p-4 md:p-6 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-[var(--text-secondary)] mb-2 md:mb-3">
          <FaCalendarAlt className="mr-2" aria-hidden="true" />
          <span>{date}</span>
        </div>
        <h3 id={`video-title-${youtubeId}`} className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[var(--text-primary)] line-clamp-2">{title}</h3>
        <p className="text-sm md:text-base text-[var(--text-secondary)] mb-2 md:mb-4 line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default memo(VideoCard); 