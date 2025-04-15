'use client';

import { FaDumbbell, FaRegChartBar, FaHeartbeat, FaRunning } from 'react-icons/fa';
import ServiceCard from './ServiceCard';
import { ServiceType } from '@/hooks/useServiceDetailModal';

const ServicesSection = () => {
  const services = [
    {
      title: 'Похудение',
      description: 'Эффективное снижение веса с учетом индивидуальных особенностей организма. Комбинация кардио и силовых тренировок.',
      serviceType: 'weightLoss' as ServiceType,
      features: [
        'Индивидуальный план питания',
        'Кардиотренировки',
        'Постепенное снижение веса'
      ],
      icon: <FaRegChartBar />
    },
    {
      title: 'Набор массы',
      description: 'Программа для набора мышечной массы с учетом типа телосложения. Акцент на прогрессивную нагрузку и правильное питание.',
      serviceType: 'muscleGain' as ServiceType,
      features: [
        'Силовые тренировки',
        'Контроль рациона',
        'Отслеживание прогресса'
      ],
      icon: <FaDumbbell />
    },
    {
      title: 'Восстановление',
      description: 'Программа для восстановления после травм и операций. Помогает вернуться к активному образу жизни безопасно.',
      serviceType: 'recovery' as ServiceType,
      features: [
        'Щадящие упражнения',
        'Постепенное увеличение нагрузки',
        'Техники расслабления и стретчинга'
      ],
      icon: <FaHeartbeat />
    },
    {
      title: 'Общая физподготовка',
      description: 'Комплексная программа для улучшения общего физического состояния, выносливости и силы.',
      serviceType: 'generalFitness' as ServiceType,
      features: [
        'Разнообразные тренировки',
        'Развитие всех групп мышц',
        'Упражнения на выносливость и гибкость'
      ],
      icon: <FaRunning />
    }
  ];

  return (
    <section id="services" className="py-20 bg-[var(--secondary)]">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">Услуги</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 section-description">
          Индивидуальные тренировочные программы, адаптированные под ваши цели, уровень физических возможностей и имеющегося оборудования.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              serviceType={service.serviceType}
              features={service.features}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 