// Компонент для предзагрузки критических ресурсов сайта
export default function PreloadResources() {
  // Список основных изображений первого экрана для предзагрузки
  const criticalImages = [
    '/images/backgrounds/fitness.jpg', // Главный фон
    '/images/backgrounds/trainer.jpg', // Изображение тренера справа
  ];

  // Список важных ресурсов следующих секций
  const importantImages = [
    '/images/backgrounds/about.jpg',
    // Другие важные изображения
  ];

  // Стили внедрения фона для мгновенного отображения
  const inlineBackgroundStyle = `
    #hero-bg-container::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      background-image: url('/images/backgrounds/fitness.jpg');
      background-size: cover;
      background-position: center;
      opacity: 0.6;
    }
    
    #hero-bg-container::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.6);
    }
  `;

  return (
    <>
      {/* Встроенные стили для мгновенного отображения фона */}
      <style dangerouslySetInnerHTML={{ __html: inlineBackgroundStyle }} />
      
      {/* Предзагрузка веб-шрифтов для ускорения рендеринга текста */}
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" 
        as="style" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" 
        as="style" 
        crossOrigin="anonymous" 
      />
      
      {/* Явная загрузка шрифтов через FontFace для быстрого доступа */}
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
      />
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      />
      
      {/* Скрипт для загрузки FontFace */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof FontFace !== 'undefined') {
              const montserratNormal = new FontFace('Montserrat', 'url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2)', { weight: '400' });
              const montserratBold = new FontFace('Montserrat', 'url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2)', { weight: '700' });
              
              Promise.all([
                montserratNormal.load(),
                montserratBold.load()
              ]).then(fonts => {
                fonts.forEach(font => {
                  document.fonts.add(font);
                });
                console.log('Шрифты предзагружены через FontFace API');
              }).catch(err => {
                console.warn('Ошибка предзагрузки шрифтов:', err);
              });
            }
          `
        }}
      />

      {/* Предзагрузка критичных изображений с высшим приоритетом */}
      {criticalImages.map((src) => (
        <link 
          key={src}
          rel="preload" 
          as="image" 
          imageSrcSet={src}
          href={src} 
          fetchPriority="high"
        />
      ))}

      {/* Предварительное соединение со сторонними сервисами */}
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS-prefetch для сторонних сервисов */}
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

      {/* Предзагрузка важных изображений с более низким приоритетом */}
      {importantImages.map((src) => (
        <link 
          key={src}
          rel="preload" 
          as="image" 
          href={src} 
          fetchPriority="low"
        />
      ))}
    </>
  );
} 