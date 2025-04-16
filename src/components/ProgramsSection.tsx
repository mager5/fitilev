'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

const ProgramsSection = () => {
  const programs = [
    {
      title: 'Похудение',
      image: '/images/weight-loss.jpg',
      description: 'Эффективное снижение веса с учетом индивидуальных особенностей организма. Комбинация кардио и силовых тренировок.',
      features: ['Индивидуальный план питания', 'Кардиотренировки', 'Постепенное снижение веса']
    },
    {
      title: 'Набор массы',
      image: '/images/muscle-gain.jpg',
      description: 'Программа для набора мышечной массы с учетом типа телосложения. Акцент на прогрессивную нагрузку и правильное питание.',
      features: ['Силовые тренировки', 'Контроль рациона', 'Отслеживание прогресса']
    },
    {
      title: 'Восстановление',
      image: '/images/recovery.jpg',
      description: 'Программа для восстановления после травм и операций. Помогает вернуться к активному образу жизни безопасно.',
      features: ['Щадящие упражнения', 'Постепенная нагрузка', 'Профилактика травм']
    },
    {
      title: 'Общая физподготовка',
      image: '/images/general-fitness.jpg',
      description: 'Комплексная программа для улучшения общего физического состояния, выносливости и силы.',
      features: ['Разнообразные тренировки', 'Развитие всех групп мышц', 'Повышение выносливости']
    }
  ];

  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Программы тренировок</h2>
        <p className="section-description text-center mb-12">
          Все программы разрабатываются индивидуально с учетом ваших целей, 
          физических возможностей и имеющегося оборудования.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-bold mb-4">{program.title}</h3>
              <p className="feature-description mb-6">{program.description}</p>
              <ul className="space-y-3 mb-8">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-light">
                    <FaCheck className="text-[var(--accent)] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn-primary mt-auto">Подробнее</button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-light mb-6">
            Не нашли подходящую программу? Напишите мне, и мы разработаем программу специально для вас.
          </p>
          <button className="btn-primary">Получить консультацию</button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection; 