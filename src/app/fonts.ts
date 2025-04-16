import { Montserrat, Roboto } from "next/font/google";

// Оптимизированная загрузка шрифта Montserrat
// Ограничиваем набор шрифтов до самых необходимых
export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"], // Ограничиваем до двух весов для ускорения загрузки
  display: "swap", // Обеспечивает отображение текста системным шрифтом до загрузки
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  adjustFontFallback: true, // Улучшает автоматический выбор fallback шрифта
});

// Оптимизированная загрузка шрифта Roboto
export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"], // Ограничиваем до двух весов для ускорения загрузки
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  preload: true,
  adjustFontFallback: true, // Улучшает автоматический выбор fallback шрифта
}); 