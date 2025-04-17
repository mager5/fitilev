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
  const [isAbsoluteUrl, setIsAbsoluteUrl] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Проверяем, находимся ли мы на GitHub Pages
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        if (isGitHubPages) {
          // Для GitHub Pages устанавливаем точную ссылку
          setHref('https://mager5.github.io/fitilev/privacy-policy');
          setIsAbsoluteUrl(true);
          console.log('PolicyLink: GitHub Pages, устанавливаем абсолютный URL:', 'https://mager5.github.io/fitilev/privacy-policy');
        } else {
          // В локальной разработке используем относительную ссылку
          setHref('/privacy-policy');
          setIsAbsoluteUrl(false);
          console.log('PolicyLink: Локальная разработка, используем относительный URL:', '/privacy-policy');
        }
      } catch (error) {
        console.error('Ошибка при определении URL для политики конфиденциальности:', error);
        // В случае ошибки используем дефолтный путь
        setHref('/privacy-policy');
        setIsAbsoluteUrl(false);
      }
    }
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isAbsoluteUrl) {
      e.preventDefault();
      window.open(href, openInNewTab ? '_blank' : '_self');
    }
  };

  return (
    <Link 
      href={href} 
      target={openInNewTab ? "_blank" : undefined} 
      rel={openInNewTab ? "noreferrer" : undefined} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default PolicyLink; 