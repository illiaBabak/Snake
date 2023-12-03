const root = document.documentElement;

export function changeCSSVariable(value: string, variable: string): void {
    root.style.setProperty(variable, value);
}