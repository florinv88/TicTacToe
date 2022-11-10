import { useContext, useState, useEffect } from 'react'



//CONTEXT AND COMPONENTS
import { GameContext } from './contexts/gamesContext';
import Box from './components/Box';


//IMAGES
import x from './img/x.png'
import xMare from './img/xMare.png'
import xBG from './img/xBG.png'
import xGray from './img/xGray.png'
import o from './img/o.png'
import oBG from './img/oBG.png'
import oGray from './img/oGray.png'
import reset from './img/reset.png'



const App = () => {

  const {
    playerPick,
    setPlayerPick,
    startGame,
    matrix,
    start,
    winnerGame
  } = useContext(GameContext)

  const [restart, setRestart] = useState(false)


  return (
    <div className="page">
      {startGame === false && <div className="menuStart">
        <div className="icons">
          <img src={x} alt="x icon" />
          <img src={o} alt="o icon" />
        </div>
        <div className="player__pick">
          <h3>PICK YOUR MARK</h3>
          <div className="player__pick__buttons">
            <div onClick={() => setPlayerPick("X")} className={`${playerPick === "X" && "selected"}`}>
              <img src={playerPick === "X" ? xBG : xGray} alt="x icon" />
            </div>
            <div onClick={() => setPlayerPick("O")} className={`${playerPick === "O" && "selected"}`}>
              <img src={playerPick === "O" ? oBG : oGray} alt="o icon" />
            </div>
          </div>
          <h4>REMEMBER : X GOES FIRST</h4>
        </div>
        <div className="newGame" onClick={() => start()}>
          <h2>NEW GAME (vs CPU)</h2>
        </div>
      </div>}

      {startGame === true &&

        <div className="game">
          <div className="header">
            <img src={x} alt="x" />
            <img src={o} alt="o" />
            <img src={reset} alt="reset" onClick={() => setRestart(true)} />
          </div>
          <div className="boxes">
            <div className="boxes__line">
              {[1, 2, 3].map(item => {
                return <Box
                  key={item}
                  idx={item}
                  xIcon={xMare}
                  oIcon={o}



                />
              })}
            </div>
            <div className="boxes__line">
              {[4, 5, 6].map(item => {
                return <Box
                  key={item}
                  idx={item}
                  xIcon={xMare}
                  oIcon={o}



                />
              })}
            </div>
            <div className="boxes__line">
              {[7, 8, 9].map(item => {
                return <Box
                  key={item}
                  idx={item}
                  xIcon={xMare}
                  oIcon={o}



                />
              })}
            </div>

            <div className="score">
              <div>
                <h2>X {playerPick === "X" ? "(YOU)" : "(CPU)"}</h2>
                <p>0</p>
              </div>
              <div>
                <h2>TIE</h2>
                <p>0</p>
              </div>
              <div>
                <h2>0 {playerPick === "O" ? "(YOU)" : "(CPU)"}</h2>
                <p>0</p>
              </div>
            </div>

          </div>
        </div>

      }

      {restart === true && <div className="restart">
        <div className="background"></div>
        <div className="content">
          <h2>RESTART GAME ?</h2>
          <section>
            <div onClick={() => setRestart(false)}>
              <h2>NO , CANCEL</h2>
            </div>
            <div>
              <h2>YES , RESTART</h2>
            </div>
          </section>
        </div>
      </div>}

      {winnerGame && <div>
        <h2>{`The winner is ${winnerGame}!`}</h2>
      </div>}



    </div>
  );
}

export default App;
