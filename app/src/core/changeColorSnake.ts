export function changeColorSnake(color: string): void {
    const root = document.documentElement;
    root.style.setProperty('--color-snake', color);
}