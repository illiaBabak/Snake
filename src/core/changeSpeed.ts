export function changeSpeed(value: string, speedMap: number[]): number {
  const selectedValue = Number(value);

  return speedMap[selectedValue - 1] * 100;
}