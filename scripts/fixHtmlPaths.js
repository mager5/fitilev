const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Функция для исправления путей в HTML файлах
function fixHtmlPaths() {
  console.log('Исправление путей в HTML файлах для GitHub Pages...');
  
  // Получаем все HTML файлы в директории 'out'
  const htmlFiles = glob.sync('out/**/*.html');
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Заменяем абсолютные пути на относительные
    // Важно: заменяем /_next/ на ./_next/ для правильной относительной ссылки
    content = content.replace(/"\/_next\//g, '"./_next/');
    
    // Исправляем ссылки на изображения
    content = content.replace(/="\/images\//g, '="./images/');
    
    // Исправляем ссылки на иконки и другие ресурсы
    content = content.replace(/="\/icons\//g, '="./icons/');
    
    // Заменяем localhost:3000 на доменное имя
    content = content.replace(/http:\/\/localhost:3000\//g, 'https://alexfitil.ru/');
    
    // Исправляем внутренние ссылки на страницы
    content = content.replace(/href="\//g, 'href="./');
    
    // Записываем исправленный файл
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Исправлены пути в файле: ${file}`);
  });
  
  console.log('Все пути исправлены успешно!');
}

// Запускаем функцию
fixHtmlPaths(); 