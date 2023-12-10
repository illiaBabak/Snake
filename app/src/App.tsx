import './App.scss';
import { useEffect } from 'react';
import { changeSizeMap } from './core/changeSizeMap';
import { changeSpeed } from './core/changeSpeed';
import { getCoreElements } from './core/getCoreElements';
import { pauseOrRestartGame } from './core/pauseOrRestartGame';
import { CheckBoxChangeEvent, SelectChangeEvent } from './types/eventTypes';
import { SPEED_MAP } from './variables/constants';
import { defaultSettings, gameSettings } from './variables/gameSettings';
import { removePresetsListeners } from './core/removePresetsListeners';
import { KEYS_TO_OPEN_PANEL } from './variables/constants';
import { openOrCloseAdminPanel } from './core/openOrCloseAdminPanel';
import { showImgInput } from './core/showImgInput';
import { handleInput } from './core/handleInput';
import { openOrCloseModal } from './core/openOrCloseModal';
import { endSwap, startSwap } from './core/swapDirection';
import { startGame } from './core/startGame';
import { moveOutcome } from './core/moveOutcome';
import { addEventListeners } from './core/addEventListeners';
import { changeCSSVariable } from './core/changeCSSVariable';

function App(): JSX.Element {
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
      addPresetButton,
      setAnimation,
      newSpeedInput,
      closeModalButton,
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
      !addPresetButton ||
      !setAnimation ||
      !newSpeedInput ||
      !closeModalButton ||
      !newSpeedText
    )
      return;

    addEventListeners(defaultSettings.currentSnake);

    startButton.addEventListener('click', startGame);
    closeModalButton.addEventListener('click', openOrCloseModal);
    addPresetButton.addEventListener('click', openOrCloseModal);

    speedInput.addEventListener('input', () => handleSpeedInput(speedInput, speedText));
    newSpeedInput.addEventListener('input', () => handleSpeedInput(newSpeedInput, newSpeedText));
    colorSnakeInput.addEventListener('input', () => handleColorSnakeInput(colorSnakeInput));
    colorMapInput.addEventListener('input', () => handleColorMapInput(colorMapInput));
    sizeMap.addEventListener('change', (e) => handleSizeMapChange(e as SelectChangeEvent));
    obstaclesInput.addEventListener('change', (e) => handleObstaclesInputChange(e as CheckBoxChangeEvent));
    teleportInput.addEventListener('change', (e) => handleTeleportInputChange(e as CheckBoxChangeEvent));
    setAnimation.addEventListener('change', (e) => showImgInput(e as CheckBoxChangeEvent));

    document.addEventListener('touchstart', startSwap);
    document.addEventListener('touchend', endSwap);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    document.addEventListener('keydown', restartGameUsingKeyboard);
    document.addEventListener('keyup', pauseGameUsingKeyboard);
    pauseButton.addEventListener('click', handlePause);

    return () => {
      startButton.removeEventListener('click', startGame);

      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);

      document.removeEventListener('touchstart', startSwap);
      document.removeEventListener('touchend', endSwap);

      removePresetsListeners();

      document.removeEventListener('keydown', restartGameUsingKeyboard);
      document.removeEventListener('keyup', pauseGameUsingKeyboard);
      pauseButton.removeEventListener('click', handlePause);
    };
  }, []);

  function handleSpeedInput(input: HTMLInputElement, speedText: HTMLParagraphElement) {
    speedText.innerText = input.value;
    defaultSettings.intervalTime = changeSpeed(input.value, SPEED_MAP);
  }

  function handleColorSnakeInput(input: HTMLInputElement) {
    gameSettings.colorSnake = input.value;
    changeCSSVariable(gameSettings.colorSnake, '--color-snake');
  }

  function handleColorMapInput(input: HTMLInputElement) {
    gameSettings.fieldColor = input.value;
    changeCSSVariable(gameSettings.fieldColor, '--field-color');
  }

  function handleSizeMapChange(e: SelectChangeEvent) {
    changeSizeMap(e);
    gameSettings.mapSize = defaultSettings.rowLength.toString();
  }

  function handleObstaclesInputChange(e: CheckBoxChangeEvent) {
    gameSettings.shouldObstacles = e.target.checked;
  }

  function handleTeleportInputChange(e: CheckBoxChangeEvent) {
    gameSettings.shouldTeleport = e.target.checked;
  }

  function handleKeyDown(e: KeyboardEvent) {
    defaultSettings.keysPressed[e.key] = true;
    const isOpenPanel = KEYS_TO_OPEN_PANEL.every((key) => defaultSettings.keysPressed[key]);
    const { map } = getCoreElements();

    if (isOpenPanel && map && map.classList.contains('hidden')) openOrCloseAdminPanel();
  }

  function handleKeyUp(e: KeyboardEvent) {
    delete defaultSettings.keysPressed[e.key];
  }

  function handlePause(e: MouseEvent | KeyboardEvent) {
    if (defaultSettings.isGameOver || !defaultSettings.interval) return;

    const { pauseButton, map, pauseDiv } = getCoreElements();

    e.stopPropagation();

    if (defaultSettings.isPaused && gameSettings.shouldMapFlip && map && pauseDiv) {
      map.style.transform = `rotateZ(${0}deg)`;
      pauseDiv.style.transform = `translate(-50%, -50%) rotateZ(${0}deg)`;
    }

    if (!defaultSettings.isPaused) clearInterval(defaultSettings.interval);
    else defaultSettings.interval = setInterval(moveOutcome, defaultSettings.intervalTime);

    defaultSettings.isPaused = pauseOrRestartGame(pauseButton, defaultSettings.isPaused);
  }

  function pauseGameUsingKeyboard(e: KeyboardEvent) {
    if (e.code === 'Escape') handlePause(e);
  }

  function restartGameUsingKeyboard(e: KeyboardEvent) {
    const { overlayStart, tutorialOverlay, settings } = getCoreElements();
    if (!overlayStart || !tutorialOverlay || !settings) return;

    if (
      e.code === 'Enter' &&
      !defaultSettings.isPaused &&
      overlayStart.classList.contains('hidden') &&
      tutorialOverlay.classList.contains('hidden') &&
      !settings.classList.contains('disabled-settings')
    )
      startGame();
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

      <div className='feature-message hidden'></div>

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
                    <h3 className='h3-left'>Speed</h3>
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
                  <h3 className='h3-left'>Map size</h3>
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

        <div className='column column-presets'>
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
                <option value='40'>40x40</option>
                <option value='30'>30x30</option>
                <option value='20'>20x20</option>
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

        <div className='pause disabled-settings'>Pause</div>
      </div>

      <div className='map hidden'></div>

      <div className='score-div hidden'>
        Score: <p className='score'>0</p>
      </div>
    </div>
  );
}
export default App;
