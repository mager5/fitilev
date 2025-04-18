import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Создаем транспортер для отправки почты
const transporter = nodemailer.createTransport({
  service: 'gmail', // Используем встроенную конфигурацию для Gmail
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-password', // Пароль приложения
  },
});

export async function POST(request: Request) {
  try {
    // Получаем данные из тела запроса
    const body = await request.json();
    const { name, phone, goal, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Формируем текст сообщения
    const goalText = goal ? `Цель: ${goal}` : 'Цель не указана';
    const messageText = message ? `Сообщение: ${message}` : 'Сообщение не указано';

    // Формируем тему и содержимое письма
    const subject = `Новая заявка с сайта от ${name}`;
    const html = `
      <h2>Получена новая заявка с сайта</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>${goalText}</strong></p>
      <p><strong>${messageText}</strong></p>
      <hr />
      <p>Сообщение отправлено: ${new Date().toLocaleString('ru-RU')}</p>
    `;

    console.log('Попытка отправить письмо на:', process.env.EMAIL_TO);
    
    // Отправляем письмо
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Фитнес сайт" <noreply@yoursite.com>',
      to: process.env.EMAIL_TO || 'your-email@gmail.com',
      subject,
      html,
    });

    console.log('Письмо успешно отправлено!');

    // Возвращаем успешный ответ
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке сообщения' },
      { status: 500 }
    );
  }
} 