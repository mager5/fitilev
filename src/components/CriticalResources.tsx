'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';

/**
 * Компонент для оптимизации загрузки критических ресурсов
 * Предзагружает шрифты и другие критические ресурсы
 * Улучшает показатели Core Web Vitals, особенно LCP и CLS
 */
const CriticalResources = () => {
  useEffect(() => {
    // Предзагрузка изображений для улучшения LCP
    const preloadLCP = () => {
      // Можно добавить предзагрузку важных изображений, например героя
      const lcpImageUrl = '/images/hero-banner.jpg';
      if (lcpImageUrl) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = lcpImageUrl;
        preloadLink.type = 'image/jpeg';
        document.head.appendChild(preloadLink);
      }
    };

    // Предзагрузка шрифтов для уменьшения CLS
    const preloadFonts = () => {
      const fontUrls = [
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
      ];

      fontUrls.forEach(url => {
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'style';
        fontLink.href = url;
        fontLink.onload = () => {
          fontLink.rel = 'stylesheet';
        };
        document.head.appendChild(fontLink);
      });
    };

    // Выполняем предзагрузку
    preloadLCP();
    preloadFonts();

    // Отключаем предзагрузчик при размонтировании
    return () => {
      // Очистка предзагрузчиков при необходимости
    };
  }, []);

  return null; // Компонент не рендерит видимый UI
};

export default CriticalResources; 