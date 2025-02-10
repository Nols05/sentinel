import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeek(date: Date) {
  const selectedDate = new Date(date);
  const firstDayOfWeek = new Date(selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay()));
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  const startOfWeek = firstDayOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endOfWeek = lastDayOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const ISOFormat = `${firstDayOfWeek.toISOString().split('T')[0]}/${lastDayOfWeek.toISOString().split('T')[0]}`; //ex: 2022-01-02/2022-01-08

  return { startOfWeek, endOfWeek, ISOFormat };
}



