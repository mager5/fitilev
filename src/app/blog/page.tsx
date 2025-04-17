import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithBasePath from '@/components/ImageWithBasePath';

// Метаданные для SEO
export const metadata = {
  title: 'Блог о фитнесе и здоровом образе жизни | Алексей Фитиль',
  description: 'Полезные статьи о фитнесе, тренировках, питании и здоровом образе жизни от профессионального тренера.',
  keywords: 'фитнес блог, здоровый образ жизни, тренировки, питание, спорт, советы тренера',
};

// Список статей блога
const blogPosts = [
  {
    id: 'effektivnye-trenirovki-doma',
    title: 'Эффективные тренировки дома без специального оборудования',
    description: 'Узнайте, как организовать полноценные тренировки в домашних условиях, не требующие дорогостоящего оборудования.',
    image: '/images/blog/home-workout.jpg',
    date: '15 октября 2023',
    author: 'Алексей Фитиль',
    readTime: '5 мин',
    category: 'Тренировки'
  },
  {
    id: 'pravilnoe-pitanie-dlya-nabora-myshechnoy-massy',
    title: 'Правильное питание для набора мышечной массы',
    description: 'Разбираем основные принципы питания, которые помогут эффективно нарастить мышечную массу.',
    image: '/images/blog/muscle-nutrition.jpg',
    date: '2 ноября 2023',
    author: 'Алексей Фитиль',
    readTime: '7 мин',
    category: 'Питание'
  },
  {
    id: 'kak-sovmestit-kardio-i-silovye-trenirovki',
    title: 'Как правильно совмещать кардио и силовые тренировки',
    description: 'Советы по эффективному совмещению кардио и силовых нагрузок для достижения максимальных результатов.',
    image: '/images/blog/cardio-strength.jpg',
    date: '20 декабря 2023',
    author: 'Алексей Фитиль',
    readTime: '6 мин',
    category: 'Тренировки'
  },
  {
    id: 'vosstanovlenie-posle-trenirovok',
    title: 'Восстановление после тренировок: ключевые аспекты',
    description: 'Важность правильного восстановления для роста мышц и повышения эффективности тренировок.',
    image: '/images/blog/recovery.jpg',
    date: '8 января 2024',
    author: 'Алексей Фитиль',
    readTime: '5 мин',
    category: 'Восстановление'
  },
  {
    id: 'rastyazhka-dlya-uluchsheniya-gibkosti',
    title: 'Растяжка для улучшения гибкости и профилактики травм',
    description: 'Комплекс упражнений на растяжку, который поможет улучшить гибкость и снизить риск травм.',
    image: '/images/blog/blog1.jpg',
    date: '17 февраля 2024',
    author: 'Алексей Фитиль',
    readTime: '4 мин',
    category: 'Гибкость'
  },
  {
    id: 'psihologicheskie-aspekty-trenirovok',
    title: 'Психологические аспекты эффективных тренировок',
    description: 'Как психологический настрой влияет на результаты тренировок и как его улучшить.',
    image: '/images/blog/blog3.jpg',
    date: '5 марта 2024',
    author: 'Алексей Фитиль',
    readTime: '8 мин',
    category: 'Психология'
  }
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main" className="main-content bg-[var(--background)] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Блог о фитнесе и здоровом образе жизни</h1>
          
          <p className="text-center max-w-3xl mx-auto mb-12 text-[var(--text-secondary)]">
            Полезные статьи, советы и рекомендации для эффективных тренировок и здорового образа жизни.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ImageWithBasePath
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                </Link>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-[var(--text-secondary)] mb-3 space-x-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" aria-hidden="true" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2" aria-hidden="true" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.id}`} className="block">
                    <h2 className="text-xl font-bold mb-3 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-[var(--text-secondary)] mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-block text-[var(--accent)] font-medium hover:underline"
                    aria-label={`Читать статью "${post.title}"`}
                  >
                    Читать статью →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 