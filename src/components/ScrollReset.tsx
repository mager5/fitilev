'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Компонент для сброса позиции прокрутки при навигации по страницам
 * и при первоначальной загрузке сайта
 */
export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Сбрасываем прокрутку при загрузке страницы и при изменении маршрута
    window.scrollTo(0, 0);
    
    // Обработчик для события beforeunload (перед перезагрузкой страницы)
    const handleBeforeUnload = () => {
      // Очищаем историю прокрутки
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      // Явно сбрасываем прокрутку
      window.scrollTo(0, 0);
    };

    // Регистрируем обработчик
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Очистка при размонтировании
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]); // Запускается при изменении пути

  return null; // Компонент не рендерит видимый UI
} 