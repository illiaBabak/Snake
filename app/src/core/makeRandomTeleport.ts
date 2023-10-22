import { getRandomInteger } from 'src/utils/getRandomInteger';

const EXCLUDED_CLASS_NAMES = ['snake', 'apple', 'super-apple', 'obstacle-el'];

function generateSubArrays(array: number[], length: number) {
  const resultArr: number[][] = [];
  for (let i = 0; i < array.length; i += length) {
    resultArr.push(array.slice(i, i + length));
  }

  return resultArr;
}

function generateExcludedValues(array: number[][]) {
  const excludedNumbers: number[] = [];
  array.forEach((el) => {
    excludedNumbers.push(el[0], el[1], el[el.length - 1], el[el.length - 2]);
  })

  return excludedNumbers;
}

export function makeRandomTeleport(
  squares: HTMLDivElement[],
  rowLength: number
): void {
  const mapIndexes = squares.map((_, index) => index);
  const subArrays = generateSubArrays(mapIndexes, rowLength);
  const excludedNumbers = generateExcludedValues(subArrays);
  let firstTeleportIndex = 0;
  let secondTeleportIndex = 0;

  while (true) {
    firstTeleportIndex = getRandomInteger(rowLength * 2, squares.length - rowLength * 2 - 1, excludedNumbers);
    secondTeleportIndex = getRandomInteger(rowLength * 2, squares.length - rowLength * 2 - 1, excludedNumbers);

    const shouldBreak = [firstTeleportIndex, secondTeleportIndex].every((el) => !EXCLUDED_CLASS_NAMES.some((className) => squares[el].classList.contains(className)));
    if (shouldBreak) break;
  }

  squares[firstTeleportIndex].classList.add('teleport-el', 'first-teleport');
  squares[secondTeleportIndex].classList.add('teleport-el', 'second-teleport');
}

