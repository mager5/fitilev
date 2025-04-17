'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTimes, FaArrowRight } from 'react-icons/fa';
import ImageWithBasePath from './ImageWithBasePath';
import ConsultationButton from './ConsultationButton';

// Тип данных для блога
interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  content: string;
}

// Данные статей блога
const blogPosts: BlogPost[] = [
  {
    id: 'effektivnye-trenirovki-doma',
    title: 'Эффективные тренировки дома без специального оборудования',
    description: 'Узнайте, как организовать полноценные тренировки в домашних условиях, не требующие дорогостоящего оборудования.',
    image: '/images/blog/home-workout.jpg',
    date: '15 октября 2023',
    author: 'Алексей Фитиль',
    readTime: '5 мин',
    category: 'Тренировки',
    content: `
      <p>В современном мире не всегда есть возможность посещать тренажерный зал. Будь то нехватка времени, финансовые ограничения или другие обстоятельства – домашние тренировки могут стать отличной альтернативой. Главное – правильно организовать процесс.</p>
      
      <h2>Преимущества домашних тренировок</h2>
      
      <p>Тренировки дома имеют ряд существенных преимуществ:</p>
      
      <ul>
        <li>Экономия времени и денег на посещение зала</li>
        <li>Возможность заниматься в удобное время</li>
        <li>Комфортная обстановка</li>
        <li>Отсутствие необходимости ждать, когда освободится тренажер</li>
        <li>Снижение психологического дискомфорта для новичков</li>
      </ul>
      
      <p>Однако для того, чтобы домашние тренировки были эффективными, необходимо соблюдать определенные принципы.</p>
      
      <h2>Как организовать пространство</h2>
      
      <p>Для продуктивных тренировок дома вам потребуется организовать пространство, даже если оно ограничено. Достаточно небольшой площади, на которой можно свободно выполнять базовые упражнения – примерно 2x2 метра. Важно, чтобы в этой зоне не было опасных предметов, о которые можно удариться при выполнении упражнений.</p>
    `
  },
  {
    id: 'pravilnoe-pitanie-dlya-nabora-myshechnoy-massy',
    title: 'Правильное питание для набора мышечной массы',
    description: 'Разбираем основные принципы питания, которые помогут эффективно нарастить мышечную массу.',
    image: '/images/blog/muscle-nutrition.jpg',
    date: '2 ноября 2023',
    author: 'Алексей Фитиль',
    readTime: '7 мин',
    category: 'Питание',
    content: `
      <p>Набор мышечной массы – это процесс, который требует не только регулярных и интенсивных тренировок, но и правильно организованного питания. Именно питание является ключевым фактором, определяющим, насколько эффективно ваши мышцы будут расти.</p>
      
      <h2>Основные принципы питания для набора массы</h2>
      
      <p>Существует несколько ключевых принципов, которые необходимо соблюдать, если ваша цель – наращивание мышечной массы:</p>
      
      <ol>
        <li><strong>Калорийный профицит</strong> – потребляйте больше калорий, чем расходуете</li>
        <li><strong>Достаточное количество белка</strong> – основного строительного материала для мышц</li>
        <li><strong>Правильное соотношение макронутриентов</strong> – белков, жиров и углеводов</li>
      </ol>
    `
  },
  {
    id: 'kak-sovmestit-kardio-i-silovye-trenirovki',
    title: 'Как правильно совмещать кардио и силовые тренировки',
    description: 'Советы по эффективному совмещению кардио и силовых нагрузок для достижения максимальных результатов.',
    image: '/images/blog/cardio-strength.jpg',
    date: '20 декабря 2023',
    author: 'Алексей Фитиль',
    readTime: '6 мин',
    category: 'Тренировки',
    content: `
      <p>Многие люди, которые стремятся улучшить свою физическую форму, задаются вопросом: как правильно совмещать кардио и силовые тренировки? Этот вопрос актуален, поскольку оба типа тренировок имеют свои преимущества, и их грамотное сочетание может принести максимальную пользу.</p>
      
      <h2>Преимущества разных типов тренировок</h2>
      
      <p><strong>Силовые тренировки:</strong></p>
      <ul>
        <li>Увеличение мышечной массы</li>
        <li>Повышение прочности костей</li>
        <li>Ускорение обмена веществ</li>
        <li>Улучшение осанки и профилактика болей в спине</li>
      </ul>
    `
  }
];

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Открытие модального окна с статьей
  const openPostModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
  };
  
  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    // Возвращаем прокрутку
    document.body.style.overflow = 'auto';
  };
  
  // Обработчик нажатия Escape для закрытия модального окна
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  // Добавляем эффект для обработки нажатия клавиши Escape
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);

  return (
    <section id="blog" className="py-20 bg-[var(--background-alt)]">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Блог</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-[var(--text-secondary)]">
          Полезные статьи о фитнесе, правильном питании и здоровом образе жизни.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <ImageWithBasePath
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {post.category}
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-[var(--text-secondary)] mb-3 flex-wrap gap-3">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-[var(--accent-light)]" aria-hidden="true" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-1 text-[var(--accent-light)]" aria-hidden="true" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-[var(--text-secondary)] mb-4 line-clamp-3 flex-grow">
                  {post.description}
                </p>
                
                <button 
                  onClick={() => openPostModal(post)} 
                  className="inline-flex items-center text-[var(--accent)] font-medium hover:underline transition-colors duration-200"
                  aria-label={`Читать статью "${post.title}"`}
                >
                  Читать статью <FaArrowRight className="ml-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog" className="btn-secondary">
            Все статьи
          </Link>
        </div>
        
        {/* Модальное окно для просмотра статьи */}
        <AnimatePresence>
          {isModalOpen && selectedPost && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-75 p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              tabIndex={0}
            >
              <motion.div 
                className="bg-[var(--background)] rounded-lg shadow-xl max-w-4xl w-full my-8 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="blog-modal-title"
              >
                <div className="relative aspect-video w-full">
                  <ImageWithBasePath
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 bg-[var(--background)] text-[var(--text-primary)] p-2 rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors duration-200 shadow-lg"
                    onClick={closeModal}
                    aria-label="Закрыть"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="p-5 md:p-8">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="bg-[var(--accent)] text-white px-3 py-1 text-sm rounded-full shadow-sm">
                      {selectedPost.category}
                    </span>
                    
                    <div className="flex items-center text-sm text-[var(--text-secondary)]">
                      <FaCalendarAlt className="mr-1 text-[var(--accent-light)]" aria-hidden="true" />
                      <span>{selectedPost.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-[var(--text-secondary)]">
                      <FaClock className="mr-1 text-[var(--accent-light)]" aria-hidden="true" />
                      <span>Чтение: {selectedPost.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 id="blog-modal-title" className="text-2xl md:text-3xl font-bold mb-6 text-[var(--text-primary)]">
                    {selectedPost.title}
                  </h2>
                  
                  <div 
                    className="prose prose-lg dark:prose-invert max-w-none mb-8 max-h-[400px] md:max-h-[500px] overflow-y-auto pr-4 custom-scrollbar" 
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center border-t border-[var(--border-color)] pt-6 gap-4">
                    <Link 
                      href={`/blog/${selectedPost.id}`} 
                      className="text-[var(--accent)] font-medium hover:underline inline-flex items-center"
                    >
                      Читать полностью <FaArrowRight className="ml-1" />
                    </Link>
                    
                    <ConsultationButton>
                      Получить консультацию
                    </ConsultationButton>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BlogSection; 