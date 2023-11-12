import { getCoreElements } from "./getCoreElements";
let width = 0;

export function animateBackground(animationImg: string): void {
    const { container } = getCoreElements();
    if (!container) return;

    const img = document.createElement('img');
    img.setAttribute('src', animationImg);
    img.classList.add('animate-img');
    img.style.left = `${width}px`

    if (width + 76 >= window.innerWidth) width = 0;
    else width += 152;

    img.addEventListener("animationend", () => container.removeChild(img));
    container.appendChild(img);
}