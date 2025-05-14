import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidInstagramUrl(url: string): boolean {
  // Basic validation for instagram post URLs
  const regex = /^https?:\/\/(www\.)?instagram\.com\/p\/[\w-]+\/?/i;
  return regex.test(url);
}

export function extractPostIdFromUrl(url: string): string | null {
  // Extract post ID from instagram URL
  const regex = /instagram\.com\/p\/([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function createConfetti() {
  const colors = ['#E1306C', '#C13584', '#833AB4', '#405DE6'];
  const container = document.body;
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundColor = getRandomElement(colors);
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `-10px`;
    confetti.style.animationDelay = `${Math.random() * 3}s`;
    confetti.style.animation = `confetti ${3 + Math.random() * 5}s ease-in-out forwards`;
    container.appendChild(confetti);
    
    // Remove confetti after animation ends
    setTimeout(() => {
      confetti.remove();
    }, 8000);
  }
}