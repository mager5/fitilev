// Конфигурация и утилиты для работы с EmailJS
// Для получения ключей:
// 1. Зарегистрируйтесь на https://www.emailjs.com/
// 2. Создайте Email Service (Email Services -> Add New Service)
// 3. Создайте Email Template (Email Templates -> Create New Template)
// 4. Получите Public Key (Account -> API Keys)

// ID сервиса EmailJS
// Найдите его в разделе "Email Services" после создания сервиса
export const EMAILJS_SERVICE_ID = 'service_canbjlb';

// ID шаблона EmailJS
// Найдите его в разделе "Email Templates" после создания шаблона
export const EMAILJS_TEMPLATE_ID = 'template_9avzrq8';

// Публичный ключ EmailJS
// Найдите его в разделе "Account" -> "API Keys"
export const EMAILJS_PUBLIC_KEY = 'AXvbBdan0aGmyra9h';

// Функция для инициализации EmailJS
export const initEmailJS = () => {
  if (typeof window !== 'undefined') {
    const emailjsScript = document.getElementById('emailjs-sdk');
    
    // Проверяем загружен ли скрипт EmailJS
    if (emailjsScript && (window as any).emailjs) {
      try {
        (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS успешно инициализирован');
      } catch (error) {
        console.error('Ошибка при инициализации EmailJS:', error);
      }
    } else {
      // Если скрипт не загружен, создаем обработчик загрузки
      const checkEmailJS = setInterval(() => {
        if ((window as any).emailjs) {
          try {
            (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
            console.log('EmailJS успешно инициализирован после ожидания');
            clearInterval(checkEmailJS);
          } catch (error) {
            console.error('Ошибка при инициализации EmailJS после ожидания:', error);
            clearInterval(checkEmailJS);
          }
        }
      }, 500);
      
      // Устанавливаем таймаут для проверки (10 секунд)
      setTimeout(() => {
        clearInterval(checkEmailJS);
      }, 10000);
    }
  }
};

// Функция для отправки формы
export const sendEmail = async (templateParams: Record<string, string>) => {
  // Проверяем наличие EmailJS SDK
  if (typeof window !== 'undefined' && (window as any).emailjs) {
    try {
      // Используем EmailJS SDK если он доступен
      const response = await (window as any).emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY // Явно передаем публичный ключ
      );
      return { success: true, response };
    } catch (error) {
      console.error('Ошибка при отправке через EmailJS SDK:', error);
      console.log('Переключение на запасной вариант через REST API');
      
      // Запасной вариант - использовать REST API напрямую
      return sendEmailFallback(templateParams);
    }
  } else {
    console.log('EmailJS SDK не обнаружен, использование REST API');
    return sendEmailFallback(templateParams);
  }
};

// Запасной вариант для отправки через REST API
const sendEmailFallback = async (templateParams: Record<string, string>) => {
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: templateParams
      })
    });
    
    if (response.status === 200) {
      console.log('Письмо успешно отправлено через REST API');
      return { success: true, response: 'Email sent successfully' };
    } else {
      throw new Error(`Ошибка при отправке через REST API: ${response.status}`);
    }
  } catch (fallbackError) {
    console.error('Ошибка при отправке через REST API:', fallbackError);
    throw fallbackError;
  }
}; 