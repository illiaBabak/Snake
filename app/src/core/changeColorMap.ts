const root = document.documentElement;

export function changeColorMap(color: string): void {
    root.style.setProperty('--field-color', color);
}