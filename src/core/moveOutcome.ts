import { getTargetElements } from 'src/utils/getTargetElements';
import { checkIsGameOver } from './checkIsGameOver';
import { defaultSettings } from 'src/variables/gameSettings';
import { startGame } from './startGame';
import { moveSnake } from './moveSnake';
import { getCoreElements } from './getCoreElements';

export function moveOutcome(): void {
  const { settings, startButton } = getCoreElements();
  const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));

  if (!settings || !startButton) return;

  const { direction, rowLength, currentSnake, interval } = defaultSettings;
  const isCheckGameOver = checkIsGameOver(squares, direction, rowLength, currentSnake);

  if (isCheckGameOver && interval) {
    defaultSettings.isGameOver = true;
    clearInterval(interval);
    settings.classList.remove('disabled-settings');
    startButton.addEventListener('click', startGame);
  } else moveSnake(squares);
}
