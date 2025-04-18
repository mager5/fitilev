'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';

// Уменьшаем количество предзагружаемых изображений до самых важных
const CRITICAL_IMAGES = [
  '/images/hero-bg.webp', // Только фон героя
];

// Шрифты для предзагрузки
const CRITICAL_FONTS = [
  '/fonts/montserrat-variable.woff2'
];

export default function CriticalResources() {
  // Оптимизированная предзагрузка критических изображений
  useEffect(() => {
    // Откладываем загрузку некритичных ресурсов используя requestIdleCallback
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Проверяем тип устройства
        const isMobile = window.innerWidth <= 768;
        
        // Загружаем только релевантные изображения для текущего устройства
        CRITICAL_IMAGES.forEach(src => {
          if (
            (isMobile && src.includes('-mobile')) || 
            (!isMobile && !src.includes('-mobile')) ||
            (!src.includes('-mobile') && !src.includes('-desktop'))
          ) {
            const img = new Image();
            img.fetchPriority = 'low';
            img.src = src;
          }
        });
      }, { timeout: 2000 });
    }
  }, []);
  
  return (
    <>
      {/* Использование rel="preload" для критических ресурсов */}
      <Head>
        {/* Предзагрузка основных шрифтов */}
        {CRITICAL_FONTS.map((font, index) => (
          <link 
            key={`font-${index}`}
            rel="preload" 
            href={font} 
            as="font" 
            type="font/woff2" 
            crossOrigin="anonymous" 
          />
        ))}
        
        {/* DNS Prefetch для внешних доменов */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Preconnect для ключевых доменов */}
        <link rel="preconnect" href="https://www.youtube.com" />
      </Head>
      
      {/* Отложенная загрузка неблокирующих скриптов */}
      <Script
        src="/scripts/analytics.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('Analytics script loaded successfully');
        }}
      />
      
      {/* Инлайн-скрипт для быстрого определения темы */}
      <Script
        id="theme-script"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // Проверяем, была ли выбрана тема ранее
                const savedTheme = localStorage.getItem('theme');
                // Применяем сохраненную тему или системную по умолчанию
                if (savedTheme) {
                  document.documentElement.setAttribute('data-theme', savedTheme);
                } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {
                // Если есть проблемы с localStorage, не сохраняем ошибку
              }
            })();
          `,
        }}
      />
      
      {/* Инлайн-скрипт для оптимизации рендеринга */}
      <Script
        id="perf-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Оптимизация LCP
            (function() {
              // Добавляем обработчик, чтобы отслеживать производительность
              if ('PerformanceObserver' in window) {
                try {
                  // Отслеживаем LCP
                  const lcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    // Записываем LCP метрику
                    if (lastEntry) {
                      console.log('LCP:', lastEntry.startTime);
                      // Можно отправить метрику в аналитику
                    }
                  });
                  
                  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
                  
                  // Отслеживаем длинные задачи
                  const longTaskObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                      // Логируем длинные задачи > 50ms
                      if (entry.duration > 50) {
                        console.warn('Long task detected:', entry.duration + 'ms');
                      }
                    });
                  });
                  
                  longTaskObserver.observe({ type: 'longtask', buffered: true });
                } catch (e) {
                  // Игнорируем ошибки в старых браузерах
                }
              }
            })();
          `,
        }}
      />
    </>
  );
} 