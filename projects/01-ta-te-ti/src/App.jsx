import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti';
import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js';
import { checkWinnerFrom, checkEndGame } from './utils/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';

function App() {

  const [board, setBoard] = useState(() =>{
    const savedBoard = window.localStorage.getItem('board');
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const savedTurn = window.localStorage.getItem('turn');
    return savedTurn ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null); // null no hay ganador y false empate

  const updateBoard = (index) => {
    // Si el cuadrado ya está ocupado, no hacemos nada
    if(board[index] || winner) return;

    // Si no, actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardar el tablero y el turno en el local storage
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    // Chequeamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)){
      setWinner(false);
    }
  };
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  };

  return (
    <main className='board'>
      <h1>Ta Te Tí</h1>
      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <button className='reset' onClick={resetGame}>Reset</button>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  )
}

export default App
