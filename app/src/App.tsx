import './App.scss';
import { useEffect } from 'react';
import { getTargetElement } from './utils/getTargetElement';
import { getTargetElements } from './utils/getTargetElements';
import { changeDirection } from './core/changeDirection';
import { makeRandomApple } from './core/makeRandomApple';
import { checkIsGameOver } from './core/checkIsGameOver';
import { changeColorSnake } from './core/changeColorSnake';
import { changeColorMap } from './core/changeColorMap';
import { changeSizeMap } from './core/changeSizeMap';
import { changeSpeed } from './core/changeSpeed';
import { getCoreElements } from './core/getCoreElements';
import { pauseOrRestartGame } from './core/pauseOrRestartGame';
import { CheckBoxChangeEvent, SelectChangeEvent } from './types/eventTypes';
import { ACCELERATION_FACTOR } from './variables/constants';
import { SPEED_MAP } from './variables/constants';
import { generateObstacles } from './core/generateObstacles';
import { CLASSES_TO_REMOVE_IN_APPLE } from './variables/constants';
import { removeClasses } from './core/removeClasses';
import { CLASSES_TO_REMOVE_AFTER_START } from './variables/constants';
import { generateTeleports } from './core/generateTeleports';
import { KEY_PRESS_COOLDOWN } from './variables/constants';
import { addEventListeners } from './core/addEventListeners';
import { moveSnakeParts } from './core/moveSnakeParts';
import { gameSettings } from './variables/variables';
import { addPresetsListeners } from './core/addPresetsListeners';
import { showTutorial } from './core/showTutorial';
import { closeTutorial } from './core/closeTutorial';
import { removePresetsListeners } from './core/removePresetsListeners';
import { KeysPressed } from './types/preset';
import { keysToOpenPanel } from './variables/constants';
import { openOrCloseAdminPanel } from './core/openOrCloseAdminPanel';
import { createListPresets } from './core/createListPresets';
import { showImgInput } from './core/showImgInput';
import { handleInput } from './core/handleInput';
import { openOrCloseModal } from './core/openOrCloseModal';
import { rotateMap } from './core/rotateMap';
import { animateBackground } from './core/animateBackground';
import { getRandomInteger } from './utils/getRandomInteger';

