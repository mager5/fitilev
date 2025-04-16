'use client';

import { useState, useRef, useEffect, memo, useCallback, useMemo } from 'react';
import { FaPlay, FaCalendarAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Динамический импорт компонента VideoCard для отложенной загрузки
const VideoCard = dynamic(() => import('./VideoCard'), { 
  loading: () => <VideoCardSkeleton />,
  ssr: false
});

// Скелетон для VideoCard
const VideoCardSkeleton = () => (
  <div className="bg-[var(--card-bg)] rounded-lg shadow-lg overflow-hidden flex flex-col h-full animate-pulse">
    <div className="relative aspect-video bg-gray-700"></div>
    <div className="p-6 flex-grow flex flex-col">
      <div className="h-4 bg-gray-700 rounded w-1/4 mb-3"></div>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
  </div>
);

// Мемоизируем список видео, чтобы избежать повторных вычислений при ререндере
const VideoSection = () => {
  const [videosLoaded, setVideosLoaded] = useState(false);
  
  // Используем IntersectionObserver для отложенной загрузки видео при прокрутке
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const options = {
      rootMargin: '200px', // Загружаем чуть раньше, чем секция появится на экране
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Загружаем видео с задержкой, чтобы не блокировать основной поток
          setTimeout(() => {
            setVideosLoaded(true);
          }, 500);
          observer.disconnect();
        }
      });
    }, options);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

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
    console.log('URL превью:', url);
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

  // Скелетоны для предварительной визуализации
  const videoSkeletons = Array(3).fill(0).map((_, index) => (
    <div key={`skeleton-${index}`} role="listitem" tabIndex={0}>
      <VideoCardSkeleton />
    </div>
  ));

  return (
    <section id="videos" ref={sectionRef} className="bg-[var(--background)] py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Видео тренировки</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-[var(--text-secondary)]">
          Полезные видео-уроки и тренировки, которые помогут вам заниматься в удобное время и в любом месте.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {videosLoaded 
            ? videos.map((video) => (
                <div key={video.youtubeId} role="listitem" tabIndex={0}>
                  <VideoCard 
                    title={video.title} 
                    description={video.description} 
                    embedCode={video.embedCode} 
                    youtubeId={video.youtubeId} 
                    date={video.date} 
                  />
                </div>
              ))
            : videoSkeletons
          }
        </div>
      </div>
    </section>
  );
};

export default memo(VideoSection); 