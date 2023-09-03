import './App.scss';
import { useEffect } from 'react';
import { showTutorial } from './ShowTutorial';
import { getTargetElement } from './GetTargetElement';
import { getTargetElements } from './GetTargetElements';
import { createApple } from './CreateApple';
import { createSnakePart } from './CreateSnakePart';
import { showOrHideSettings } from './ShowOrHideSettings';

function App() {
  const velocity = 2; 
  let score = 0;
  let currentInterval: NodeJS.Timeout | null = null;
  let lastDirection = '';

  useEffect(() => {
      const isGameOver = sessionStorage.getItem('game-over');

      const overlayStart = getTargetElement('overlay-start', document.getElementsByTagName('div'));
      const tutorialOverlay = getTargetElement('tutorial-overlay', document.getElementsByTagName('div'));
      const main = getTargetElement('main', document.getElementsByTagName('div'));
      const apples = getTargetElements('apple', document.getElementsByTagName('div'));

      for(let i = 0; i < apples.length; i++) {
        main?.removeChild(apples[i]);
      }

      const showTutorialButton = document.getElementsByClassName('show-tutorial-button')[0];

      if(isGameOver && overlayStart && tutorialOverlay && main) {
        showTutorial(overlayStart, tutorialOverlay, main)
        startGame();
      }

      if (showTutorialButton && overlayStart && tutorialOverlay && main) 
      showTutorialButton.addEventListener('click',() => showTutorial(overlayStart, tutorialOverlay, main));

      const startButton = document.getElementsByClassName('start-button')[0];
      if(startButton) startButton.addEventListener('click', startGame);

      const settingsButton = document.getElementsByClassName('settings-button')[0];
      if(settingsButton) settingsButton.addEventListener('click',() => showOrHideSettings(false))

      const closeSettings = document.getElementsByClassName('close-settings')[0];
      if(closeSettings) closeSettings.addEventListener('click',() => showOrHideSettings(true));
    }, []);

    function startGame() {
      const tutorialOverlay = document.getElementsByClassName('tutorial-overlay')[0];
      tutorialOverlay.classList.add('hidden');
    
      document.addEventListener('keydown', connectButtons);

      createApple();
    }

    function connectButtons(e: KeyboardEvent) {
      if(e.code === 'KeyW') {
        lastDirection = 'top';
        moveSnake(lastDirection);
      }

      else if(e.code === 'KeyS') {
        lastDirection = 'bottom';
        moveSnake(lastDirection);
      }

      else if(e.code === 'KeyA') {
        lastDirection = 'left';
        moveSnake(lastDirection);
      }
      
      else if(e.code === 'KeyD')  {
        lastDirection = 'right';
        moveSnake(lastDirection);
      }
    }

    function moveSnake(direction: string) {
      if (currentInterval) clearInterval(currentInterval);
  
      const snakeParts = getTargetElements('snake-part', document.getElementsByTagName('div'))

      currentInterval = setInterval(() => {
        snakeParts.forEach((snakePart) => {
          if (direction === 'top') moveSnakeTop(snakePart);
          else if (direction === 'bottom') moveSnakeBottom(snakePart);
          else if (direction === 'left') moveSnakeLeft(snakePart);
          else if (direction === 'right') moveSnakeRight(snakePart);
        });
      }, 10);
    }
  
    function moveSnakeTop(snakePart: HTMLDivElement) {
      const currentPosition = parseFloat(snakePart.style.top) || 0;
      snakePart.style.top = `${currentPosition - velocity}px`;
      checkCollision();
    }
  
    function moveSnakeBottom(snakePart: HTMLDivElement) {
      const currentPosition = parseFloat(snakePart.style.top) || 0;
      snakePart.style.top = `${currentPosition + velocity}px`;
      checkCollision();
    }
  
    function moveSnakeLeft(snakePart: HTMLDivElement) {
      const currentPosition = parseFloat(snakePart.style.left) || 0;
      snakePart.style.left = `${currentPosition - velocity}px`;
      checkCollision();
    }
  
    function moveSnakeRight(snakePart: HTMLDivElement) {
      const currentPosition = parseFloat(snakePart.style.left) || 0;
      snakePart.style.left = `${currentPosition + velocity}px`;
      checkCollision();
    }

    function checkCollision() {
      const main = getTargetElement('main', document.getElementsByTagName('div'));
      const head = getTargetElement('head', document.getElementsByTagName('div'));
      const apple = getTargetElement('apple', document.getElementsByTagName('div'));
    
      if (main && head && apple) {
        const headCoords = head.getBoundingClientRect();
        const mainCoords = main.getBoundingClientRect();
        const appleCoords = apple.getBoundingClientRect();
    
        if (
          headCoords.top < appleCoords.bottom &&
          headCoords.bottom > appleCoords.top &&
          headCoords.left < appleCoords.right &&
          headCoords.right > appleCoords.left
        )
          eatApple();
    
        if (
          headCoords.top < mainCoords.top ||
          headCoords.left < mainCoords.left ||
          headCoords.bottom > mainCoords.bottom ||
          headCoords.right > mainCoords.right
        )
          gameOver();
      }
    }

    function gameOver() {
      if(currentInterval) clearInterval(currentInterval);
      document.removeEventListener('keydown', connectButtons);

      const scoreText = getTargetElement('score-p', document.getElementsByTagName('p'));
      if(scoreText) scoreText.innerText = score.toString();
      const gameOverDiv = getTargetElement('game-over', document.getElementsByTagName('div'));
      gameOverDiv?.classList.remove('hidden');

      const tryAgainButton = getTargetElement('try-again', document.getElementsByTagName('div'));
      if(tryAgainButton) tryAgainButton.addEventListener('click',() => {
        sessionStorage.setItem('game-over', JSON.stringify('true'));
        location.reload();
      });
    }

    function eatApple() {
      score++; 

      const apple = getTargetElement('apple', document.getElementsByTagName('div'));
      const main = getTargetElement('main', document.getElementsByTagName('div'));

      const snakeBody = getTargetElement('body', document.getElementsByTagName('div'));
      const tail = getTargetElement('tail', document.getElementsByTagName('div'));

      if(apple && main && snakeBody && tail) {
        main.removeChild(apple);
        createApple();

        const snakePart = createSnakePart();
        if(lastDirection === 'left')  {
          snakePart.style.left = `${parseFloat(tail.style.left)-2}px`;
          snakePart.style.top = tail.style.top;
        }
        else if (lastDirection === 'right') {
          snakePart.style.left = `${parseFloat(tail.style.left)+2}px`;
          snakePart.style.top = tail.style.top;
        }

        if(lastDirection === 'top') {
          snakePart.style.top = `${parseFloat(tail.style.top)-2}px`;
          snakePart.style.left = tail.style.left;
        }
        else if(lastDirection === 'bottom') {
          snakePart.style.top = `${parseFloat(tail.style.top)+2}px`;
          snakePart.style.left = tail.style.left;
        }

        snakeBody.insertBefore(snakePart, tail);
        moveSnake(lastDirection);
      } 
    }

  return (
    <div className='container'>

      <div className='overlay-start'>
        <div className='header'><p>Snake game</p></div>
        <div className='img-block'><img src='https://www.google.com/logos/fnbx/snake_arcade/cta_alt.png'></img></div>
        <div className='show-tutorial-button'>Start</div>
      </div>

      <div className='tutorial-overlay hidden'>
        <div className='show-tutorial'>
              <div className='tutorial-header'>Tutorial</div>
              <p>In the Snake game, the player uses the keys to move the "snake" around the board. 
                When a snake finds an apple, it eats it and thus becomes bigger. 
                The game ends when the snake either moves to the boundary or moves into itself. 
                The goal is to make the snake as big as possible before that happens.</p>
                <div className='tutorial-body'>
                  <div className='column'><img src='content/computer_key_W.png'></img><p className='tutorial-p'>Top</p></div>
                  <div className='column'><img src='content/computer_key_A.png'></img><p className='tutorial-p'>Left</p></div>
                  <div className='column'><img src='content/computer_key_S.png'></img><p className='tutorial-p'>Bottom</p></div>
                  <div className='column'><img src='content/computer_key_D.png'></img><p className='tutorial-p'>Right</p></div>
              </div>
              <div className='start-button'>Ok</div>
              <div className='settings-button'>Settings</div>
        </div>
        <div className='settings hidden'>
          <p>Settings:</p>
          <div className='settings-options'>
              <div className='change-velocity'><p>Velocity</p><input type='number' value={2}></input></div>
          </div>
          <div className='close-settings'>Close</div>
        </div>
      </div>
      
      <div className='main hidden'>
            <div className='snake'>
              <div className='head snake-part'><img src='/content/head_up.png'></img></div>
              <div className='body'>
                <div className='snake-part'><img src='/content/body_vertical.png'></img></div>
                <div className='tail snake-part'><img src='/content/tail_down.png'></img></div>
              </div>
            </div>
      </div>

      <div className='game-over hidden'>
        <p>Game over!!!</p>
        <div className='score'>Score:<p className='score-p'></p></div>
        <div className='try-again'>Try again</div>
      </div>

    </div>
  );
}
export default App;