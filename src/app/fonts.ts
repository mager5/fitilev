import { Montserrat, Roboto } from "next/font/google";

// Оптимизированная загрузка шрифта Montserrat
export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap", // Важно для оптимизации загрузки шрифтов
  fallback: ["system-ui", "sans-serif"], // Fallback шрифты
  preload: true, // Предзагрузка шрифтов
});

// Оптимизированная загрузка шрифта Roboto
export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap", // Важно для оптимизации загрузки шрифтов
  fallback: ["Arial", "sans-serif"], // Fallback шрифты
  preload: true, // Предзагрузка шрифтов
}); 