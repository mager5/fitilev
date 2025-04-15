'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Запись ошибки в консоль или аналитику
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Что-то пошло не так!</h1>
      <p className="text-lg text-[var(--text-secondary)] mb-8">
        Произошла ошибка при загрузке страницы.
      </p>
      <button
        onClick={reset}
        className="btn-primary"
      >
        Попробовать снова
      </button>
    </div>
  );
} 