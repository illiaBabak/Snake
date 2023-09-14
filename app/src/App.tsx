import './App.scss';
import { useEffect } from 'react';
import { showTutorial } from './core/showTutorial';
import { getTargetElement } from './utils/getTargetElement';
import { getTargetElements } from './utils/getTargetElements';
import { changeDirection } from './core/changeDirection';
import { makeRandomApple } from './core/makeRandomApple';
import { isGameOver } from './core/isGameOver';

const ROW_LENGTH = 40;
const ACCELERATION_FACTOR = 0.95;

function App(): JSX.Element {
  const currentSnake = [3, 2, 1];
  const appleIndex = 0;
  let direction = 1;
  let score = 0;
  let intervalTime = 300;
  let interval: NodeJS.Timeout | null = null;
  let lastKey = 'KeyD';

  useEffect(() => {
    const overlayStart = getTargetElement('overlay-start', document.getElementsByTagName('div'));
    const tutorialOverlay = getTargetElement('tutorial-overlay', document.getElementsByTagName('div'));
    const main = getTargetElement('main', document.getElementsByTagName('div'));

    const showTutorialButton = document.getElementsByClassName('show-tutorial-button')[0];
    const startButton = document.getElementsByClassName('start-button')[0];

    if (!showTutorialButton || !overlayStart || !tutorialOverlay || !main || !startButton) return;

    showTutorialButton.addEventListener('click', () => showTutorial(overlayStart, tutorialOverlay, main));

    startButton.addEventListener('click', startGame);

    for (let i = 0; i < 800; i++) {
      const div = document.createElement('div');
      div.classList.add('grid-div');
      main.appendChild(div);
    }
  }, []);

  function startGame() {
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));

    if (!squares) return;

    const scoreDiv = getTargetElement('score-div', document.getElementsByTagName('div'));
    scoreDiv?.classList.remove('hidden');

    const settings = getTargetElement('settings', document.getElementsByTagName('div'));
    settings?.classList.remove('hidden');

    const container = getTargetElement('container', document.getElementsByTagName('div'));
    container?.classList.add('row');

    makeRandomApple(squares, appleIndex);
    currentSnake.forEach((index) => {
      if (index >= 0 && index < squares.length) {
        squares[index].classList.add('snake');
      }
    });
    interval = setInterval(moveOutcome, intervalTime);

    const tutorialOverlay = document.getElementsByClassName('tutorial-overlay')[0];
    tutorialOverlay.classList.add('hidden');

    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyW' || e.code === 'KeyS' || e.code === 'KeyA' || e.code === 'KeyD') {
        direction = changeDirection(e.code, ROW_LENGTH, direction);
        lastKey = e.code;
      }
    });
  }

  function moveOutcome() {
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));
    if (isGameOver(squares, direction, ROW_LENGTH, currentSnake, lastKey) && interval) {
      clearInterval(interval);
    } else moveSnake(squares);
  }

  function moveSnake(squares: HTMLDivElement[]) {
    const tail = currentSnake.pop();
    if (!tail || !squares) return;

    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    squares[currentSnake[0]].classList.add('snake');

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
        <h2>Settings</h2>
        <div className="speed"></div>
        <div className="color-snake"></div>
        <div className="color-main"></div>
        <div className="size-main">
          <select>
            <option value={'20'}>20x20</option>
            <option value={'30'}>30x30</option>
            <option value={'40'}>40x40</option>
            <option value={'50'}>50x50</option>
          </select>
        </div>
      </div>

      <div className="main hidden"></div>

      <div className="score-div hidden">
        Score: <p className="score">0</p>
      </div>
    </div>
  );
}
export default App;
