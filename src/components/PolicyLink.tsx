'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface PolicyLinkProps {
  children: ReactNode;
  className?: string;
  openInNewTab?: boolean;
}

const PolicyLink = ({ children, className = '', openInNewTab = true }: PolicyLinkProps) => {
  // Используем простой путь без манипуляций с определением среды,
  // так как теперь у нас пользовательский домен
  return (
    <Link 
      href="/privacy-policy" 
      target={openInNewTab ? "_blank" : undefined} 
      rel={openInNewTab ? "noreferrer" : undefined} 
      className={className}
    >
      {children}
    </Link>
  );
};

export default PolicyLink; 