'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCheck, FaGlobeAmericas, FaChartLine, FaBullhorn } from 'react-icons/fa';
import Modal from './Modal';

const AdvantagesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdvantage, setSelectedAdvantage] = useState<string>('');

  const advantages = [
    {
      icon: <FaUserCheck className="text-[var(--accent)] text-4xl mb-4" />,
      title: 'Индивидуальный подход',
      description: 'Программа тренировок и питания, разработанная специально для вас с учетом ваших целей и физических возможностей.'
    },
    {
      icon: <FaGlobeAmericas className="text-[var(--accent)] text-4xl mb-4" />,
      title: 'Опыт за границей',
      description: 'Опыт работы с клиентами из разных стран позволяет применять международные подходы и методики.'
    },
    {
      icon: <FaChartLine className="text-[var(--accent)] text-4xl mb-4" />,
      title: 'Долгосрочная система',
      description: 'Создание устойчивой системы тренировок и питания, которая будет работать на протяжении долгого времени.'
    },
    {
      icon: <FaBullhorn className="text-[var(--accent)] text-4xl mb-4" />,
      title: 'Поддержка и мотивация',
      description: 'Постоянная поддержка, мотивация и корректировка программы для достижения максимальных результатов.'
    }
  ];

  const handleCardClick = (title: string) => {
    setSelectedAdvantage(title);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-[var(--secondary)] text-[var(--text-primary)]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title inline-block text-[var(--text-primary)]">Мои преимущества</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-6">
            Почему клиенты выбирают тренировки со мной и достигают результатов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div 
              key={index}
              className="bg-[var(--card-bg)] p-6 rounded-lg glass-card cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleCardClick(advantage.title)}
            >
              <div className="flex flex-col items-center text-center">
                {advantage.icon}
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">{advantage.title}</h3>
                <p className="text-[var(--text-primary)]">{advantage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[var(--accent)] mb-2">100+</div>
            <div className="text-gray-300">Довольных клиентов</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[var(--accent)] mb-2">7+</div>
            <div className="text-gray-300">Лет опыта</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[var(--accent)] mb-2">4</div>
            <div className="text-gray-300">Направления</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[var(--accent)] mb-2">24/7</div>
            <div className="text-gray-300">Поддержка</div>
          </motion.div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{selectedAdvantage}</h3>
            <p className="mb-6">
              {advantages.find(adv => adv.title === selectedAdvantage)?.description}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn-primary"
            >
              Закрыть
            </button>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default AdvantagesSection; 