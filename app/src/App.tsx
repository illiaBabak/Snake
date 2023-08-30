import { useEffect } from 'react';
import './App.scss';

function App() {
    useEffect(() => {
      const showTutorialButton = document.getElementsByClassName('show-tutorial-button')[0];
      if (showTutorialButton) showTutorialButton.addEventListener('click', showTutorial);

      const startButton = document.getElementsByClassName('start-button')[0];
      if(startButton) startButton.addEventListener('click', startGame);
    }, []);

    function showTutorial() {
      const overlayStart = document.getElementsByClassName('overlay-start')[0];
      const tutorialOverlay = document.getElementsByClassName('tutorial-overlay')[0];
      const main = document.getElementsByClassName('main')[0];
      if(overlayStart && main && tutorialOverlay) {
        overlayStart.classList.add('hidden');
        tutorialOverlay.classList.remove('hidden');
        main.classList.remove('hidden');
      } 
    }

    function startGame() {
      const tutorialOverlay = document.getElementsByClassName('tutorial-overlay')[0];
      tutorialOverlay.classList.add('hidden');
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
        </div>
      </div>
      

      <div className='main hidden'>
            <div className='snake'>
              <div className='head'><img src='/content/head_up.png'></img></div>
              <div className='body'>
                <div><img src='/content/body_vertical.png'></img></div>
                <div className='tail'><img src='/content/tail_down.png'></img></div>
              </div>
            </div>
      </div>

    </div>
  );
}
export default App;