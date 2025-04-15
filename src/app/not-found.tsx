import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-medium mb-6">Страница не найдена</h2>
      <p className="text-lg text-[var(--text-secondary)] mb-8">
        Страница, которую вы ищете, не существует или была перемещена.
      </p>
      <Link href="/" className="btn-primary">
        Вернуться на главную
      </Link>
    </div>
  );
} 