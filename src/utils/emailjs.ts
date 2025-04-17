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
  if (typeof window !== 'undefined' && (window as any).emailjs) {
    console.log('Инициализация EmailJS с ключом:', EMAILJS_PUBLIC_KEY);
    try {
      (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log('EmailJS успешно инициализирован');
    } catch (error) {
      console.error('Ошибка при инициализации EmailJS:', error);
    }
  } else {
    console.warn('EmailJS SDK не доступен в window объекте');
  }
};

// Функция для отправки формы
export const sendEmail = async (templateParams: Record<string, string>) => {
  if (typeof window !== 'undefined' && (window as any).emailjs) {
    try {
      // Используем EmailJS SDK если он доступен
      const response = await (window as any).emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      return { success: true, response };
    } catch (error) {
      console.error('Ошибка при отправке через EmailJS SDK:', error);
      
      // Запасной вариант - использовать REST API напрямую
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
          return { success: true, response: 'Email sent successfully' };
        } else {
          throw new Error('Ошибка при отправке через REST API');
        }
      } catch (fallbackError) {
        console.error('Ошибка при отправке через REST API:', fallbackError);
        throw fallbackError;
      }
    }
  } else {
    throw new Error('EmailJS не инициализирован');
  }
}; 