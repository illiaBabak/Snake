export function getRandomInteger(min: number, max: number, excludedNumbers?: number[]): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    if (excludedNumbers?.includes(number)) return getRandomInteger(min, max, excludedNumbers);
    return number;
}