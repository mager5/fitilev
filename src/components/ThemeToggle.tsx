'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Инициализация темы из localStorage или системных предпочтений
  useEffect(() => {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Если нет сохраненной темы, используем системные предпочтения
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Обновляем состояние
    setTheme(newTheme);
    
    // Обновляем атрибут на HTML-элементе
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Сохраняем в localStorage
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
    >
      {theme === 'dark' ? (
        <FaSun className="text-[var(--accent)] text-xl" aria-hidden="true" />
      ) : (
        <FaMoon className="text-[var(--accent)] text-xl" aria-hidden="true" />
      )}
      <span className="visually-hidden">
        {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
      </span>
    </button>
  );
};

export default ThemeToggle; 