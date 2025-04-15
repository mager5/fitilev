const https = require('https');
const fs = require('fs');
const path = require('path');

// Видео IDs, которые нам нужны
const videoIds = [
  'HsMGLZXX5j4',
  'ZTqV32j8mQ4',
  'pOXz43QBnpA'
];

// Форматы превью для попытки загрузки
const formats = [
  'maxresdefault.jpg',
  'sddefault.jpg',
  'hqdefault.jpg',
  'mqdefault.jpg',
  'default.jpg',
  '0.jpg'
];

// Папка для сохранения
const outputDir = path.join(__dirname, 'public', 'images', 'video-thumbs');

// Убедимся, что папка существует
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Функция для загрузки изображения
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url} to ${outputPath}`);
    
    https.get(url, (response) => {
      // Если изображение не найдено, сразу выходим
      if (response.statusCode === 404) {
        console.log(`Image not found: ${url}`);
        return resolve(false);
      }
      
      // Проверяем, что статус успешный
      if (response.statusCode !== 200) {
        console.log(`Got status code ${response.statusCode} for ${url}`);
        return resolve(false);
      }
      
      // Создаем поток для записи файла
      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${outputPath}`);
        resolve(true);
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Удаляем файл в случае ошибки
        console.error(`Error saving file: ${err.message}`);
        reject(err);
      });
      
    }).on('error', (err) => {
      console.error(`Error downloading: ${err.message}`);
      resolve(false);
    });
  });
}

// Асинхронная функция для обработки всех видео
async function downloadAllThumbnails() {
  for (const videoId of videoIds) {
    let downloaded = false;
    
    // Пробуем скачать каждый формат для каждого видео
    for (const format of formats) {
      if (downloaded) break; // Если уже скачали, переходим к следующему видео
      
      const url = `https://img.youtube.com/vi/${videoId}/${format}`;
      const outputPath = path.join(outputDir, `${videoId}.jpg`);
      
      try {
        downloaded = await downloadImage(url, outputPath);
      } catch (error) {
        console.error(`Failed to download ${url}: ${error.message}`);
      }
    }
    
    if (!downloaded) {
      console.error(`Failed to download any thumbnail for video ${videoId}`);
    }
  }
  
  console.log('All downloads completed!');
}

// Запускаем загрузку
downloadAllThumbnails().catch(err => {
  console.error('Download failed:', err);
}); 