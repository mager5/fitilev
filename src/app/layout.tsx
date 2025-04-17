import type { Metadata, Viewport } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Определяем базовый URL без протокола, чтобы работало и на HTTP и на HTTPS
const baseUrl = process.env.NODE_ENV === 'production' 
  ? '' // Используем пустой путь для относительных URL в продакшене
  : '';

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
        url: `/images/meta/og-image.jpg`,
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
    images: [`/images/meta/twitter-card.jpg`],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Алексей Фитиль" />
        
        {/* EmailJS Script для отправки писем без бэкенда */}
        <Script
          id="emailjs-sdk"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${montserrat.variable} ${roboto.variable} antialiased`}>
        <a href="#main" className="skip-to-content">
          Перейти к основному содержимому
        </a>
        <Providers>{children}</Providers>
        
        {/* Структурированные данные Schema.org */}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Алексей Фитиль",
              "url": baseUrl,
              "image": `/images/meta/og-image.jpg`,
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              "name": "Фитнес студия Алексея Фитиля",
              "url": baseUrl,
              "image": `/images/meta/og-image.jpg`,
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
