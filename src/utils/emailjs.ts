// Конфигурация и утилиты для работы с EmailJS
// Перед использованием нужно зарегистрироваться на https://www.emailjs.com/
// и заменить значения ниже на реальные из вашего аккаунта EmailJS

// ID сервиса EmailJS
export const EMAILJS_SERVICE_ID = 'service_id_here';

// ID шаблона EmailJS
export const EMAILJS_TEMPLATE_ID = 'template_id_here';

// Публичный ключ EmailJS
export const EMAILJS_PUBLIC_KEY = 'public_key_here';

// Функция для инициализации EmailJS
export const initEmailJS = () => {
  if (typeof window !== 'undefined' && (window as any).emailjs) {
    (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
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