// special function that helps react remember things
import { useState } from "react";

// Creates an individual square
function Square({value, onSquareClick}){
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

// export makes function avaliablee outside this file
// default tells other files that this is the main function in the file
function Board({xIsNext, squares, onPlay}) {


  function handleClick(i){
    
    if (calculateWinner(squares)||squares[i]){
      return;
    }

    // the slice is used to ensure we don't mutate the squares array, 
    // and instead  create a new array
    // Immutability is good because it avoids unnecessary re-renders
    const nextSquares = squares.slice();

    if (xIsNext){
      nextSquares[i]='X';
      }
    else{
      nextSquares[i]='O';
      }
      onPlay(nextSquares);
    }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    } 
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
    }

  // the onsquareclick uses a blank function to call handle click
  // this is done to stop an infinite loop
  // makes the actual board, prints the nine squares, each listening for click
  return( 
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

function calculateWinner(squares){
  // all combinations of lines that make a winner
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i=0; i< lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

export default function Game(){

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove%2==0;
  const currentSquares = history[currentMove];

  // first function in Game
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares,move)=>{
    let description;
    if (move>0){
      description = "Go to move #" + move;
    } else{
      description = "Go to game start";
    }

    // return of map func
    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  //return of Game
  return(

    <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>

    </div>
  );
}