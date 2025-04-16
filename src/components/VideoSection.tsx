'use client';

import { useState, useRef, useEffect, memo, useCallback, useMemo } from 'react';
import { FaPlay, FaCalendarAlt } from 'react-icons/fa';
import { useEffect as useEffectOnce, useState as useStateOnce } from 'react';

interface VideoCardProps {
  title: string;
  description: string;
  embedCode: string;
  youtubeId: string;
  date: string;
}

// Функция для создания правильного пути к изображению с учетом basePath
const getImagePathWithBasePath = (path: string) => {
  if (typeof window !== 'undefined' && window.location.hostname === 'mager5.github.io') {
    return `/fitilev${path}`;
  }
  return path;
};

// Мемоизируем компонент для предотвращения лишних ререндеров
const VideoCard = memo(({ title, description, embedCode, youtubeId, date }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [imagePath, setImagePath] = useState(`/images/video-thumbs/${youtubeId}.jpg`);
  const videoRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  
  // Корректируем путь к изображению при первоначальном рендере
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'mager5.github.io') {
      setImagePath(`/fitilev/images/video-thumbs/${youtubeId}.jpg`);
    }
  }, [youtubeId]);

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

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  // Создаем безопасный код для превью
  const createPreviewEmbedCode = () => {
    try {
      return embedCode
        .replace(/src="([^"]+)"/, (match, src) => {
          if (src.includes('?')) {
            return `src="${src}&autoplay=0&controls=0&showinfo=0&rel=0&mute=1"`;
          }
          return `src="${src}?autoplay=0&controls=0&showinfo=0&rel=0&mute=1"`;
        })
        .replace('allowfullscreen', 'allowfullscreen loading="lazy" onload="this.dataset.loaded=true"');
    } catch (e) {
      console.error('Ошибка при создании превью:', e);
      return '';
    }
  };

  // Создаем безопасный код для воспроизведения
  const createPlayEmbedCode = () => {
    try {
      return embedCode
        .replace(/src="([^"]+)"/, (match, src) => {
          if (src.includes('?')) {
            return `src="${src}&autoplay=1"`;
          }
          return `src="${src}?autoplay=1"`;
        });
    } catch (e) {
      console.error('Ошибка при создании embed кода:', e);
      return embedCode;
    }
  };

  const previewEmbedCode = createPreviewEmbedCode();
  const playEmbedCode = isPlaying ? createPlayEmbedCode() : '';

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg overflow-hidden flex flex-col h-full" role="article" aria-labelledby={`video-title-${youtubeId}`}>
      <div ref={videoRef} className="relative aspect-video bg-gray-200">
        {!isPlaying ? (
          <div className="absolute inset-0">
            {/* Фоновое изображение для быстрой загрузки */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${imagePath}), url(https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg)`,
                filter: 'blur(1px)',
                opacity: iframeLoaded ? 0 : 1,
                transition: 'opacity 0.3s ease'
              }}
              aria-hidden="true"
            />
            
            {/* Используем iframe для превью */}
            <div 
              className="w-full h-full opacity-0" 
              style={{ opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
              dangerouslySetInnerHTML={{ __html: previewEmbedCode }} 
              aria-hidden="true"
            />
            
            {/* Поверх iframe помещаем кнопку воспроизведения */}
            <button 
              ref={playButtonRef}
              className="absolute inset-0 w-full h-full block focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 bg-black/30 hover:bg-black/40 transition-colors z-10"
              onClick={handlePlay}
              aria-label={`Воспроизвести видео: ${title}`}
              tabIndex={0}
            >
              <div className="h-16 w-16 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto" aria-hidden="true">
                <FaPlay className="text-white text-xl ml-1" />
              </div>
            </button>
          </div>
        ) : (
          <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: playEmbedCode }} />
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-[var(--text-secondary)] mb-3">
          <FaCalendarAlt className="mr-2" aria-hidden="true" />
          <span>{date}</span>
        </div>
        <h3 id={`video-title-${youtubeId}`} className="text-xl font-bold mb-3 text-[var(--text-primary)] line-clamp-2">{title}</h3>
        <p className="text-[var(--text-secondary)] mb-4 line-clamp-3">{description}</p>
      </div>
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

// Мемоизируем список видео, чтобы избежать повторных вычислений при ререндере
const VideoSection = () => {
  // Извлекаем ID видео из URL YouTube - улучшенная функция
  const extractYoutubeId = useCallback((embedCode: string): string => {
    // Явно указываем ID для известных видео
    const knownVideos: Record<string, string> = {
      'HsMGLZXX5j4': 'HsMGLZXX5j4',
      'ZTqV32j8mQ4': 'ZTqV32j8mQ4',
      'pOXz43QBnpA': 'pOXz43QBnpA'
    };
    
    // Ищем ID в тексте
    for (const id of Object.keys(knownVideos)) {
      if (embedCode.includes(id)) {
        return id;
      }
    }
    
    // Пробуем найти в URL
    try {
      const regex = /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i;
      const match = embedCode.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    } catch (error) {
      console.error('Ошибка при извлечении ID:', error);
    }
    
    return '';
  }, []);

  // Добавляем отладочную функцию для проверки URLs превью
  const getYouTubeThumbnailUrl = (id: string) => {
    const url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    return url;
  };

  // Данные для видео
  const videosData = [
    {
      title: 'Лечебная гимнастика при остеохондрозе шейного отдела позвоночника',
      description: 'Простые и эффективные упражнения, которые помогут снять напряжение в шейном отделе, улучшить кровообращение и предотвратить развитие остеохондроза.',
      embedCode: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/HsMGLZXX5j4?si=stA0WRpNglb17HAG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      date: '10 мая 2023'
    },
    {
      title: 'Комплекс упражнений для спины при сидячей работе',
      description: 'Упражнения для тех, кто проводит много времени за компьютером. Помогают снять напряжение в позвоночнике и предотвратить проблемы со спиной.',
      embedCode: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/ZTqV32j8mQ4?si=eIhw7KdxehX24S15" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      date: '22 июня 2023'
    },
    {
      title: 'Тренировка для похудения в домашних условиях',
      description: 'Интенсивная тренировка для сжигания калорий. Не требует специального оборудования и подходит для выполнения дома.',
      embedCode: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/pOXz43QBnpA?si=yFu3SaVNxJ3R58kk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      date: '5 июля 2023'
    }
  ];

  // Мемоизируем обработанные видео с идентификаторами YouTube
  const videos = useMemo(() => {
    return videosData.map(video => ({
      ...video,
      youtubeId: extractYoutubeId(video.embedCode)
    }));
  }, [extractYoutubeId]);

  return (
    <section id="videos" className="bg-[var(--background)] py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Видео тренировки</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-[var(--text-secondary)]">
          Полезные видео-уроки и тренировки, которые помогут вам заниматься в удобное время и в любом месте.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {videos.map((video, index) => (
            <div key={video.youtubeId} role="listitem" tabIndex={0}>
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(VideoSection); 