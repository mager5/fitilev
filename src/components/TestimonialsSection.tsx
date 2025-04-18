'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
    name: 'Фатима',
    role: '17 июня 2021, ЛФК',
    comment: 'Замечательный специалист. Помог моему ребёнку в реабилитации руки после сложного перелома. Спасибо большое!',
    rating: 5,
    imageUrl: '/images/testimonials/fatima.jpg'
  },
  {
    id: 2,
    name: 'Марина',
    role: '15 июля 2020, ЛФК',
    comment: 'Обратились к Алексею по поводу проведения ЛФК у мальчика после компрессионного перелома позвоночника. Алексей - прекрасный профессионал своего дела, очень грамотно подобрал упражнения и научил их делать. Занимаемся вторую неделю под его контролем, постепенно усложняем программу занятий, результат уже виден, значительно укрепились мышцы спины. Лишний раз убеждаюсь, что для того, чтобы добиться хорошего результата, лучше обратиться к профессионалу. Алексей доброжелательный и приятный в общении человек, очень ответственно подходит к своей работе. Будем продолжать занятия.',
    rating: 5,
    imageUrl: '/images/testimonials/marina.jpg'
  },
  {
    id: 3,
    name: 'Олеся',
    role: '24 октября 2019, Фитнес',
    comment: 'Занимаюсь с Алексеем на постоянной основе. Тактичный, внимательный тренер. Не перегружает, но и не даёт раскиснуть. После каждой тренировки чувствую эффект на мышцах. Но и нет такого, что выпадаю из жизни из-за болей в теле. Надеюсь, скоро придём к результату!',
    rating: 5,
    imageUrl: '/images/testimonials/olesya.jpg'
  }
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const [expanded, setExpanded] = useState(false);
  
  // Функция для управления перелистыванием отзывов
  const changeTestimonial = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setExpanded(false); // Сбрасываем состояние развернутости при смене отзыва
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
  
  // Функция для переключения развернутого состояния отзыва
  const toggleExpanded = () => {
    setExpanded(!expanded);
    
    // Останавливаем автоматическое перелистывание когда пользователь развернул отзыв
    if (!expanded && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else if (expanded) {
      // Возобновляем когда свернули обратно
      intervalRef.current = setInterval(() => {
        changeTestimonial(1);
      }, 6000);
    }
  };
  
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
    // Задаем базовую высоту для всех экранов
    return {
      mobile: 400, // Высота для мобильных устройств
      desktop: 400 // Высота для десктопов
    };
  };
  
  const testimonialHeight = getMaxTestimonialHeight();

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
            className="overflow-hidden relative rounded-xl bg-[var(--card-bg)] p-2 md:p-6 shadow-lg md:max-h-[var(--max-height-desktop)]"
            style={{
              minHeight: `${expanded ? 'auto' : testimonialHeight.mobile}px`,
              height: expanded ? 'auto' : undefined,
              '--max-height-desktop': `${testimonialHeight.desktop}px`,
            } as React.CSSProperties}
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
                className="p-3 md:p-6"
                aria-roledescription="slide"
                aria-label={`Отзыв ${currentTestimonial + 1} из ${testimonials.length}`}
              >
                <div className="flex flex-col items-center md:flex-row md:items-start gap-4 md:gap-6">
                  {testimonials[currentTestimonial].imageUrl && (
                    <div className="shrink-0 mb-2 md:mb-0">
                      <div className="h-20 w-20 md:h-32 md:w-32 rounded-full overflow-hidden bg-[var(--accent)] bg-opacity-10 border-2 border-[var(--accent)] shadow-lg">
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
                    <div className="mb-3 text-[var(--accent)]">
                      <FaQuoteLeft size={24} />
                    </div>
                    
                    <blockquote>
                      <div 
                        className={`relative overflow-hidden transition-all duration-300 ${
                          expanded ? "" : "max-h-[8em] sm:max-h-[8.5em]" // Уменьшаем на мобильных
                        }`}
                      >
                        <p className="text-base md:text-lg mb-3 text-[var(--text-primary)]">
                          {testimonials[currentTestimonial].comment}
                        </p>
                        
                        {!expanded && testimonials[currentTestimonial].comment.length > 150 && (
                          <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-[var(--card-bg)] to-transparent"></div>
                        )}
                      </div>
                      
                      {testimonials[currentTestimonial].comment.length > 150 && (
                        <button 
                          onClick={toggleExpanded} 
                          className="flex items-center gap-2 text-[var(--accent)] hover:underline mt-2 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 rounded-sm text-sm"
                          aria-expanded={expanded}
                          aria-controls={`testimonial-${currentTestimonial}`}
                        >
                          {expanded ? (
                            <>
                              <span>Свернуть</span>
                              <FaChevronUp size={12} />
                            </>
                          ) : (
                            <>
                              <span>Читать полностью</span>
                              <FaChevronDown size={12} />
                            </>
                          )}
                        </button>
                      )}
                    </blockquote>
                    
                    <div className="flex items-center space-x-1 mb-1 mt-3" aria-label={`Рейтинг: ${testimonials[currentTestimonial].rating} из 5`}>
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                    
                    <div className="mt-1">
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
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
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