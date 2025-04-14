'use client';

import { motion } from 'framer-motion';
import { FaDumbbell, FaLaptop, FaClipboardCheck } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    {
      icon: <FaDumbbell className="text-[var(--accent)] text-4xl mb-4" />,
      title: 'Онлайн-тренировки',
      description: 'Индивидуальные тренировки через видеосвязь с учетом ваших целей, физической подготовки и доступного оборудования.'
    },
    {
      icon: <FaLaptop className="text-[var(--accent)] text-4xl mb-4" />,
      title: 'Онлайн-сопровождение',
      description: 'Еженедельные консультации, корректировка программы, разбор техники выполнения упражнений и постоянная поддержка.'
    },
    {
      icon: <FaClipboardCheck className="text-[var(--accent)] text-4xl mb-4" />,
      title: 'Онлайн-курсы',
      description: 'Структурированные программы тренировок для достижения конкретных целей. В разработке...'
    }
  ];

  return (
    <section id="services" className="py-20 bg-[var(--secondary)]">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Услуги</h2>
        <p className="section-description text-center mb-12">
          Персональный подход к каждому клиенту. Все тренировки и консультации проходят онлайн, 
          что позволяет заниматься в удобное для вас время из любой точки мира.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-[var(--gray-light)] rounded-lg p-8 shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <a href="#pricing" className="btn-primary inline-block mx-auto">
            Узнать стоимость
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection; 