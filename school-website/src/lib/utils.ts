import { type ClassValue, clsx } from "clsx";
import { format, Locale } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const captalizeFirstChar = (word = "") =>
  word.charAt(0).toUpperCase() + word.slice(1);

export function generateNumberRange(from = 0, to = 10) {
  if (from > to) [from, to] = [to, from];
  return Array.from({ length: to - from + 1 }, (_, i) => i + from);
}

export function generateYearRange(
  from = new Date().getFullYear() - 25,
  to = new Date().getFullYear() + 2
) {
  return generateNumberRange(from, to);
}

export const generateMonthNames = (locale?: Locale) =>
  Array.from({ length: 12 }, (_, i) =>
    captalizeFirstChar(format(new Date(2021, i), "MMMM", { locale }))
  );
