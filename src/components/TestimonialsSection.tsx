'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  imageUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Елена Иванова',
    role: 'Клиент, 8 месяцев тренировок',
    comment: 'Благодаря Алексею я смогла сбросить 12 кг за 6 месяцев. Его подход к тренировкам и питанию действительно работает. Особенно ценю индивидуальный подход и постоянную поддержку.',
    rating: 5,
    imageUrl: '/images/programs/general-fitness.jpg'
  },
  {
    id: 2,
    name: 'Максим Петров',
    role: 'Клиент, 5 месяцев тренировок',
    comment: 'Я пришел к Алексею с целью набрать мышечную массу. За 5 месяцев работы мне удалось набрать 7 кг качественной мышечной массы. Профессиональный подход и отличные результаты!',
    rating: 5,
    imageUrl: '/images/programs/muscle-gain.jpg'
  },
  {
    id: 3,
    name: 'Ольга Смирнова',
    role: 'Клиент, 3 месяца тренировок',
    comment: 'После родов никак не могла вернуться в форму. Алексей составил для меня программу, учитывающую мои особенности, и уже через 3 месяца я вижу потрясающие результаты. Рекомендую!',
    rating: 5,
    imageUrl: '/images/programs/recovery.jpg'
  },
  {
    id: 4,
    name: 'Дмитрий Козлов',
    role: 'Клиент, 12 месяцев тренировок',
    comment: 'Год назад я даже не мог подумать, что смогу пробежать марафон. Благодаря грамотно составленной программе тренировок от Алексея, я не только достиг этой цели, но и улучшил общую физическую форму.',
    rating: 5,
    imageUrl: '/images/programs/weight-loss.jpg'
  },
  {
    id: 5,
    name: 'Анна Соколова',
    role: 'Клиент, 6 месяцев тренировок',
    comment: 'Онлайн-тренировки с Алексеем оказались даже эффективнее, чем занятия в зале. Четкая программа, постоянный контроль и мотивация - вот что помогло мне достичь желаемых результатов.',
    rating: 5,
    imageUrl: '/images/programs/general-fitness.jpg'
  }
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  
  // Функция для управления перелистыванием отзывов
  const changeTestimonial = useCallback((newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      setCurrentTestimonial(prev => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentTestimonial(prev => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    }
  }, []);
  
  // Автоматическое перелистывание отзывов
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        changeTestimonial(1);
      }, 6000);
    };
    
    startInterval();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [changeTestimonial]);
  
  // Обработка свайпов на мобильных устройствах
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    
    // Останавливаем автоматическое перелистывание при взаимодействии
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (diff > 50) {
      // Свайп влево - следующий отзыв
      changeTestimonial(1);
    } else if (diff < -50) {
      // Свайп вправо - предыдущий отзыв
      changeTestimonial(-1);
    }
    
    // Возобновляем автоматическое перелистывание
    intervalRef.current = setInterval(() => {
      changeTestimonial(1);
    }, 6000);
  };
  
  // Обработка навигации по клавишам
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      changeTestimonial(-1);
    } else if (e.key === 'ArrowRight') {
      changeTestimonial(1);
    }
  };

  // Отображение звездочек рейтинга
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? "text-yellow-400" : "text-gray-300"} 
        aria-hidden="true"
      />
    ));
  };
  
  // Вычисляем максимальную высоту отзыва для фиксированной высоты контейнера
  const getMaxTestimonialHeight = () => {
    // Возьмем максимальную длину комментария для оценки высоты
    const maxCommentLength = Math.max(...testimonials.map(t => t.comment.length));
    // Базовая высота для контента + добавочная высота на основе длины текста
    // Добавляем небольшой запас для уверенности
    return Math.max(300, 200 + Math.ceil(maxCommentLength / 40) * 20);
  };
  
  const testimonialContainerHeight = getMaxTestimonialHeight();

  return (
    <section id="testimonials" className="bg-[var(--background-alt)] py-20" aria-label="Отзывы клиентов">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Отзывы клиентов</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-[var(--text-secondary)]">
          Узнайте, что говорят мои клиенты о результатах нашей совместной работы.
        </p>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Карусель отзывов"
          aria-roledescription="carousel"
        >
          <div 
            className="overflow-hidden relative rounded-xl bg-[var(--card-bg)] p-2 md:p-6 shadow-lg"
            style={{ minHeight: `${testimonialContainerHeight}px` }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial}
                custom={direction}
                initial={{ 
                  opacity: 0,
                  x: direction > 0 ? 300 : -300 
                }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5 }
                }}
                exit={{ 
                  opacity: 0,
                  x: direction > 0 ? -300 : 300,
                  transition: { duration: 0.5 }
                }}
                className="p-4 md:p-6"
                aria-roledescription="slide"
                aria-label={`Отзыв ${currentTestimonial + 1} из ${testimonials.length}`}
              >
                <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                  {testimonials[currentTestimonial].imageUrl && (
                    <div className="shrink-0">
                      <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden bg-[var(--accent)] bg-opacity-10 border-2 border-[var(--accent)] shadow-lg">
                        <img 
                          src={testimonials[currentTestimonial].imageUrl}
                          alt={`${testimonials[currentTestimonial].name}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="mb-4 text-[var(--accent)]">
                      <FaQuoteLeft size={24} />
                    </div>
                    
                    <blockquote>
                      <p className="text-lg md:text-xl mb-4 text-[var(--text-primary)]">
                        {testimonials[currentTestimonial].comment}
                      </p>
                    </blockquote>
                    
                    <div className="flex items-center space-x-1 mb-2" aria-label={`Рейтинг: ${testimonials[currentTestimonial].rating} из 5`}>
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                    
                    <div className="mt-4">
                      <p className="font-bold text-[var(--text-primary)]">{testimonials[currentTestimonial].name}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Кнопки навигации - адаптивные для мобильных устройств */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => changeTestimonial(-1)}
              className="p-2 sm:p-3 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] shadow-md"
              aria-label="Предыдущий отзыв"
            >
              <FaChevronLeft size={16} className="sm:hidden" />
              <FaChevronLeft size={18} className="hidden sm:block" />
            </button>
            
            {/* Индикаторы для мобильных и десктопов */}
            <div className="flex items-center space-x-2" role="tablist">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentTestimonial ? 1 : -1);
                    setCurrentTestimonial(index);
                  }}
                  className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                    currentTestimonial === index 
                      ? 'bg-[var(--accent)]' 
                      : 'bg-[var(--border-color)] hover:bg-[var(--accent)] hover:bg-opacity-50'
                  }`}
                  aria-selected={currentTestimonial === index}
                  aria-label={`Перейти к отзыву ${index + 1}`}
                  role="tab"
                />
              ))}
            </div>
            
            <button
              onClick={() => changeTestimonial(1)}
              className="p-2 sm:p-3 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] shadow-md"
              aria-label="Следующий отзыв"
            >
              <FaChevronRight size={16} className="sm:hidden" />
              <FaChevronRight size={18} className="hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 