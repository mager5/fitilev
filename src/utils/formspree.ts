'use client';

// Формируем ID формы Formspree из ключа, например "xvoyqkrw"
const FORM_ID = 'xvoyqkrw'; // Замените на ваш ID формы из Formspree

// Функция для отправки формы через Formspree
export const sendFormViaFormspree = async (formData: Record<string, string>) => {
  try {
    console.log('Отправка формы через Formspree', formData);
    
    const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('Формспри ответил успешно', result);
      return { success: true, response: result };
    } else {
      console.error('Ошибка при отправке через Formspree:', result);
      throw new Error(result.error || 'Ошибка при отправке формы');
    }
  } catch (error) {
    console.error('Ошибка при отправке через Formspree:', error);
    throw error;
  }
}; 