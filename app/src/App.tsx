import './App.scss';
import { useEffect } from 'react';
import { showTutorial } from './core/showTutorial';
import { getTargetElement } from './utils/getTargetElement';
import { showOrHideSettings } from './showOrHideSettings';
import { getTargetElements } from './utils/getTargetElements';
import { getRandomInteger } from './utils/getRandomInteger';

const ROW_LENGTH = 40;
const ACCELERATION_FACTOR = 0.95;

function App(): JSX.Element {
  const currentSnake = [3, 2, 1];
  let direction = 1;
  let score = 0;
  let appleIndex = 0;
  let intervalTime = 300;
  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    const overlayStart = getTargetElement('overlay-start', document.getElementsByTagName('div'));
    const tutorialOverlay = getTargetElement('tutorial-overlay', document.getElementsByTagName('div'));
    const main = getTargetElement('main', document.getElementsByTagName('div'));

    const showTutorialButton = document.getElementsByClassName('show-tutorial-button')[0];
    const settingsButton = document.getElementsByClassName('settings-button')[0];
    const closeSettings = document.getElementsByClassName('close-settings')[0];
    const startButton = document.getElementsByClassName('start-button')[0];

    if (
      !showTutorialButton ||
      !overlayStart ||
      !tutorialOverlay ||
      !main ||
      !settingsButton ||
      !closeSettings ||
      !startButton
    )
      return;

    showTutorialButton.addEventListener('click', () => showTutorial(overlayStart, tutorialOverlay, main));

    settingsButton.addEventListener('click', () => showOrHideSettings(false));

    closeSettings.addEventListener('click', () => showOrHideSettings(true));

    startButton.addEventListener('click', startGame);

    for (let i = 0; i < 800; i++) {
      const div = document.createElement('div');
      div.classList.add('grid-div');
      main.appendChild(div);
    }
  }, []);

  function changeDirection(e: KeyboardEvent) {
    if (e.code === 'KeyW') direction = -ROW_LENGTH;
    else if (e.code === 'KeyS') direction = +ROW_LENGTH;
    else if (e.code === 'KeyA') direction = -1;
    else if (e.code === 'KeyD') direction = 1;
  }

  function startGame() {
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));
    if (!squares) return;

    makeRandomApple(squares);
    currentSnake.forEach((index) => {
      if (index >= 0 && index < squares.length) {
        squares[index].classList.add('snake');
      }
    });
    interval = setInterval(moveOutcome, intervalTime);

    const tutorialOverlay = document.getElementsByClassName('tutorial-overlay')[0];
    tutorialOverlay.classList.add('hidden');

    document.addEventListener('keydown', changeDirection);
  }

  function moveOutcome() {
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));
    if (isGameOver(squares) && interval) {
      gameOver();
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

  function isGameOver(squares: HTMLDivElement[]) {
    if (
      (currentSnake[0] + ROW_LENGTH >= ROW_LENGTH * ROW_LENGTH && direction === ROW_LENGTH) ||
      (currentSnake[0] % ROW_LENGTH === ROW_LENGTH - 1 && direction === 1) ||
      (currentSnake[0] % ROW_LENGTH === 0 && direction === -1) ||
      (currentSnake[0] - ROW_LENGTH <= 0 && direction === -ROW_LENGTH) ||
      squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
      return true;
    }
    return false;
  }

  function eatApple(squares: HTMLDivElement[], tail: number) {
    if (squares[currentSnake[0]].classList.contains('apple') && interval) {
      squares[currentSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');

      score++;
      currentSnake.push(tail);
      makeRandomApple(squares);

      clearInterval(interval);
      intervalTime = intervalTime * ACCELERATION_FACTOR;
      interval = setInterval(moveOutcome, intervalTime);
    }
  }

  function makeRandomApple(squares: HTMLDivElement[]) {
    appleIndex = getRandomInteger(0, squares.length - 1);

    squares[appleIndex].classList.add('apple');
  }

  function gameOver() {
    document.removeEventListener('keydown', changeDirection);

    const scoreText = getTargetElement('score-p', document.getElementsByTagName('p'));
    const tryAgainButton = getTargetElement('try-again', document.getElementsByTagName('div'));
    const gameOverDiv = getTargetElement('game-over', document.getElementsByTagName('div'));
    if (!scoreText || !tryAgainButton || !gameOverDiv) return;

    scoreText.innerText = score.toString();

    gameOverDiv.classList.remove('hidden');

    tryAgainButton.addEventListener('click', () => {
      sessionStorage.setItem('game-over', JSON.stringify('true'));
      location.reload();
    });
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
          <div className="settings-button">Settings</div>
        </div>
        <div className="settings hidden">
          <p>Settings:</p>
          <div className="settings-options">
            <div className="change-velocity">
              <p>Velocity</p>
              <input type="number" defaultValue={2}></input>
            </div>
          </div>
          <div className="close-settings">Close</div>
        </div>
      </div>

      <div className="main hidden"></div>

      <div className="game-over hidden">
        <p>Game over!!!</p>
        <div className="score">
          Score:<p className="score-p"></p>
        </div>
        <div className="try-again">Try again</div>
      </div>
    </div>
  );
}
export default App;
