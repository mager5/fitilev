'use client';

import React, { useEffect, useMemo } from 'react';
import ServiceDetailModal from './ServiceDetailModal';
import useServiceDetailModal from '@/hooks/useServiceDetailModal';
import { FaDumbbell, FaRegChartBar, FaHeartbeat, FaRunning } from 'react-icons/fa';

// Мемоизированные компоненты модального содержимого для разных типов услуг
const WeightLossContent = React.memo(() => (
  <article className="space-y-4">
    <header className="flex items-center gap-3 text-[var(--accent)]">
      <FaRegChartBar size={24} aria-hidden="true" />
      <h3 className="text-xl font-semibold">Программа похудения</h3>
    </header>
    
    <p>Индивидуальная программа тренировок и питания, направленная на снижение веса. Сочетание силовых и кардио нагрузок для эффективного сжигания жира и сохранения мышечной массы.</p>
    
    <section>
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Что включено:</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>Индивидуальная программа питания</li>
        <li>Комплекс тренировок с акцентом на жиросжигание</li>
        <li>Регулярные замеры и корректировки программы</li>
        <li>Рекомендации по режиму дня и активности</li>
      </ul>
    </section>
    
    <section>
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Результаты:</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>Устойчивое снижение веса (0.5-1 кг в неделю)</li>
        <li>Улучшение общего самочувствия</li>
        <li>Повышение выносливости и энергичности</li>
        <li>Формирование здоровых пищевых привычек</li>
      </ul>
    </section>
  </article>
));

const MuscleGainContent = React.memo(() => (
  <article className="space-y-4">
    <header className="flex items-center gap-3 text-[var(--accent)]">
      <FaDumbbell size={24} aria-hidden="true" />
      <h3 className="text-xl font-semibold">Программа набора мышечной массы</h3>
    </header>
    
    <p>Программа для набора мышечной массы с учетом типа телосложения. Акцент на прогрессивную нагрузку и правильное питание для максимального роста мышц.</p>
    
    <section>
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Что включено:</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>Программа питания с профицитом калорий</li>
        <li>Силовые тренировки с акцентом на гипертрофию</li>
        <li>Рекомендации по спортивному питанию</li>
        <li>Планирование периодизации тренировок</li>
      </ul>
    </section>
    
    <section>
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Результаты:</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>Увеличение мышечной массы</li>
        <li>Рост физической силы</li>
        <li>Улучшение пропорций тела</li>
        <li>Повышение уровня метаболизма</li>
      </ul>
    </section>
  </article>
));

const RecoveryContent = React.memo(() => (
  <article className="space-y-4">
    <header className="flex items-center gap-3 text-[var(--accent)]">
      <FaHeartbeat size={24} aria-hidden="true" />
      <h3 className="text-xl font-semibold">Программа восстановления</h3>
    </header>
    
    <p>Программа для восстановления после травм, операций или длительного перерыва в тренировках. Постепенное и безопасное возвращение к активному образу жизни.</p>
    
    <section>
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Что включено:</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>Комплекс реабилитационных упражнений</li>
        <li>Коррекция двигательных паттернов</li>
        <li>Постепенное увеличение нагрузки</li>
        <li>Рекомендации по мобильности и стретчингу</li>
      </ul>
    </section>
    
    <section>
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Результаты:</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>Восстановление функций повреждённой области</li>
        <li>Укрепление мышц-стабилизаторов</li>
        <li>Снижение риска повторных травм</li>
        <li>Возвращение к полноценной активности</li>
      </ul>
    </section>
  </article>
));

const GeneralFitnessContent = React.memo(() => (
  <article className="space-y-4">
    <header className="flex items-center gap-3 text-[var(--accent)]">
      <FaRunning size={24} aria-hidden="true" />
      <h3 className="text-xl font-semibold">Общая физическая подготовка</h3>
    </header>
    
    <p>Программа для улучшения общей физической формы, повышения выносливости и силы без привязки к конкретной цели. Идеальный вариант для начинающих и поддержания формы.</p>
    
    <section>
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Что включено:</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>Комплексные тренировки на все группы мышц</li>
        <li>Сочетание силовых и кардио нагрузок</li>
        <li>Рекомендации по базовому питанию</li>
        <li>Обучение технике выполнения упражнений</li>
      </ul>
    </section>
    
    <section>
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-6">Результаты:</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>Повышение общей выносливости</li>
        <li>Улучшение самочувствия и энергичности</li>
        <li>Формирование привычки к регулярным тренировкам</li>
        <li>Улучшение состава тела</li>
      </ul>
    </section>
  </article>
));

// Добавляем displayName для memo компонентов
WeightLossContent.displayName = 'WeightLossContent';
MuscleGainContent.displayName = 'MuscleGainContent';
RecoveryContent.displayName = 'RecoveryContent';
GeneralFitnessContent.displayName = 'GeneralFitnessContent';

const ServiceDetailModalWrapper = () => {
  const { isOpen, serviceType, closeModal } = useServiceDetailModal();
  
  // Мемоизированный заголовок модального окна
  const modalTitle = useMemo(() => {
    switch (serviceType) {
      case 'weightLoss':
        return 'Похудение';
      case 'muscleGain':
        return 'Набор массы';
      case 'recovery':
        return 'Восстановление';
      case 'generalFitness':
        return 'Общая физподготовка';
      default:
        return '';
    }
  }, [serviceType]);

  // Мемоизированное содержимое модального окна
  const modalContent = useMemo(() => {
    switch (serviceType) {
      case 'weightLoss':
        return <WeightLossContent />;
      case 'muscleGain':
        return <MuscleGainContent />;
      case 'recovery':
        return <RecoveryContent />;
      case 'generalFitness':
        return <GeneralFitnessContent />;
      default:
        return null;
    }
  }, [serviceType]);

  return (
    <ServiceDetailModal
      isOpen={isOpen}
      onClose={closeModal}
      title={modalTitle}
      content={modalContent}
    />
  );
};

export default React.memo(ServiceDetailModalWrapper); 