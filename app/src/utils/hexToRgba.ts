export function hexToRGB(hex: string, alpha: number): string {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);

    const r = (bigint >> 16) & 255,
        g = (bigint >> 8) & 255,
        b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}