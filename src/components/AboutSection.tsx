'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaMedal, FaGraduationCap, FaRegClock, FaGlobeAmericas } from 'react-icons/fa';

const AboutSection = () => {
  const achievements = [
    {
      icon: <FaMedal className="text-[var(--accent)] text-2xl" />,
      title: 'Профессиональный спортсмен',
      description: 'Бывший профессиональный спортсмен с богатым опытом'
    },
    {
      icon: <FaGraduationCap className="text-[var(--accent)] text-2xl" />,
      title: 'Высшее образование',
      description: 'Специализированное образование в сфере фитнеса'
    },
    {
      icon: <FaRegClock className="text-[var(--accent)] text-2xl" />,
      title: '7+ лет опыта',
      description: 'Богатый опыт тренерской работы с разными клиентами'
    },
    {
      icon: <FaGlobeAmericas className="text-[var(--accent)] text-2xl" />,
      title: 'Международный опыт',
      description: 'Работал с клиентами из разных стран'
    }
  ];

  return (
    <section id="about" className="py-20 bg-[var(--gray-light)]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title inline-block">Обо мне</h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Image Column */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1740" 
                alt="Персональный тренер" 
                fill 
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Алексей Фитиль</h3>
              <div className="space-y-4 mb-8">
                <p className="text-base text-[var(--text-secondary)]">
                  Бывший профессиональный спортсмен, тренер с 7-летним стажем. Работаю с новичками и профи. 
                  Высшее образование, международный опыт работы.
                </p>
                <p className="text-base text-[var(--text-secondary)]">
                  Специализируюсь на персональных тренировках, разработке индивидуальных программ и 
                  консультировании по вопросам питания и физической активности.
                </p>
              </div>
            </motion.div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item, index) => (
                <motion.div 
                  key={index}
                  className="p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] transition-colors flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center bg-[var(--secondary)] rounded-lg mb-3">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">{item.title}</h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 