import { getRandomInteger } from "src/utils/getRandomInteger";

const EXCLUDED_CLASS_NAMES = ['snake', 'teleport-el', 'obstacle-el'];

export function makeRandomApple(squares: HTMLDivElement[]): void {
    const isSuperApple = getRandomInteger(0, 15);
    let superAppleIndex = 0;
    let appleIndex = 0;

    if (isSuperApple == 1) {
        while (true) {
            superAppleIndex = getRandomInteger(0, squares.length - 1);
            const shouldBreak = !EXCLUDED_CLASS_NAMES.some((className) => squares[superAppleIndex].classList.contains(className));
            if (shouldBreak) break;
        }
        squares[superAppleIndex].classList.add('super-apple');

        setTimeout(() => {
            squares[superAppleIndex].classList.remove('super-apple');
        }, 6500);
    }

    while (true) {
        appleIndex = getRandomInteger(0, squares.length - 1);
        const shouldBreak = !EXCLUDED_CLASS_NAMES.some((className) => squares[appleIndex].classList.contains(className));
        if (shouldBreak) break;
    }
    squares[appleIndex].classList.add("apple");
}