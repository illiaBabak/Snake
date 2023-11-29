import { getCoreElements } from './getCoreElements';

const FULL_IMG_WIDTH = 76;
let width = 0;

export function animateBackground(animationImg: string): void {
  const { container } = getCoreElements();
  if (!container) return;

  const img = document.createElement('img');
  img.setAttribute('src', animationImg);
  img.classList.add('animate-img');
  img.style.left = `${width}px`;

  if (width + FULL_IMG_WIDTH >= window.innerWidth) width = 0;
  else width += FULL_IMG_WIDTH * 2;

  img.addEventListener('animationend', () => container.removeChild(img));
  container.appendChild(img);
}
