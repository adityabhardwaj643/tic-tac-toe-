import React, { useState } from 'react'
import Square from "./Square"

function Board() {


const[state,setState]=useState(Array(9).fill(null))

const[isXTurn,setIsXTurn]=useState(true)

const checkWinner = () => {
  const winnerLogic = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let logic of winnerLogic) {
    const [a, b, c] = logic;
    if (
      state[a] !== null &&
      state[a] === state[b] &&
      state[a] === state[c]
    ) {
      return state[a];
    }
  }

  // Checking for tie condition
  if (!state.includes(null)) {
    return "TIE";
  }

  return false;
};


const isWinner = checkWinner() //calling the checkWinner function and storing the retun value in isWinner variable


const handleClick =(index)=>{
    if(state[index] !==null){
        return;
    }
    const copyState=[...state] //making copy of existing state using ... operator //spread operator
    copyState[index] = isXTurn?"X":"O";
    setState(copyState)
    setIsXTurn(!isXTurn)
}

const newGame=()=>{
    setState(Array(9).fill(null))
}

//the onClick in component is the props wala onClick that we made in Square.js component
return (
  <div className='board-container'>
    {isWinner ? (
      <>
        {isWinner === "TIE" ? (
          <>
            <h4>Tie!</h4>
            <button onClick={newGame}>Play Again</button>
          </>
        ) : (
          <>
            <h4>{isWinner} won the game!</h4>
            <button onClick={newGame}>Play Again</button>
          </>
        )}
      </>
    ) : (
      <>
        <h4>Player {isXTurn ? 'X' : 'O'}</h4>
        <div className='board-row'>
          <Square onClick={() => handleClick(0)} value={state[0]}></Square>
          <Square onClick={() => handleClick(1)} value={state[1]}></Square>
          <Square onClick={() => handleClick(2)} value={state[2]}></Square>
        </div>
        <div className='board-row'>
          <Square onClick={() => handleClick(3)} value={state[3]}></Square>
          <Square onClick={() => handleClick(4)} value={state[4]}></Square>
          <Square onClick={() => handleClick(5)} value={state[5]}></Square>
        </div>
        <div className='board-row'>
          <Square onClick={() => handleClick(6)} value={state[6]}></Square>
          <Square onClick={() => handleClick(7)} value={state[7]}></Square>
          <Square onClick={() => handleClick(8)} value={state[8]}></Square>
        </div>
      </>
    )}
  </div>
);

}
export default Board;