import type { Metadata, Viewport } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import Script from "next/script";
import PreloadResources from "@/components/PreloadResources";

// Оптимизируем загрузку шрифтов с display: swap
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

// Определяем базовый URL без протокола, чтобы работало и на HTTP и на HTTPS
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://alexfitil.ru' // Используем абсолютный URL в продакшене
  : 'http://localhost:3000';

// Выделяем viewport в отдельный экспорт согласно требованиям Next.js 15.3.0
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", 
  themeColor: "#ff4500",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  title: "Фитнес тренер - персональные тренировки",
  description: "Персональный фитнес тренер. Индивидуальные программы тренировок и питания. Профессиональное сопровождение для достижения ваших целей.",
  keywords: "фитнес тренер, персональные тренировки, программы питания, здоровье, спорт, тренировки онлайн",
  authors: [{ name: "Алексей Фитиль" }],
  openGraph: {
    title: "Фитнес тренер - персональные тренировки",
    description: "Персональный фитнес тренер. Индивидуальные программы тренировок и питания.",
    url: "https://alexfitil.ru",
    siteName: "Алексей Фитиль - персональный тренер",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/meta/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Алексей Фитиль - персональный фитнес тренер',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Алексей Фитиль - персональный фитнес тренер',
    description: 'Персональный фитнес тренер. Индивидуальные программы тренировок и питания.',
    images: [`${baseUrl}/images/meta/twitter-card.jpg`],
    creator: '@fitil_trainer',
  },
  other: {
    'yandex-verification': 'ваш_код_верификации',
    'google-site-verification': 'ваш_код_верификации',
  },
};

// Встроенные стили для критичных элементов первого экрана
const criticalStyles = `
  :root {
    --background: #1a202c;
    --foreground: #f5f5f5;
    --accent: #ff4500;
    --accent-hover: #e03d00;
    --text-primary: #f7fafc;
    --text-secondary: #cbd5e0;
    --border-color: #4a5568;
  }
  body {
    background: var(--background);
    color: var(--text-primary);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: var(--font-montserrat), system-ui, sans-serif;
  }
  .skip-to-content {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--accent);
    color: white;
    padding: 0.75rem;
    z-index: 9999;
    font-weight: bold;
  }
  .skip-to-content:focus {
    transform: translateY(0);
  }
  
  /* Стили для главной секции */
  .btn-primary {
    background-color: var(--accent);
    color: white;
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
    transition: background-color 0.2s, transform 0.2s;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
  }
  .btn-primary:hover {
    background-color: var(--accent-hover);
  }
  
  .btn-secondary {
    background-color: transparent;
    border: 1px solid var(--accent);
    color: var(--accent);
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
    transition: background-color 0.2s, color 0.2s, transform 0.2s;
    white-space: nowrap;
  }
  .btn-secondary:hover {
    background-color: var(--accent);
    color: white;
  }
  
  /* Базовые анимации */
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }
  .animate-bounce {
    animation: bounce 1.5s infinite;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="ru" 
      className="scroll-smooth"
      dir="ltr"
    >
      <head>
        {/* Добавляем критичные инлайн-стили */}
        <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
        
        {/* Предзагрузка основных ресурсов */}
        <PreloadResources />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Алексей Фитиль" />
        
        {/* EmailJS Script для отправки писем без бэкенда - загружаем с defer */}
        <Script
          id="emailjs-sdk"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${montserrat.variable} ${roboto.variable} antialiased`}>
        <a href="#main" className="skip-to-content">
          Перейти к основному содержимому
        </a>
        <Providers>{children}</Providers>
        
        {/* Структурированные данные Schema.org - загружаем с низким приоритетом */}
        <Script
          id="schema-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Алексей Фитиль",
              "url": baseUrl,
              "image": `${baseUrl}/images/meta/og-image.jpg`,
              "sameAs": [
                "https://t.me/Fitil28",
                "https://wa.me/79184505030"
              ],
              "jobTitle": "Персональный фитнес тренер",
              "worksFor": {
                "@type": "Organization",
                "name": "Фитнес студия Алексея Фитиля"
              },
              "description": "Сертифицированный фитнес тренер с более чем 7-летним опытом работы. Специализируюсь на персональных тренировках и составлении индивидуальных программ питания."
            })
          }}
        />
        
        <Script
          id="schema-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              "name": "Фитнес студия Алексея Фитиля",
              "url": baseUrl,
              "image": `${baseUrl}/images/meta/og-image.jpg`,
              "telephone": "+79184505030",
              "email": "aleksejj-fitiljov@mail.ru",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Москва",
                "addressRegion": "Московская область",
                "addressCountry": "RU"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
                  ],
                  "opens": "08:00",
                  "closes": "21:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Saturday", "Sunday"
                  ],
                  "opens": "10:00",
                  "closes": "18:00"
                }
              ],
              "priceRange": "$$",
              "offers": {
                "@type": "Offer",
                "description": "Персональные тренировки",
                "price": "1500",
                "priceCurrency": "RUB"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
