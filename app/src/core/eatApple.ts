import { defaultSettings, gameSettings } from 'src/variables/variables';
import { getCoreElements } from './getCoreElements';
import { makeRandomApple } from './makeRandomApple';
import { removeClasses } from './removeClasses';
import { ACCELERATION_FACTOR, CLASSES_TO_REMOVE_IN_APPLE } from 'src/variables/constants';
import { changeRandomColor } from './changeRandomColor';
import { changeOpacity } from './changeOpacity';
import { moveOutcome } from './moveOutcome';
import { showFeatureMsg } from './showFeatureMsg';
import { generateTeleports } from './generateTeleports';
import { rotateMap } from './rotateMap';
import { generateObstacles } from './generateObstacles';
import { changeColorSnake } from './changeColorSnake';

export function eatApple(squares: HTMLDivElement[], tail: number): void {
  const { map, colorSnakeInput, scoreText, pauseDiv } = getCoreElements();
  const { rowLength } = defaultSettings;

  if (!defaultSettings.interval || !map || !colorSnakeInput || !pauseDiv) return;

  if (
    squares[defaultSettings.currentSnake[0]].classList.contains('super-apple') ||
    squares[defaultSettings.currentSnake[0]].classList.contains('apple')
  ) {
    let loopN = 1;
    if (squares[defaultSettings.currentSnake[0]].classList.contains('apple')) {
      squares[defaultSettings.currentSnake[0]].classList.remove('apple');
      makeRandomApple(squares);

      removeClasses(squares, CLASSES_TO_REMOVE_IN_APPLE);

      if (gameSettings.shouldDirectionFlip) defaultSettings.rotateDirection = !defaultSettings.rotateDirection;

      if (gameSettings.shouldChangeSpeed) {
        gameSettings.colorSnake = changeRandomColor();
        colorSnakeInput.value = gameSettings.colorSnake;
      }

      if (gameSettings.shouldOpacity) {
        defaultSettings.isChangeOpacity = !defaultSettings.isChangeOpacity;
        changeOpacity(defaultSettings.isChangeOpacity);
      }

      if (gameSettings.shouldChangeSpeed && defaultSettings.score % 3 === 0) {
        const normalIntervalTime = defaultSettings.intervalTime;

        defaultSettings.intervalTime *= ACCELERATION_FACTOR / 2;

        setTimeout(() => {
          if (defaultSettings.interval && !defaultSettings.isGameOver) {
            clearInterval(defaultSettings.interval);
            defaultSettings.intervalTime = normalIntervalTime;
            if (!defaultSettings.isPaused) defaultSettings.interval = setInterval(moveOutcome, normalIntervalTime);
          }
        }, 1800);
      }

      showFeatureMsg(
        gameSettings.shouldDirectionFlip,
        gameSettings.shouldOpacity,
        gameSettings.shouldChangeSpeed,
        defaultSettings.score
      );

      if (gameSettings.shouldMapFlip) rotateMap(map, pauseDiv);
      if (gameSettings.shouldObstacles) generateObstacles(squares, defaultSettings.score, rowLength);
      if (defaultSettings.score >= 5 && gameSettings.shouldTeleport)
        generateTeleports(squares, defaultSettings.score, rowLength);
    } else loopN = 5;

    squares[defaultSettings.currentSnake[0]].classList.remove('super-apple');
    squares[tail].classList.add('snake');

    changeColorSnake(gameSettings.colorSnake);
    clearInterval(defaultSettings.interval);

    for (let i = 0; i < loopN; i++) {
      defaultSettings.currentSnake.push(tail);
      defaultSettings.intervalTime = defaultSettings.intervalTime * ACCELERATION_FACTOR;
    }

    defaultSettings.interval = setInterval(moveOutcome, defaultSettings.intervalTime);

    defaultSettings.score += loopN;

    if (scoreText) scoreText.innerText = defaultSettings.score.toString();
  }
}
