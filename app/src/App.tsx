import './App.scss';
import { useEffect } from 'react';
import { getTargetElement } from './utils/getTargetElement';
import { getTargetElements } from './utils/getTargetElements';
import { changeDirection } from './core/changeDirection';
import { makeRandomApple } from './core/makeRandomApple';
import { isGameOver } from './core/isGameOver';
import { changeColorSnake } from './core/changeColorSnake';
import { changeColorMap } from './core/changeColorMap';
import { changeSizeMap } from './core/changeSizeMap';
import { changeSpeed } from './core/changeSpeed';
import { getCoreElements } from './core/getCoreElements';
import { pauseGame } from './core/pauseGame';
import { restartGame } from './core/restartGame';
import { SelectChangeEvent } from './types/SelectChangeEvent';
import { ACCELERATION_FACTOR } from './constants/constants';
import { SPEED_MAP } from './constants/constants';
import { DEFAULT_PRESETS } from './constants/constants';
import { generateObstacles } from './core/generateObstacles';
import { CLASSES_TO_REMOVE_IN_APPLE } from './constants/constants';
import { removeClasses } from './core/removeClasses';
import { CLASSES_TO_REMOVE_AFTER_START } from './constants/constants';
import { generateTeleports } from './core/generateTeleports';
import { KEY_PRESS_COOLDOWN } from './constants/constants';
import { addEventListeners } from './core/addEventListeners';
import { moveSnakeParts } from './core/moveSnakeParts';
import { changePreset } from './core/changePreset';

