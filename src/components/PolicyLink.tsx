'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

interface PolicyLinkProps {
  children: ReactNode;
  className?: string;
}

const PolicyLink = ({ children, className = '' }: PolicyLinkProps) => {
  const [href, setHref] = useState('/privacy-policy');

  useEffect(() => {
    // Функция выполняется только на клиенте
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // Если мы на GitHub Pages, берем целиком репозиторий из URL
      const pathSegments = window.location.pathname.split('/');
      // Предполагаем что первый сегмент после / - это название репозитория
      const repoName = pathSegments[1] || '';
      
      // Формируем полный путь с учетом имени репозитория
      setHref(`/${repoName}/privacy-policy`);
    }
  }, []);

  return (
    <Link href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </Link>
  );
};

export default PolicyLink; 