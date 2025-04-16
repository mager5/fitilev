import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/Providers";
import Script from "next/script";
import { montserrat, roboto } from './fonts';
import CriticalResources from "../components/CriticalResources";

// Определяем базовый URL для правильных абсолютных путей
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://mager5.github.io/fitilev' 
  : 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Фитнес тренер - персональные тренировки",
  description: "Персональный фитнес тренер. Индивидуальные программы тренировок и питания. Профессиональное сопровождение для достижения ваших целей.",
  keywords: "фитнес тренер, персональные тренировки, программы питания, здоровье, спорт, тренировки онлайн",
  authors: [{ name: "Алексей Фитиль" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
  themeColor: "#ff4500",
  colorScheme: "dark light",
  openGraph: {
    title: "Фитнес тренер - персональные тренировки",
    description: "Персональный фитнес тренер. Индивидуальные программы тренировок и питания.",
    url: "https://mager5.github.io/fitilev",
    siteName: "Алексей Фитиль - персональный тренер",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/meta/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Алексей Фитиль - персональный фитнес тренер',
        type: 'image/jpeg',
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
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Алексей Фитиль" />
        <meta name="theme-color" content="#ff4500" />
        
        {/* Оптимизация для мобильных устройств */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" />
        
        {/* Специальные настройки для ретина-дисплеев */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Иконки для ретина-дисплеев */}
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
        
        {/* Предзагрузка критических изображений героя - разные для мобильных и десктопа */}
        <link 
          rel="preload" 
          href="/images/hero-bg.webp" 
          as="image"
          type="image/webp"
          media="(min-width: 768px) and (min-resolution: 1dppx)"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          href="/images/hero-bg@2x.webp" 
          as="image"
          type="image/webp"
          media="(min-width: 768px) and (min-resolution: 2dppx)"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          href="/images/hero-bg-mobile.webp" 
          as="image"
          type="image/webp"
          media="(max-width: 767px) and (min-resolution: 1dppx)"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          href="/images/hero-bg-mobile@2x.webp" 
          as="image"
          type="image/webp"
          media="(max-width: 767px) and (min-resolution: 2dppx)"
          fetchPriority="high"
        />
        
        {/* Предзагрузка шрифтов */}
        <link 
          rel="preload" 
          href="/fonts/montserrat-latin-400-normal.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        
        {/* Специальные теги для Телеграм */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="telegram:image" content={`${baseUrl}/images/meta/og-image.jpg`} />
        <meta name="telegram:channel" content="@fitil_trainer" />
        
        {/* Инлайн критический CSS для ускорения рендеринга */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --background: #121212;
            --foreground: #e0e0e0;
            --accent: #ff4500;
            --secondary: #1a1a1a;
            --text-primary: #e0e0e0;
            --card-bg: rgba(26, 26, 26, 0.8);
            --border-color: rgba(255, 255, 255, 0.1);
          }
          body {
            background: var(--background);
            color: var(--text-primary);
            margin: 0;
            padding: 0;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
          }
          
          /* Критические стили для ретина-экранов */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            body {
              -webkit-font-smoothing: subpixel-antialiased;
            }
            
            /* Улучшаем резкость текста на ретина-дисплеях */
            h1, h2, h3, h4, h5, h6, p, span, a, button {
              letter-spacing: -0.01em;
            }
          }
          
          /* Критические стили для мобильной производительности */
          @media (max-width: 767px) {
            h1, h2, h3 {
              word-break: break-word;
              hyphens: auto;
            }
            .container {
              width: 100%;
              padding-left: 16px;
              padding-right: 16px;
            }
          }
          /* Анимации для первой загрузки */
          @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
          .animate-fade-in{animation:fadeIn .8s ease-out both;will-change:opacity,transform}
          h1.animate-fade-in{animation-delay:0ms}
          #home h1{opacity:1 !important}
          /* Предотвращение CLS при загрузке шрифтов */
          html {
            font-size: 16px;
            line-height: 1.5;
          }
          /* Базовые стили для мобильных устройств */
          .btn-primary, .btn-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1rem;
            font-weight: 700;
            border-radius: 0.375rem;
            text-decoration: none;
            transition: all 0.2s;
          }
          .btn-primary {
            background: var(--accent);
            color: white;
          }
          .btn-secondary {
            background: transparent;
            border: 1px solid var(--accent);
            color: var(--text-primary);
          }
          /* Критический CSS для HeroSection */
          .hero-section {
            min-height: 100vh;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          /* Подавление анимаций для пользователей, предпочитающих ее отключение */
          @media (prefers-reduced-motion: reduce) {
            *, ::before, ::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
          /* Скелетон для отложенной загрузки */
          .animate-pulse {
            animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .5;
            }
          }
          /* Оптимизация для iOS */
          @supports (-webkit-touch-callout: none) {
            .min-h-screen {
              min-height: -webkit-fill-available;
            }
          }
        ` }}/>
      </head>
      <body className={`${montserrat.variable} ${roboto.variable} antialiased`}>
        <a href="#main" className="skip-to-content">
          Перейти к основному содержимому
        </a>
        
        {/* Компонент для предзагрузки критических ресурсов */}
        <CriticalResources />
        
        <Providers>{children}</Providers>
        
        {/* Скрипт для немедленной видимости контента и управления производительностью */}
        <Script strategy="beforeInteractive" id="perf-optimizations">
          {`
            // Измерение производительности
            window.addEventListener('DOMContentLoaded', function() {
              // Начало записи метрик
              if (window.performance && window.performance.mark) {
                window.performance.mark('app_start');
              }
              
              // Немедленно показываем заголовок и содержимое
              var h1El = document.querySelector('#home h1');
              if (h1El) {
                h1El.style.opacity = '1';
                h1El.style.transform = 'none';
              }
              
              // Отложенная загрузка незначительных стилей
              function loadDeferredStyles() {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/css/non-critical.css';
                link.type = 'text/css';
                head.appendChild(link);
              }
              
              // Отложенная загрузка JS
              function loadDeferredJS() {
                var scripts = ['/js/analytics.js'];
                scripts.forEach(function(src) {
                  var script = document.createElement('script');
                  script.src = src;
                  script.async = true;
                  document.body.appendChild(script);
                });
              }
              
              // Загружаем отложенные ресурсы после рендеринга контента
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadDeferredStyles, { timeout: 2000 });
                requestIdleCallback(loadDeferredJS, { timeout: 4000 });
              } else {
                setTimeout(loadDeferredStyles, 1000);
                setTimeout(loadDeferredJS, 2000);
              }
              
              // Измеряем первый contentful paint
              if (window.performance && window.performance.mark) {
                setTimeout(function() {
                  window.performance.mark('first_meaningful_paint');
                  window.performance.measure('time_to_meaningful_paint', 'app_start', 'first_meaningful_paint');
                }, 0);
              }
            });
            
            // Функция для оптимизации CLS (Cumulative Layout Shift)
            function stabilizeLayout() {
              document.documentElement.style.scrollPaddingTop = '80px';
              
              // Фиксируем размеры изображений
              var images = document.querySelectorAll('img');
              images.forEach(function(img) {
                if (img.height === 0 && img.width === 0) {
                  if (img.getAttribute('width') && img.getAttribute('height')) {
                    var w = img.getAttribute('width');
                    var h = img.getAttribute('height');
                    img.style.aspectRatio = w + '/' + h;
                  }
                }
              });
            }
            
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', stabilizeLayout);
            } else {
              stabilizeLayout();
            }
          `}
        </Script>
        
        {/* Структурированные данные Schema.org - загружаются с задержкой */}
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
        
        {/* Скрипты для отложенной загрузки */}
        <Script
          id="theme-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme) {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        
        {/* Загрузка аналитики только когда пользователь не взаимодействует с сайтом */}
        <Script 
          id="analytics-loader" 
          strategy="lazyOnload">
          {`
            if ('requestIdleCallback' in window) {
              requestIdleCallback(function() {
                // Здесь можно загрузить аналитику
                console.log('Analytics would load here in production');
              }, { timeout: 5000 });
            } else {
              setTimeout(function() {
                console.log('Analytics fallback loader');
              }, 5000);
            }
          `}
        </Script>
      </body>
    </html>
  );
}
