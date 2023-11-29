const root = document.documentElement;

export function changeColorSnake(color: string): void {
    root.style.setProperty('--color-snake', color);
}