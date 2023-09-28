import './App.scss';
import { useEffect } from 'react';
import { showTutorial } from './core/showTutorial';
import { getTargetElement } from './utils/getTargetElement';
import { getTargetElements } from './utils/getTargetElements';
import { changeDirection } from './core/changeDirection';
import { makeRandomApple } from './core/makeRandomApple';
import { isGameOver } from './core/isGameOver';
import { createMain } from './core/createMain';
import { closeTutorial } from './core/closeTutorial';
import { changeColorSnake } from './core/changeColorSnake';
import { changeColorMain } from './core/changeColorMain';
import { changeSizeMain } from './core/changeSizeMain';
import { changeSpeed } from './core/changeSpeed';
import { getCoreElements } from './core/getCoreElements';

type SelectChangeEvent = Event & { target: HTMLSelectElement };

const ACCELERATION_FACTOR = 0.96;
const SPEED_MAP = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function App(): JSX.Element {
  const appleIndex = 0;
  let currentSnake = [3, 2, 1];
  let direction = 1;
  let score = 0;
  let intervalTime = 700;
  let interval: NodeJS.Timeout | null = null;
  let colorSnake = '#151515';
  let colorMain = '#ffc66a';
  let rowLength = 40;

  useEffect(() => {
    const {
      overlayStart,
      tutorialOverlay,
      main,
      showTutorialButton,
      closeTutorialButton,
      startButton,
      speedInput,
      speedText,
      colorSnakeInput,
      colorMainInput,
      sizeMain,
    } = getCoreElements();

    if (
      !showTutorialButton ||
      !overlayStart ||
      !tutorialOverlay ||
      !main ||
      !closeTutorialButton ||
      !startButton ||
      !speedInput ||
      !speedText ||
      !colorSnakeInput ||
      !colorMainInput ||
      !sizeMain
    )
      return;

    showTutorialButton.addEventListener('click', () => showTutorial(overlayStart, tutorialOverlay, main));

    closeTutorialButton.addEventListener('click', () => closeTutorial(currentSnake));

    startButton.addEventListener('click', startGame);

    createMain(40, main);

    speedInput.addEventListener('input', () => {
      speedText.innerText = speedInput.value;
      intervalTime = changeSpeed(speedInput.value, SPEED_MAP);
    });

    colorSnakeInput.addEventListener('input', () => {
      colorSnake = colorSnakeInput.value;
      changeColorSnake(colorSnake);
    });

    colorMainInput.addEventListener('input', () => {
      colorMain = colorMainInput.value;
      changeColorMain(colorMain, main);
    });

    sizeMain.addEventListener('change', (e) => {
      rowLength = changeSizeMain(e as SelectChangeEvent, rowLength);
    });
  }, []);

  function startGame() {
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));
    const settings = getTargetElement('settings', document.getElementsByTagName('div'));
    const speedInput = getTargetElement('speed-input', document.getElementsByTagName('input'));

    if (!squares || !settings || !speedInput) return;

    currentSnake = [3, 2, 1];
    direction = 1;
    intervalTime = changeSpeed(speedInput.value, SPEED_MAP);

    for (let i = 0; i < squares.length; i++) {
      squares[i].removeAttribute('style');
      if (squares[i].classList.contains('snake')) squares[i].classList.remove('snake');
      if (squares[i].classList.contains('apple')) squares[i].classList.remove('apple');
      if (squares[i].classList.contains('super-apple')) squares[i].classList.remove('super-apple');
    }

    settings.classList.add('disabled');

    makeRandomApple(squares, appleIndex);

    interval = setInterval(moveOutcome, intervalTime);

    document.addEventListener('keydown', (e) => {
      if (!['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) return;
      direction = changeDirection(e.code, rowLength, direction);
    });
  }

  function moveOutcome() {
    const settings = getTargetElement('settings', document.getElementsByTagName('div'));
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));

    if (isGameOver(squares, direction, rowLength, currentSnake) && interval) {
      clearInterval(interval);
      settings?.classList.remove('disabled');
    } else moveSnake(squares);
  }

  function moveSnake(squares: HTMLDivElement[]) {
    const tail = currentSnake.pop();
    if (!tail || !squares) return;

    squares[tail].removeAttribute('style');
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    squares[currentSnake[0]].classList.add('snake');
    changeColorSnake(colorSnake);

    eatApple(squares, tail);
  }

  function eatApple(squares: HTMLDivElement[], tail: number) {
    if (interval) {
      if (
        squares[currentSnake[0]].classList.contains('super-apple') ||
        squares[currentSnake[0]].classList.contains('apple')
      ) {
        let loopN = 1;
        if (squares[currentSnake[0]].classList.contains('apple')) {
          squares[currentSnake[0]].classList.remove('apple');
          makeRandomApple(squares, appleIndex);
        } else {
          squares[currentSnake[0]].classList.remove('super-apple');
          loopN = 5;
        }

        squares[currentSnake[0]].classList.remove('super-apple');
        squares[tail].classList.add('snake');

        changeColorSnake(colorSnake);
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
  }

  return (
    <div className="container">
      <div className="overlay-start">
        <div className="header">
          <p>Snake game</p>
        </div>
        <div className="img-block">
          <img src="https://www.google.com/logos/fnbx/snake_arcade/cta_alt.png"></img>
        </div>
        <div className="show-tutorial-button">Start</div>
      </div>

      <div className="tutorial-overlay hidden">
        <div className="show-tutorial">
          <div className="tutorial-header">Tutorial</div>
          <p>
            In the Snake game, the player uses the keys to move the "snake" around the board. When a snake finds an
            apple, it eats it and thus becomes bigger. The game ends when the snake either moves to the boundary or
            moves into itself. The goal is to make the snake as big as possible before that happens.
          </p>
          <div className="tutorial-body">
            <div className="column">
              <img src="content/computer_key_W.png"></img>
              <p className="tutorial-p">Top</p>
            </div>
            <div className="column">
              <img src="content/computer_key_A.png"></img>
              <p className="tutorial-p">Left</p>
            </div>
            <div className="column">
              <img src="content/computer_key_S.png"></img>
              <p className="tutorial-p">Bottom</p>
            </div>
            <div className="column">
              <img src="content/computer_key_D.png"></img>
              <p className="tutorial-p">Right</p>
            </div>
          </div>
          <div className="start-button">Ok</div>
        </div>
      </div>

      <div className="settings hidden">
        <div>
          <h2>Settings</h2>
          <div className="speed settings-field">
            <p>Speed</p>
            <input type="range" min={1} max={10} defaultValue={4} className="speed-input"></input>
            <p className="speed-p">4</p>
          </div>
          <div className="color-snake settings-field">
            <p>Color snake</p>
            <input type="color" defaultValue={'#6b0f0f'} className="color-snake-input"></input>
          </div>
          <div className="color-main settings-field">
            <p>Color main</p>
            <input type="color" defaultValue={'#151515'} className="color-main-input"></input>
          </div>

          <div className="size-main settings-field">
            <p>Map size</p>
            <select className="select-size">
              <option value={'40'}>40x40</option>
              <option value={'30'}>30x30</option>
              <option value={'20'}>20x20</option>
            </select>
          </div>
        </div>
        <div className="start-try-again">Start game</div>
      </div>

      <div className="main hidden"></div>

      <div className="score-div hidden">
        Score: <p className="score">0</p>
      </div>
    </div>
  );
}
export default App;
