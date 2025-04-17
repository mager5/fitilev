'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

interface PolicyLinkProps {
  children: ReactNode;
  className?: string;
  openInNewTab?: boolean;
}

const PolicyLink = ({ children, className = '', openInNewTab = true }: PolicyLinkProps) => {
  const [href, setHref] = useState('/privacy-policy');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Получаем базовый путь из метатегов
        const baseTag = document.querySelector('base');
        const basePath = baseTag ? baseTag.getAttribute('href') || '' : '';
        
        // Проверяем, находимся ли мы на GitHub Pages
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        let newHref = '/privacy-policy'; // дефолтное значение
        
        if (isGitHubPages) {
          // Для GitHub Pages проверяем, есть ли префикс /fitilev в текущем URL
          const hasRepositoryPrefix = window.location.pathname.startsWith('/fitilev');
          
          if (hasRepositoryPrefix) {
            newHref = '/fitilev/privacy-policy';
          } else {
            // Резервный вариант: берем основу из текущего пути
            // Получаем первый сегмент пути (имя репозитория)
            const pathSegment = window.location.pathname.split('/')[1] || '';
            if (pathSegment) {
              newHref = `/${pathSegment}/privacy-policy`;
            }
          }
        } else if (basePath) {
          // Для других сред используем базовый путь из тега <base>
          newHref = `${basePath.replace(/\/$/, '')}/privacy-policy`;
        }
        
        setHref(newHref);
        console.log('PolicyLink: установлен href =', newHref);
      } catch (error) {
        console.error('Ошибка при определении URL для политики конфиденциальности:', error);
      }
    }
  }, []);

  return (
    <Link 
      href={href} 
      target={openInNewTab ? "_blank" : undefined} 
      rel={openInNewTab ? "noreferrer" : undefined} 
      className={className}
    >
      {children}
    </Link>
  );
};

export default PolicyLink; 