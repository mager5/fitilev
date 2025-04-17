'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import ConsultationButton from './ConsultationButton';

interface Schedule {
  day: string;
  date: string;
  sessions: Session[];
}

interface Session {
  id: string;
  time: string;
  title: string;
  location: string;
  trainer: string;
  maxSpots: number;
  availableSpots: number;
  level: 'начинающий' | 'средний' | 'продвинутый' | 'любой';
}

// Данные расписания (можно будет заменить на API или CMS)
const scheduleData: Schedule[] = [
  {
    day: 'Понедельник',
    date: '22 апреля',
    sessions: [
      {
        id: 'mon-1',
        time: '9:00 - 10:00',
        title: 'Утренняя функциональная тренировка',
        location: 'Онлайн Zoom',
        trainer: 'Алексей Фитиль',
        maxSpots: 10,
        availableSpots: 4,
        level: 'любой'
      },
      {
        id: 'mon-2',
        time: '18:00 - 19:00',
        title: 'Силовая тренировка',
        location: 'Фитнес студия, ул. Спортивная 10',
        trainer: 'Алексей Фитиль',
        maxSpots: 8,
        availableSpots: 2,
        level: 'средний'
      }
    ]
  },
  {
    day: 'Среда',
    date: '24 апреля',
    sessions: [
      {
        id: 'wed-1',
        time: '10:00 - 11:00',
        title: 'Тренировка на все группы мышц',
        location: 'Онлайн Zoom',
        trainer: 'Алексей Фитиль',
        maxSpots: 12,
        availableSpots: 5,
        level: 'начинающий'
      },
      {
        id: 'wed-2',
        time: '19:00 - 20:30',
        title: 'Интенсивный кардио + силовой комплекс',
        location: 'Фитнес студия, ул. Спортивная 10',
        trainer: 'Алексей Фитиль',
        maxSpots: 8,
        availableSpots: 3,
        level: 'продвинутый'
      }
    ]
  },
  {
    day: 'Пятница',
    date: '26 апреля',
    sessions: [
      {
        id: 'fri-1',
        time: '9:00 - 10:00',
        title: 'Утренняя растяжка и мобилити',
        location: 'Онлайн Zoom',
        trainer: 'Алексей Фитиль',
        maxSpots: 15,
        availableSpots: 8,
        level: 'любой'
      },
      {
        id: 'fri-2',
        time: '18:00 - 19:30',
        title: 'Комплексная функциональная тренировка',
        location: 'Фитнес студия, ул. Спортивная 10',
        trainer: 'Алексей Фитиль',
        maxSpots: 10,
        availableSpots: 1,
        level: 'средний'
      }
    ]
  },
  {
    day: 'Суббота',
    date: '27 апреля',
    sessions: [
      {
        id: 'sat-1',
        time: '11:00 - 12:30',
        title: 'Групповая тренировка на свежем воздухе',
        location: 'Парк Горького, центральная площадь',
        trainer: 'Алексей Фитиль',
        maxSpots: 15,
        availableSpots: 7,
        level: 'любой'
      }
    ]
  }
];

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Обработка клавиши Escape для закрытия модального окна
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dialogRef.current?.open) {
        closeSessionDetails();
      }
    };

    document.addEventListener('keydown', handleKeyDown as any);
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, []);

  // Фокус на контейнере при загрузке для обеспечения корректной навигации с клавиатуры
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);
  
  const getLevelColor = (level: Session['level']) => {
    switch (level) {
      case 'начинающий':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'средний':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'продвинутый':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };
  
  const getAvailabilityColor = (available: number, max: number) => {
    const percentage = (available / max) * 100;
    if (percentage <= 20) return 'text-red-600 dark:text-red-400';
    if (percentage <= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const openSessionDetails = (sessionId: string) => {
    setSelectedSession(sessionId);
    dialogRef.current?.showModal();
    
    // Установка фокуса на первый интерактивный элемент в модальном окне
    setTimeout(() => {
      const firstButton = dialogRef.current?.querySelector('button');
      if (firstButton) {
        firstButton.focus();
      }
    }, 100);
  };
  
  const closeSessionDetails = () => {
    dialogRef.current?.close();
    setSelectedSession(null);
  };
  
  // Найти выбранную сессию
  const getSelectedSession = () => {
    if (!selectedSession) return null;
    
    for (const day of scheduleData) {
      const session = day.sessions.find(s => s.id === selectedSession);
      if (session) return { day, session };
    }
    
    return null;
  };
  
  const selectedSessionDetails = getSelectedSession();

  // Определяем минимальную высоту для контейнера сессий
  // Находим максимальное количество сессий в любой день
  const maxSessionsCount = Math.max(...scheduleData.map(day => day.sessions.length));
  // Устанавливаем минимальную высоту на основе количества сессий (примерно 200px на сессию + 100px запаса)
  const minContainerHeight = maxSessionsCount > 0 ? maxSessionsCount * 200 + 100 : 300;

  return (
    <section id="schedule" className="bg-[var(--background)] py-20">
      <div className="container mx-auto px-4" ref={containerRef} tabIndex={-1}>
        <h2 className="section-title">Расписание тренировок</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-[var(--text-secondary)]">
          Присоединяйтесь к групповым тренировкам для достижения ваших фитнес-целей. Занятия проходят как онлайн, так и офлайн.
        </p>
        
        {/* Табы с днями недели - добавляем доступность */}
        <div 
          className="flex flex-wrap justify-center gap-2 mb-10" 
          role="tablist" 
          aria-label="Дни недели"
        >
          {scheduleData.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-4 py-2 md:px-6 md:py-3 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                activeDay === index
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:bg-opacity-10'
              }`}
              role="tab"
              aria-selected={activeDay === index}
              aria-controls={`panel-${index}`}
              id={`tab-${index}`}
            >
              <span className="block text-sm md:text-base">{day.day}</span>
              <span className="block text-xs md:text-sm mt-1">{day.date}</span>
            </button>
          ))}
        </div>
        
        {/* Контейнер с фиксированной минимальной высотой */}
        <div className="max-w-5xl mx-auto" style={{ minHeight: `${minContainerHeight}px` }}>
          {/* Расписание занятий для выбранного дня с улучшенной анимацией */}
          <div 
            role="tabpanel" 
            id={`panel-${activeDay}`}
            aria-labelledby={`tab-${activeDay}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {scheduleData[activeDay].sessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[var(--card-bg)] rounded-lg p-4 md:p-6 mb-4 shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FaClock className="text-[var(--accent)]" aria-hidden="true" />
                          <span className="font-medium">{session.time}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(session.level)}`}>
                            {session.level}
                          </span>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-bold mb-2 text-[var(--text-primary)]">{session.title}</h3>
                        
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm text-[var(--text-secondary)] mb-4">
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2" aria-hidden="true" />
                            <span>{session.location}</span>
                          </div>
                          <div className="flex items-center">
                            <FaUser className="mr-2" aria-hidden="true" />
                            <span>{session.trainer}</span>
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2" aria-hidden="true" />
                            <span className={getAvailabilityColor(session.availableSpots, session.maxSpots)}>
                              Осталось мест: {session.availableSpots} из {session.maxSpots}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 w-full md:w-auto">
                        <button
                          onClick={() => openSessionDetails(session.id)}
                          className="btn-secondary text-sm md:text-base px-4 py-2 md:whitespace-nowrap"
                          aria-label={`Подробнее о тренировке ${session.title}`}
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {scheduleData[activeDay].sessions.length === 0 && (
                  <div className="text-center py-10 text-[var(--text-secondary)]">
                    Нет запланированных тренировок на этот день
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Информационный блок */}
        <div className="mt-12 bg-[var(--card-bg)] p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Хотите индивидуальное расписание?</h3>
          <p className="mb-6 text-[var(--text-secondary)]">
            Если у вас есть особые требования или вы хотите создать персональное расписание тренировок, 
            свяжитесь со мной для обсуждения деталей и составления индивидуального плана.
          </p>
          <ConsultationButton>Получить индивидуальный план</ConsultationButton>
        </div>
        
        {/* Модальное окно с деталями сессии */}
        <dialog
          ref={dialogRef}
          className="modal bg-transparent backdrop:bg-black backdrop:bg-opacity-50 p-0 max-w-2xl w-full rounded-xl shadow-xl"
          onClick={(e) => {
            if (e.target === dialogRef.current) closeSessionDetails();
          }}
          aria-labelledby="session-details-title"
          aria-modal="true"
        >
          {selectedSessionDetails && (
            <div className="bg-[var(--background)] p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-[var(--accent)]">
                    {selectedSessionDetails.day.day}, {selectedSessionDetails.day.date}
                  </p>
                  <h3 id="session-details-title" className="text-2xl font-bold text-[var(--text-primary)]">
                    {selectedSessionDetails.session.title}
                  </h3>
                </div>
                <button
                  onClick={closeSessionDetails}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded"
                  aria-label="Закрыть"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <FaClock className="text-[var(--accent)] mt-1 mr-3" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Время</p>
                    <p className="text-[var(--text-secondary)]">{selectedSessionDetails.session.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-[var(--accent)] mt-1 mr-3" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Место</p>
                    <p className="text-[var(--text-secondary)]">{selectedSessionDetails.session.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaUser className="text-[var(--accent)] mt-1 mr-3" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Тренер</p>
                    <p className="text-[var(--text-secondary)]">{selectedSessionDetails.session.trainer}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[var(--accent)] mt-1 mr-3" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Уровень сложности</p>
                    <p className="text-[var(--text-secondary)]">{selectedSessionDetails.session.level}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaCalendarAlt className="text-[var(--accent)] mt-1 mr-3" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Доступные места</p>
                    <p className={`${getAvailabilityColor(
                      selectedSessionDetails.session.availableSpots, 
                      selectedSessionDetails.session.maxSpots
                    )}`}>
                      {selectedSessionDetails.session.availableSpots} из {selectedSessionDetails.session.maxSpots}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-[var(--border-color)] pt-6">
                <h4 className="font-medium mb-2 text-[var(--text-primary)]">Описание тренировки</h4>
                <p className="text-[var(--text-secondary)] mb-6">
                  Детальное описание тренировки {selectedSessionDetails.session.title.toLowerCase()}. 
                  Здесь будет информация о том, что ожидает участников, какое снаряжение потребуется,
                  и какие результаты можно получить от занятия.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <ConsultationButton className="flex-1">
                    Записаться на тренировку
                  </ConsultationButton>
                  <button
                    onClick={closeSessionDetails}
                    className="btn-secondary flex-1"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          )}
        </dialog>
      </div>
    </section>
  );
};

export default ScheduleSection; 