export function getRandomInteger(min: number, max: number, excludedNumbers?: number[]): number {
    const roundedMin = Math.ceil(min);
    const roundedMax = Math.floor(max);
    const number = Math.floor(Math.random() * (roundedMax - roundedMin + 1)) + roundedMin;
    if (!excludedNumbers?.includes(number)) return number;
    return getRandomInteger(roundedMin, roundedMax, excludedNumbers);
}