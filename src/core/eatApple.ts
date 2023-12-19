import { defaultSettings, gameSettings } from 'src/variables/gameSettings';
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
import { changeCSSVariable } from './changeCSSVariable';

export function eatApple(squares: HTMLDivElement[], tail: number): void {
  const { map, colorSnakeInput, scoreText, pauseDiv } = getCoreElements();
  const { rowLength } = defaultSettings;
  const snakeStartClassList = squares[defaultSettings.currentSnake[0]].classList;

  if (!defaultSettings.interval || !map || !colorSnakeInput || !pauseDiv) return;

  if (snakeStartClassList.contains('super-apple') || snakeStartClassList.contains('apple')) {
    let snakeIncrement = 1;
    if (snakeStartClassList.contains('apple')) {
      snakeStartClassList.remove('apple');
      makeRandomApple(squares);

      removeClasses(squares, CLASSES_TO_REMOVE_IN_APPLE);

      if (gameSettings.shouldDirectionFlip) defaultSettings.rotateDirection = !defaultSettings.rotateDirection;

      if (gameSettings.shouldChangeColor) {
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

      if (gameSettings.shouldDirectionFlip) showFeatureMsg('Change of direction!\n');
      if (gameSettings.shouldOpacity) showFeatureMsg('Change of opacity!\n');
      if (gameSettings.shouldChangeSpeed && defaultSettings.score % 3 === 0) showFeatureMsg('Speed 2x!\n');
      if (gameSettings.shouldMapFlip) showFeatureMsg('Map flip!');

      if (gameSettings.shouldMapFlip) rotateMap(map, pauseDiv);
      if (gameSettings.shouldObstacles) generateObstacles(squares, defaultSettings.score, rowLength);
      if (defaultSettings.score >= 5 && gameSettings.shouldTeleport)
        generateTeleports(squares, defaultSettings.score, rowLength);
    } else {
      snakeIncrement = 5;
      snakeStartClassList.remove('super-apple');
    }

    squares[tail].classList.add('snake');

    changeCSSVariable(gameSettings.colorSnake, '--color-snake');
    clearInterval(defaultSettings.interval);

    for (let i = 0; i < snakeIncrement; i++) {
      defaultSettings.currentSnake.push(tail);
      defaultSettings.intervalTime = defaultSettings.intervalTime * ACCELERATION_FACTOR;
    }

    defaultSettings.interval = setInterval(moveOutcome, defaultSettings.intervalTime);

    defaultSettings.score += snakeIncrement;

    if (scoreText) scoreText.innerText = defaultSettings.score.toString();
  }
}
