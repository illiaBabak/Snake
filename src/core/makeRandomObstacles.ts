import { getRandomInteger } from 'src/utils/getRandomInteger';

const EXCLUDED_CLASS_NAMES = ['snake', 'apple', 'super-apple', 'teleport-el'];

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
  });

  return excludedNumbers;
}

export function makeRandomObstacles(squares: HTMLDivElement[], rowLength: number): void {
  const mapIndexes = squares.map((_, index) => index);
  const subArrays = generateSubArrays(mapIndexes, rowLength);
  const excludedNumbers = generateExcludedValues(subArrays);
  const obstacleLength = getRandomInteger(2, 6);
  let lengthArr: number[] = [];
  let obstaclesIndex = 0;

  while (true) {
    obstaclesIndex = getRandomInteger(0, squares.length - rowLength * 2 - 1, excludedNumbers);
    lengthArr = Array.from({ length: obstacleLength }, (_, i) => i + obstaclesIndex);
    const shouldBreak = lengthArr.every(
      (el) =>
        !excludedNumbers.includes(el) &&
        !EXCLUDED_CLASS_NAMES.some((className) => squares[el].classList.contains(className))
    );
    if (shouldBreak) break;
  }

  lengthArr.forEach((el) => {
    squares[el].classList.add('obstacle-el');
    squares[el].style.backgroundImage = "url('/content/obstacles.jpg')";
    squares[el].style.backgroundSize = 'cover';
    squares[el].style.backgroundPosition = 'center';
  });
}
