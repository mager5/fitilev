import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Script from "next/script";
import { montserrat, roboto } from './fonts';
import CriticalResources from "@/components/CriticalResources";

// Определяем базовый URL для правильных абсолютных путей
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fitnesshouse-msk.ru';

// Метаданные для всего сайта
export const metadata: Metadata = {
  title: {
    template: '%s | Fitness House',
    default: 'Fitness House - Персональный тренер по фитнесу в Москве',
  },
  description: 'Профессиональные услуги персонального тренера по фитнесу в Москве. Индивидуальные программы тренировок, советы по питанию и поддержка на пути к вашим фитнес-целям.',
  keywords: ['фитнес тренер', 'персональный тренер', 'тренировки', 'фитнес', 'Москва', 'здоровье', 'спорт'],
  authors: [{ name: 'Fitness House' }],
  creator: 'Fitness House',
  publisher: 'Fitness House',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'ru-RU': baseUrl,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Fitness House - Персональный тренер по фитнесу в Москве',
    description: 'Профессиональные услуги персонального тренера по фитнесу в Москве. Индивидуальные программы тренировок, советы по питанию и поддержка на пути к вашим фитнес-целям.',
    url: baseUrl,
    siteName: 'Fitness House',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Fitness House - Персональный тренер по фитнесу в Москве',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitness House - Персональный тренер по фитнесу в Москве',
    description: 'Профессиональные услуги персонального тренера по фитнесу в Москве. Индивидуальные программы тренировок, советы по питанию и поддержка на пути к вашим фитнес-целям.',
    images: [`${baseUrl}/images/twitter-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="ru" 
      className="scroll-smooth"
      dir="ltr"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        
        <a 
          href="#main-content" 
          className="skip-link"
          aria-label="Перейти к основному содержанию"
        >
          Перейти к содержанию
        </a>
          
      </head>
      <body className={`${montserrat.variable} ${roboto.variable} font-sans antialiased`}>
        <CriticalResources />
        
        <Providers>
          {children}
        </Providers>
          
        {/* Скрипт для немедленной видимости контента и управления производительностью */}
        <Script id="performance-script" strategy="afterInteractive">
          {`
            // Предотвращение CLS (Content Layout Shift)
            document.documentElement.style.scrollBehavior = 'auto';
            history.scrollRestoration = 'auto';
            
            // Удаление splash screen если он есть
            const splash = document.querySelector('.splash-screen');
            if (splash) {
              setTimeout(() => {
                splash.classList.add('splash-screen--hidden');
                setTimeout(() => splash.remove(), 500);
              }, 500);
            }
          `}
        </Script>
      </body>
    </html>
  );
}
