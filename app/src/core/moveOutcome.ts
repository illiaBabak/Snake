import { getTargetElements } from 'src/utils/getTargetElements';
import { checkIsGameOver } from './checkIsGameOver';
import { defaultSettings } from 'src/variables/variables';
import { startGame } from './startGame';
import { moveSnake } from './moveSnake';
import { getCoreElements } from './getCoreElements';

export function moveOutcome(): void {
  const { settings, startButton } = getCoreElements();
  const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));

  if (!settings || !startButton) return;

  if (
    checkIsGameOver(squares, defaultSettings.direction, defaultSettings.rowLength, defaultSettings.currentSnake) &&
    defaultSettings.interval
  ) {
    defaultSettings.isGameOver = true;
    clearInterval(defaultSettings.interval);
    settings.classList.remove('disabled-settings');
    startButton.addEventListener('click', startGame);
  } else moveSnake(squares);
}
