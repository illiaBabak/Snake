import { getRandomInteger } from "src/utils/getRandomInteger";

export function makeRandomApple(squares: HTMLDivElement[], appleIndex: number): void {
    const isSuperApple = getRandomInteger(0, 1);
    let superAppleIndex = 0;

    if (isSuperApple == 1) {
        do {
            superAppleIndex = getRandomInteger(0, squares.length - 1);
        } while (squares[superAppleIndex].classList.contains("snake"));
        squares[superAppleIndex].classList.add('super-apple');

        setTimeout(() => {
            squares[superAppleIndex].classList.remove('super-apple');
        }, 6500);
    }

    do {
        appleIndex = getRandomInteger(0, squares.length - 1);
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple");
}