function App(): JSX.Element {
  const keysPressed: KeysPressed = {};
  let currentSnake = [3, 2, 1];
  let direction = 1;
  let score = 0;
  let intervalTime = 700;
  let interval: NodeJS.Timeout | null = null;
  let rowLength = 40;
  let isPaused = false;
  let isGameOver = false;
  let canPressKey = true;
  let rotateDirection = false;

  useEffect(() => {
    const {
      overlayStart,
      tutorialOverlay,
      map,
      showTutorialButton,
      closeTutorialButton,
      startButton,
      panel,
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
      addPresetButton,
      setAnimation,
      newSpeedInput,
      closeModalButton,
      acceptButton,
      newSpeedText,
    } = getCoreElements();

    if (
      !showTutorialButton ||
      !overlayStart ||
      !tutorialOverlay ||
      !map ||
      !panel ||
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
      !listEls ||
      !addPresetButton ||
      !setAnimation ||
      !newSpeedInput ||
      !closeModalButton ||
      !acceptButton ||
      !newSpeedText
    )
      return;

    addEventListeners(currentSnake);

    createListPresets();

    addPresetsListeners();

    startButton.addEventListener('click', startGame);
    closeModalButton.addEventListener('click', handleOpenModal);
    addPresetButton.addEventListener('click', handleOpenModal);

    speedInput.addEventListener('input', () => handleSpeedInput(speedInput, speedText));
    newSpeedInput.addEventListener('input', () => handleSpeedInput(newSpeedInput, newSpeedText));
    colorSnakeInput.addEventListener('input', () => handleColorSnakeInput(colorSnakeInput));
    colorMapInput.addEventListener('input', () => handleColorMapInput(colorMapInput));
    sizeMap.addEventListener('change', (e) => handleSizeMapChange(e as SelectChangeEvent));
    obstaclesInput.addEventListener('change', (e) => handleObstaclesInputChange(e as CheckBoxChangeEvent));
    teleportInput.addEventListener('change', (e) => handleTeleportInputChange(e as CheckBoxChangeEvent));
    setAnimation.addEventListener('change', (e) => showImgInput(e as CheckBoxChangeEvent));

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    document.addEventListener('keydown', restartGameUsingKeyboard);
    document.addEventListener('keyup', pauseGameUsingKeyboard);
    pauseButton.addEventListener('click', handlePause);

    return () => {
      startButton.removeEventListener('click', startGame);

      speedInput.removeEventListener('input', () => handleSpeedInput(speedInput, speedText));
      colorSnakeInput.removeEventListener('input', () => handleColorSnakeInput(colorSnakeInput));
      colorMapInput.removeEventListener('input', () => handleColorMapInput(colorMapInput));
      sizeMap.removeEventListener('change', (e) => handleSizeMapChange(e as SelectChangeEvent));
      obstaclesInput.removeEventListener('change', (e) => handleObstaclesInputChange(e as CheckBoxChangeEvent));
      teleportInput.removeEventListener('change', (e) => handleTeleportInputChange(e as CheckBoxChangeEvent));
      setAnimation.removeEventListener('change', (e) => showImgInput(e as CheckBoxChangeEvent));
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);

      removePresetsListeners();

      showTutorialButton.removeEventListener('click', () => showTutorial(overlayStart, tutorialOverlay));
      closeTutorialButton.removeEventListener('click', () => closeTutorial(currentSnake, tutorialOverlay, map));

      document.removeEventListener('keydown', restartGameUsingKeyboard);
      document.removeEventListener('keyup', pauseGameUsingKeyboard);
      pauseButton.removeEventListener('click', handlePause);
    };
  }, []);

  function handleOpenModal(): void {
    const { closeModalButton, addPresetButton } = getCoreElements();
    if (!closeModalButton || !addPresetButton) return;

    openOrCloseModal();
  }

  function handleSpeedInput(input: HTMLInputElement, speedText: HTMLParagraphElement) {
    speedText.innerText = input.value;
    intervalTime = changeSpeed(input.value, SPEED_MAP);
  }

  function handleColorSnakeInput(input: HTMLInputElement) {
    gameSettings.colorSnakeGame = input.value;
    changeColorSnake(gameSettings.colorSnakeGame);
  }

  function handleColorMapInput(input: HTMLInputElement) {
    gameSettings.colorMap = input.value;
    changeColorMap(gameSettings.colorMap);
  }

  function handleSizeMapChange(e: SelectChangeEvent) {
    rowLength = changeSizeMap(e, rowLength);
    gameSettings.mapSize = rowLength.toString();
  }

  function handleObstaclesInputChange(e: CheckBoxChangeEvent) {
    gameSettings.shouldUseObstacles = e.target.checked;
  }

  function handleTeleportInputChange(e: CheckBoxChangeEvent) {
    gameSettings.shouldUseTeleports = e.target.checked;
  }

  function handleKeyDown(e: KeyboardEvent) {
    keysPressed[e.key] = true;
    const isOpenPanel = keysToOpenPanel.every((key) => keysPressed[key]);
    const { map } = getCoreElements();

    if (isOpenPanel && map && map.classList.contains('hidden')) openOrCloseAdminPanel();
  }

  function handleKeyUp(e: KeyboardEvent) {
    delete keysPressed[e.key];
  }

  function handlePause(e: MouseEvent | KeyboardEvent) {
    if (isGameOver || !interval) return;

    const { pauseButton } = getCoreElements();

    e.stopPropagation();

    if (!isPaused) clearInterval(interval);
    else interval = setInterval(moveOutcome, intervalTime);

    isPaused = pauseOrRestartGame(pauseButton, isPaused);
  }

  function pauseGameUsingKeyboard(e: KeyboardEvent) {
    if (e.code === 'Escape') handlePause(e);
  }

  function restartGameUsingKeyboard(e: KeyboardEvent) {
    const { overlayStart, tutorialOverlay } = getCoreElements();
    if (!overlayStart || !tutorialOverlay) return;

    if (
      e.code === 'Enter' &&
      !isPaused &&
      overlayStart.classList.contains('hidden') &&
      tutorialOverlay.classList.contains('hidden')
    )
      startGame();
  }

  function startGame(): void {
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));
    const settings = getTargetElement('settings', document.getElementsByTagName('div'));
    const startButton = getTargetElement('start-try-again', document.getElementsByTagName('div'));
    const speedInput = getTargetElement('speed-input', document.getElementsByTagName('input'));
    const scoreP = getTargetElement('score', document.getElementsByTagName('p'));

    if (!squares || !settings || !speedInput || !scoreP || !startButton) return;

    if (!settings.classList.contains('hidden')) intervalTime = changeSpeed(speedInput.value, SPEED_MAP);

    if (gameSettings.animationImg) {
      let counter = 0;
      setInterval(() => {
        const timer = getRandomInteger(10, 40);
        counter += 50 + timer * 20;

        setTimeout(() => {
          animateBackground(gameSettings.animationImg);
        }, counter);
      }, 50);
    }

    isGameOver = false;
    rotateDirection = false;
    currentSnake = [3, 2, 1];
    direction = 1;
    rowLength = Number(gameSettings.mapSize);

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
      direction = changeDirection(e.code, rowLength, direction, rotateDirection);

      canPressKey = false;
      setTimeout(() => {
        canPressKey = true;
      }, intervalTime * KEY_PRESS_COOLDOWN);
    });
  }

  function moveOutcome(): void {
    const settings = getTargetElement('settings', document.getElementsByTagName('div'));
    const startButton = getTargetElement('start-try-again', document.getElementsByTagName('div'));
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));

    if (!settings || !startButton) return;

    if (checkIsGameOver(squares, direction, rowLength, currentSnake) && interval) {
      isGameOver = true;
      clearInterval(interval);
      settings.classList.remove('disabled');
      startButton.addEventListener('click', startGame);
    } else moveSnake(squares);
  }

  function moveSnake(squares: HTMLDivElement[]): void {
    if (!squares) return;

    const tail = currentSnake.pop();

    if (tail) squares[tail].classList.remove('snake');
    else squares[0].classList.remove('snake');

    moveSnakeParts(squares, currentSnake, direction);
    changeColorSnake(gameSettings.colorSnakeGame);

    if (tail) eatApple(squares, tail);
  }

  function eatApple(squares: HTMLDivElement[], tail: number): void {
    const { isMapFlip, isDirectionFlip } = gameSettings;
    const { map, directionMessage } = getCoreElements();
    if (!interval || !map || !directionMessage) return;

    if (
      squares[currentSnake[0]].classList.contains('super-apple') ||
      squares[currentSnake[0]].classList.contains('apple')
    ) {
      let loopN = 1;
      if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        makeRandomApple(squares);

        removeClasses(squares, CLASSES_TO_REMOVE_IN_APPLE);

        if (isDirectionFlip) {
          rotateDirection = !rotateDirection;
          directionMessage.classList.remove('hidden');

          setTimeout(() => {
            directionMessage.classList.add('hidden');
          }, 1200);
        }

        if (isMapFlip) rotateMap(map);
        if (gameSettings.shouldUseObstacles) generateObstacles(squares, score, rowLength);
        if (score >= 5 && gameSettings.shouldUseTeleports) generateTeleports(squares, score, rowLength);
      } else loopN = 5;

      squares[currentSnake[0]].classList.remove('super-apple');
      squares[tail].classList.add('snake');

      changeColorSnake(gameSettings.colorSnakeGame);
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
            <div className='list-wrapper'></div>
          </div>
        </div>
      </div>

      <div className='direction-message hidden'>Change of direction!</div>

      <div className='error-message hidden'></div>

      <div className='overlay-modal hidden'>
        <div className='modal-wrapper'>
          <div className='error-message-modal hidden'>Invalid login or password</div>
          <div className='modal'>
            <h1>Confirm</h1>
            <hr />
            <div className='row'>
              <p className='login-text'>Login</p>
              <input type='text' className='login-input' />
            </div>
            <div className='row'>
              <p className='password-text'>Password</p>
              <input type='password' className='password-input' />
            </div>
            <div className='container-buttons'>
              <div className='accept'>Accept</div>
              <div className='cancel'>Cancel</div>
            </div>
          </div>
        </div>
      </div>

      <div className='admin-panel hidden'>
        <div className='panel'>
          <h1 className='new-preset-h1'>New preset</h1>

          <div className='preset-settings'>
            <div className='preset-settings-wrapper'>
              <div className='column inputs-column'>
                <div className='line'>
                  <label>
                    <h3>Preset name</h3>
                    <input type='text' className='preset-text' name='name' onChange={handleInput}></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Start img</h3>
                    <input type='url' className='new-start-img' name='startImg' onChange={handleInput}></input>
                  </label>
                </div>

                <div className='line line-animation-img disabled'>
                  <label>
                    <h3>Img animation</h3>
                    <input type='url' className='animation-img' name='animationImg' onChange={handleInput}></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Color page</h3>
                    <input type='color' className='new-color-page' name='colorPage' onChange={handleInput}></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Color Snake</h3>
                    <input type='color' className='new-color-snake' name='colorSnake' onChange={handleInput}></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Color field</h3>
                    <input type='color' className='new-color-field' name='fieldColor' onChange={handleInput}></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Color shadow</h3>
                    <input type='color' className='new-color-shadow' name='shadowColor' onChange={handleInput}></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Speed</h3>
                    <input
                      type='range'
                      min={1}
                      max={10}
                      defaultValue={4}
                      className='new-speed-input'
                      name='speed'
                      onChange={handleInput}
                    ></input>
                    <p className='new-speed-p'>4</p>
                  </label>
                </div>

                <div className='line'>
                  <h3>Map size</h3>
                  <select className='select-size new-map-size' name='mapSize' onChange={handleInput}>
                    <option value={'40'}>40x40</option>
                    <option value={'30'}>30x30</option>
                    <option value={'20'}>20x20</option>
                  </select>
                </div>
              </div>

              <div className='column checkbox-column'>
                <div className='line'>
                  <label>
                    <h3>Obstacles</h3>
                    <input
                      type='checkbox'
                      className='new-obstacles-input'
                      name='shouldObstacles'
                      onChange={handleInput}
                    ></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Teleport</h3>
                    <input
                      type='checkbox'
                      className='new-teleport-input'
                      name='shouldTeleport'
                      onChange={handleInput}
                    ></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Show settings</h3>
                    <input
                      type='checkbox'
                      className='show-settings-check'
                      name='showSettings'
                      onChange={handleInput}
                    ></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Map flip</h3>
                    <input type='checkbox' className='map-flip' name='shouldMapFlip' onChange={handleInput}></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Direction flip</h3>
                    <input
                      type='checkbox'
                      className='direction-flip'
                      name='shouldDirectionFlip'
                      onChange={handleInput}
                    ></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Change speed</h3>
                    <input
                      type='checkbox'
                      className='change-speed'
                      name='shouldChangeSpeed'
                      onChange={handleInput}
                    ></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Change opacity</h3>
                    <input
                      type='checkbox'
                      className='change-opacity'
                      name='shouldOpacity'
                      onChange={handleInput}
                    ></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Change color</h3>
                    <input
                      type='checkbox'
                      className='change-color'
                      name='shouldChangeColor'
                      onChange={handleInput}
                    ></input>
                  </label>
                </div>

                <div className='line'>
                  <label>
                    <h3>Set animation</h3>
                    <input
                      type='checkbox'
                      className='set-animation'
                      name='shouldAnimation'
                      onChange={handleInput}
                    ></input>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='add-preset disabled'>Add new preset</div>
        </div>

        <div className='column'>
          <h1 className='header-presets'>PRESETS</h1>
          <div className='list list-panel'>
            <div className='list-wrapper-panel'></div>
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
        <div className='settings'>
          <div>
            <h2>Settings</h2>
            <div className='speed settings-field'>
              <p>Speed</p>
              <input type='range' min={1} max={10} defaultValue={4} className='speed-input'></input>
              <p className='speed-p'>4</p>
            </div>
            <div className='color-snake settings-field'>
              <p>Color snake</p>
              <input type='color' defaultValue={'#151515'} className='color-snake-input'></input>
            </div>
            <div className='color-map settings-field'>
              <p>Color map</p>
              <input type='color' defaultValue={'#6b0f0f'} className='color-map-input'></input>
            </div>

            <div className='size-map settings-field'>
              <p>Map size</p>
              <select className='select-size map-size'>
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