function App(): JSX.Element {
  let currentSnake = [3, 2, 1];
  let direction = 1;
  let score = 0;
  let intervalTime = 700;
  let interval: NodeJS.Timeout | null = null;
  let colorSnakeGame = '#151515';
  let colorMap = '#ffc66a';
  let rowLength = 40;
  let isPause = false;
  let isGameOverValue = false;
  let isObstacles = false;
  let isTeleport = false;
  let isSettings = true;
  let canPressKey = true;

  useEffect(() => {
    const {
      overlayStart,
      tutorialOverlay,
      map,
      showTutorialButton,
      closeTutorialButton,
      startButton,
      speedInput,
      speedText,
      colorSnakeInput,
      colorMapInput,
      sizeMap,
      settings,
      pauseButton,
      obstaclesInput,
      teleportInput,
      listEls,
    } = getCoreElements();

    if (
      !showTutorialButton ||
      !overlayStart ||
      !tutorialOverlay ||
      !map ||
      !closeTutorialButton ||
      !startButton ||
      !speedInput ||
      !speedText ||
      !colorSnakeInput ||
      !colorMapInput ||
      !sizeMap ||
      !settings ||
      !pauseButton ||
      !obstaclesInput ||
      !teleportInput ||
      !listEls
    )
      return;

    addEventListeners(currentSnake, isSettings);

    for (let i = 0; i < listEls.length; i++) {
      const { showSettings, colorSnake, fieldColor, colorPage, startImg, feature, shadowColor } = DEFAULT_PRESETS[i];

      listEls[i].addEventListener('click', () => {
        const {
          colorSnakeGame: updatedColorSnakeGame,
          colorMap: updatedColorMap,
          isSettings: updatedIsSettings,
        } = changePreset(
          { showSettings, colorSnake, fieldColor, colorPage, startImg, feature, shadowColor },
          colorSnakeGame,
          colorMap,
          isSettings
        );

        colorSnakeGame = updatedColorSnakeGame;
        colorMap = updatedColorMap;
        isSettings = updatedIsSettings;
      });
    }

    startButton.addEventListener('click', startGame);

    speedInput.addEventListener('input', () => {
      speedText.innerText = speedInput.value;
      intervalTime = changeSpeed(speedInput.value, SPEED_MAP);
    });

    colorSnakeInput.addEventListener('input', () => {
      colorSnakeGame = colorSnakeInput.value;
      changeColorSnake(colorSnakeGame);
    });

    colorMapInput.addEventListener('input', () => {
      colorMap = colorMapInput.value;
      changeColorMap(colorMap);
    });

    sizeMap.addEventListener('change', (e) => {
      rowLength = changeSizeMap(e as SelectChangeEvent, rowLength);
    });

    obstaclesInput.addEventListener('change', () => {
      if (obstaclesInput.checked) isObstacles = true;
      else isObstacles = false;
    });

    teleportInput.addEventListener('change', () => {
      if (teleportInput.checked) isTeleport = true;
      else isTeleport = false;
    });

    document.addEventListener('keydown', restartGameUsingKeyboard);

    document.addEventListener('keyup', pauseGameUsingKeyboard);

    pauseButton.addEventListener('click', handleClick);

    return () => {
      pauseButton.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', restartGameUsingKeyboard);
      document.removeEventListener('keyup', pauseGameUsingKeyboard);
    };
  }, []);

  function handleClick(e: MouseEvent | KeyboardEvent) {
    const { pauseButton } = getCoreElements();

    e.stopPropagation();

    if (!isGameOverValue && interval) {
      if (!isPause) {
        isPause = pauseGame(pauseButton);
        clearInterval(interval);
      } else {
        isPause = restartGame(pauseButton);
        interval = setInterval(moveOutcome, intervalTime);
      }
    }
  }

  function pauseGameUsingKeyboard(e: KeyboardEvent) {
    const { overlayStart, tutorialOverlay } = getCoreElements();
    if (!overlayStart || !tutorialOverlay) return;

    e.stopPropagation();

    if (
      e.code === 'Escape' &&
      overlayStart.classList.contains('hidden') &&
      tutorialOverlay.classList.contains('hidden')
    )
      handleClick(e);
  }

  function restartGameUsingKeyboard(e: KeyboardEvent) {
    const { overlayStart, tutorialOverlay, settings } = getCoreElements();
    if (!overlayStart || !tutorialOverlay || !settings) return;

    e.stopPropagation();

    if (
      e.code === 'Enter' &&
      !settings.classList.contains('disabled') &&
      overlayStart.classList.contains('hidden') &&
      tutorialOverlay.classList.contains('hidden')
    )
      startGame();
  }

  function startGame() {
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));
    const settings = getTargetElement('settings', document.getElementsByTagName('div'));
    const startButton = getTargetElement('start-try-again', document.getElementsByTagName('div'));
    const speedInput = getTargetElement('speed-input', document.getElementsByTagName('input'));
    const scoreP = getTargetElement('score', document.getElementsByTagName('p'));

    if (!squares || !settings || !speedInput || !scoreP || !startButton) return;

    if (!settings.classList.contains('hidden')) intervalTime = changeSpeed(speedInput.value, SPEED_MAP);
    isGameOverValue = false;

    currentSnake = [3, 2, 1];
    direction = 1;

    score = 0;
    scoreP.innerText = score.toString();

    removeClasses(squares, CLASSES_TO_REMOVE_AFTER_START.concat(CLASSES_TO_REMOVE_IN_APPLE));

    settings.classList.add('disabled');
    startButton.classList.add('disabled');
    startButton.removeEventListener('click', startGame);

    makeRandomApple(squares);

    interval = setInterval(moveOutcome, intervalTime);

    document.addEventListener('keydown', (e) => {
      if (!['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code) || !canPressKey) return;
      direction = changeDirection(e.code, rowLength, direction);

      canPressKey = false;
      setTimeout(() => {
        canPressKey = true;
      }, intervalTime * KEY_PRESS_COOLDOWN);
    });
  }

  function moveOutcome() {
    const settings = getTargetElement('settings', document.getElementsByTagName('div'));
    const startButton = getTargetElement('start-try-again', document.getElementsByTagName('div'));
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));

    if (!settings || !startButton) return;

    if (isGameOver(squares, direction, rowLength, currentSnake) && interval) {
      isGameOverValue = true;
      clearInterval(interval);
      settings.classList.remove('disabled');
      startButton.addEventListener('click', startGame);
    } else moveSnake(squares);
  }

  function moveSnake(squares: HTMLDivElement[]) {
    if (!squares) return;

    const tail = currentSnake.pop();

    if (tail) squares[tail].classList.remove('snake');
    else squares[0].classList.remove('snake');

    moveSnakeParts(squares, currentSnake, direction);
    changeColorSnake(colorSnakeGame);

    if (tail) eatApple(squares, tail);
  }

  function eatApple(squares: HTMLDivElement[], tail: number) {
    if (!interval) return;

    if (
      squares[currentSnake[0]].classList.contains('super-apple') ||
      squares[currentSnake[0]].classList.contains('apple')
    ) {
      let loopN = 1;
      if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        makeRandomApple(squares);

        removeClasses(squares, CLASSES_TO_REMOVE_IN_APPLE);

        if (isObstacles) generateObstacles(squares, score, rowLength);
        if (score >= 5 && isTeleport) generateTeleports(squares, score, rowLength);
      } else loopN = 5;

      squares[currentSnake[0]].classList.remove('super-apple');
      squares[tail].classList.add('snake');

      changeColorSnake(colorSnakeGame);
      clearInterval(interval);

      for (let i = 0; i < loopN; i++) {
        currentSnake.push(tail);
        intervalTime = intervalTime * ACCELERATION_FACTOR;
      }

      interval = setInterval(moveOutcome, intervalTime);

      score += loopN;
      const scoreP = getTargetElement('score', document.getElementsByTagName('p'));
      if (scoreP) scoreP.innerText = score.toString();
    }
  }

  return (
    <div className='container'>
      <div className='overlay-start'>
        <div className='column'>
          <div className='header'>
            <p>Snake game</p>
          </div>
          <div className='img-block'>
            <img src='https://www.google.com/logos/fnbx/snake_arcade/cta_alt.png' className='start-img'></img>
          </div>
          <div className='show-tutorial-button'>Start</div>
        </div>

        <div className='column'>
          <p className='header-presets'>PRESETS</p>
          <div className='list'>
            <div className='list-wrapper'>
              <div className='list-el' data-tooltip='a'>
                Classic
              </div>
              <div className='list-el' data-tooltip='b'>
                Horror
              </div>
              <div className='list-el' data-tooltip='c'>
                Halloween
              </div>
              <div className='list-el' data-tooltip='d'>
                Winter
              </div>
              <div className='list-el' data-tooltip='e'>
                Jungle
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='tutorial-overlay hidden'>
        <div className='show-tutorial'>
          <div className='tutorial-header'>Tutorial</div>
          <p>
            In the Snake game, the player uses the keys to move the "snake" around the board. When a snake finds an
            apple, it eats it and thus becomes bigger. The game ends when the snake either moves to the boundary or
            moves into itself. The goal is to make the snake as big as possible before that happens.
          </p>
          <div className='tutorial-body'>
            <div className='column'>
              <img src='content/computer_key_W.png'></img>
              <p className='tutorial-p'>Top</p>
            </div>
            <div className='column'>
              <img src='content/computer_key_A.png'></img>
              <p className='tutorial-p'>Left</p>
            </div>
            <div className='column'>
              <img src='content/computer_key_S.png'></img>
              <p className='tutorial-p'>Bottom</p>
            </div>
            <div className='column'>
              <img src='content/computer_key_D.png'></img>
              <p className='tutorial-p'>Right</p>
            </div>
          </div>
          <div className='start-button'>Ok</div>
        </div>
      </div>

      <div className='pause-div hidden'>||</div>

      <div className='container-settings hidden'>
        <div className='settings hidden'>
          <div>
            <h2>Settings</h2>
            <div className='speed settings-field'>
              <p>Speed</p>
              <input type='range' min={1} max={10} defaultValue={4} className='speed-input'></input>
              <p className='speed-p'>4</p>
            </div>
            <div className='color-snake settings-field'>
              <p>Color snake</p>
              <input type='color' defaultValue={'#6b0f0f'} className='color-snake-input'></input>
            </div>
            <div className='color-map settings-field'>
              <p>Color map</p>
              <input type='color' defaultValue={'#151515'} className='color-map-input'></input>
            </div>

            <div className='size-map settings-field'>
              <p>Map size</p>
              <select className='select-size'>
                <option value={'40'}>40x40</option>
                <option value={'30'}>30x30</option>
                <option value={'20'}>20x20</option>
              </select>
            </div>

            <div className='obstacles settings-field'>
              <p>Obstacles</p>
              <input type='checkbox' className='obstacles-input'></input>
            </div>

            <div className='teleport settings-field'>
              <p>Teleport</p>
              <input type='checkbox' className='teleport-input'></input>
            </div>
          </div>
        </div>

        <div className='start-try-again'>Start game</div>

        <div className='pause'>Pause</div>
      </div>

      <div className='map hidden'></div>

      <div className='score-div hidden'>
        Score: <p className='score'>0</p>
      </div>
    </div>
  );
}
export default App;
