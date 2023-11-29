import { getRandomInteger } from "src/utils/getRandomInteger";
import { defaultSettings, gameSettings } from "src/variables/variables";
import { animateBackground } from "./animateBackground";
import { changeSpeed } from "./changeSpeed";
import { CLASSES_TO_REMOVE_AFTER_START, CLASSES_TO_REMOVE_IN_APPLE, KEY_PRESS_COOLDOWN, SPEED_MAP } from "src/variables/constants";
import { removeClasses } from "./removeClasses";
import { makeRandomApple } from "./makeRandomApple";
import { changeDirection } from "./changeDirection";
import { moveOutcome } from "./moveOutcome";
import { getCoreElements } from "./getCoreElements";

export function startGame(): void {
    const { scoreText, settings, startButton, speedInput, squares } = getCoreElements();
    if (!squares || !settings || !speedInput || !scoreText || !startButton) return;

    if (!settings.classList.contains('hidden')) defaultSettings.intervalTime = changeSpeed(speedInput.value, SPEED_MAP);

    if (gameSettings.animationImg) {
        let counter = 0;
        setInterval(() => {
            const timer = getRandomInteger(10, 80);
            counter += 50 + timer * 20;

            setTimeout(() => {
                animateBackground(gameSettings.animationImg);
            }, counter);
        }, 50);
    }

    defaultSettings.isGameOver = false;
    defaultSettings.rotateDirection = false;
    defaultSettings.currentSnake = [3, 2, 1];
    defaultSettings.direction = 1;
    defaultSettings.rowLength = Number(gameSettings.mapSize);

    defaultSettings.score = 0;
    scoreText.innerText = defaultSettings.score.toString();

    removeClasses(squares, CLASSES_TO_REMOVE_AFTER_START.concat(CLASSES_TO_REMOVE_IN_APPLE));

    settings.classList.add('disabled-settings');
    startButton.classList.add('disabled-settings');
    startButton.removeEventListener('click', startGame);

    makeRandomApple(squares);

    defaultSettings.interval = setInterval(moveOutcome, defaultSettings.intervalTime);

    document.addEventListener('keydown', (e) => {
        if (!['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code) || !defaultSettings.canPressKey) return;
        defaultSettings.direction = changeDirection(
            e.code,
            defaultSettings.rowLength,
            defaultSettings.direction,
            defaultSettings.rotateDirection
        );

        defaultSettings.canPressKey = false;
        setTimeout(() => {
            defaultSettings.canPressKey = true;
        }, defaultSettings.intervalTime * KEY_PRESS_COOLDOWN);
    });
}