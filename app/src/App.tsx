import './App.scss';

function App() {

  return (
    <div className='container'>
      <div className='overlay-start'>
        <div className='header'><p>Snake game</p></div>
        <div className='img-block'><img src='https://www.google.com/logos/fnbx/snake_arcade/cta_alt.png'></img></div>
        <div className='start-button'>Start</div>
      </div>

      <div className='main hidden'>

      </div>
    </div>
  );
}
export default App;