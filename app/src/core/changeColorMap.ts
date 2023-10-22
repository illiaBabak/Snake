export function changeColorMap(color: string): void {
    const root = document.documentElement;
    root.style.setProperty('--field-color', color);
}