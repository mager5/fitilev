'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import ConsultationButton from './ConsultationButton';

const PricingSection = () => {
  const plans = [
    {
      name: 'Разовая консультация',
      price: '1 500 ₽',
      description: 'Идеально для тех, кто хочет получить экспертную оценку своей текущей тренировочной программы или питания.',
      features: [
        'Анализ текущей программы тренировок',
        'Рекомендации по корректировке',
        'Ответы на вопросы',
        '60 минут онлайн-консультации'
      ],
      isPopular: false,
      buttonText: 'Записаться'
    },
    {
      name: 'Индивидуальное сопровождение',
      price: '8 000 ₽/мес',
      description: 'Комплексный подход к достижению ваших целей. Включает персональную программу тренировок и регулярную поддержку.',
      features: [
        'Индивидуальная программа тренировок',
        'Еженедельные онлайн-консультации',
        'Коррекция программы',
        'Рекомендации по питанию',
        'Поддержка в чате 7 дней в неделю'
      ],
      isPopular: true,
      buttonText: 'Выбрать план'
    },
    {
      name: 'Персональные тренировки',
      price: '2 500 ₽/занятие',
      description: 'Онлайн-тренировки в режиме реального времени под руководством тренера.',
      features: [
        'Индивидуальная программа на занятие',
        'Контроль техники выполнения',
        'Корректировка нагрузки',
        'Мотивация и поддержка',
        'Длительность: 60 минут'
      ],
      isPopular: false,
      buttonText: 'Забронировать'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[var(--gray-light)]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title inline-block">Цены и тарифы</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
            Выберите подходящий вариант сотрудничества. Все программы разрабатываются индивидуально.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col h-full bg-[var(--card-bg)] rounded-lg p-4 md:p-6 border ${plan.isPopular ? 'border-[var(--accent)]' : 'border-[var(--border-color)]'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl md:text-4xl font-bold text-[var(--accent)] mb-3 md:mb-4">{plan.price}</div>
                <p className="text-[var(--text-secondary)] mb-4 md:mb-6 text-sm md:text-base">{plan.description}</p>
                
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[var(--accent)] shrink-0 mt-1" />
                      <span className="ml-3">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ConsultationButton
                className={`block text-center p-2 md:p-3 rounded-md font-bold transition-all mt-auto ${
                  plan.isPopular 
                    ? 'bg-[var(--accent)] text-[var(--text-primary)] hover:bg-[var(--accent-hover)]' 
                    : 'bg-[var(--card-bg)] border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-primary)]'
                } text-sm sm:text-base break-words hyphens-auto`}
              >
                {plan.buttonText}
              </ConsultationButton>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 lg:mt-16 text-center bg-[var(--card-bg)] p-6 md:p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-3 md:mb-4">Нужно что-то особенное?</h3>
          <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
            Свяжитесь со мной для обсуждения индивидуальных условий и специальных предложений.
          </p>
          <ConsultationButton className="responsive-btn btn-full text-sm sm:text-base p-2 md:p-3">
            Связаться
          </ConsultationButton>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 