/**
 * BeforeAfterSection - компонент для отображения трансформаций клиентов (до/после).
 * ПРИМЕЧАНИЕ: Этот раздел временно скрыт в основном приложении,
 * но сохранен в коде для будущего использования.
 * 
 * TODO: Заменить демо-изображения на реальные фотографии клиентов
 * после получения согласия на их публикацию.
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageWithBasePath from './ImageWithBasePath';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BeforeAfterSection = () => {
  // Примеры для слайдера с изображениями из Unsplash
  const transformations = [
    {
      id: 1,
      name: 'Александр',
      before: '/images/transformations/before1.jpg',
      after: '/images/transformations/after1.jpg',
      duration: '6 месяцев',
      details: 'Снижение веса на 15 кг, увеличение мышечной массы'
    },
    {
      id: 2,
      name: 'Мария',
      before: '/images/transformations/before1.jpg',
      after: '/images/transformations/after1.jpg',
      duration: '4 месяца',
      details: 'Тонус мышц, коррекция фигуры, улучшение выносливости'
    },
    {
      id: 3,
      name: 'Дмитрий',
      before: '/images/transformations/before1.jpg',
      after: '/images/transformations/after1.jpg',
      duration: '8 месяцев',
      details: 'Набор мышечной массы +10 кг, улучшение силовых показателей'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === transformations.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? transformations.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-[var(--secondary)]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title inline-block text-[var(--text-primary)]">До / После</h2>
          <p className="text-[var(--text-primary)] max-w-3xl mx-auto mt-6">
            Реальные результаты моих клиентов. Трансформации, которые говорят сами за себя.
          </p>
        </motion.div>

        {/* Скоро добавим - Временная заглушка */}
        <motion.div 
          className="text-center p-12 border-2 border-dashed border-[var(--gray-medium)] rounded-lg bg-[var(--card-bg)] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Скоро здесь появятся реальные результаты клиентов</h3>
          <p className="text-[var(--text-primary)]">
            В данный момент идёт сбор информации и согласование с клиентами на публикацию их результатов.
          </p>
        </motion.div>

        {/* Слайдер с примерами */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-xl">
            <div className="absolute inset-0 flex items-stretch">
              {/* Левая сторона (До) */}
              <div className="w-1/2 relative border-r border-[var(--gray-medium)]">
                <div className="absolute top-0 left-0 bg-[var(--secondary)] bg-opacity-80 text-[var(--text-primary)] px-4 py-2 z-10">До</div>
                <div className="h-full relative">
                  <ImageWithBasePath 
                    src={transformations[currentSlide].before}
                    alt="До тренировок" 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              {/* Правая сторона (После) */}
              <div className="w-1/2 relative">
                <div className="absolute top-0 right-0 bg-[var(--accent)] text-[var(--text-primary)] px-4 py-2 z-10">После</div>
                <div className="h-full relative">
                  <ImageWithBasePath 
                    src={transformations[currentSlide].after}
                    alt="После тренировок" 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            {/* Инфо о трансформации */}
            <div className="absolute bottom-0 left-0 right-0 bg-[var(--secondary)] bg-opacity-90 text-[var(--text-primary)] p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h4 className="text-xl font-bold">{transformations[currentSlide].name}</h4>
                  <p className="text-[var(--text-primary)]">Продолжительность: {transformations[currentSlide].duration}</p>
                </div>
                <div className="mt-3 md:mt-0">
                  <p className="text-[var(--text-primary)]">{transformations[currentSlide].details}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Навигация слайдера */}
          <button 
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-[var(--secondary)] bg-opacity-80 text-[var(--text-primary)] p-3 rounded-full hover:bg-opacity-100 transition-all"
            onClick={prevSlide}
          >
            <FaChevronLeft />
          </button>
          <button 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-[var(--secondary)] bg-opacity-80 text-[var(--text-primary)] p-3 rounded-full hover:bg-opacity-100 transition-all"
            onClick={nextSlide}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Call-to-action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[var(--text-primary)] mb-6">Хотите стать следующим успешным примером?</p>
          <a 
            href="#contact" 
            className="btn-primary responsive-btn btn-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            data-short-text="Начать"
          >
            <span>Начать свою трансформацию</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSection; 