import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [errors, setErrors] = useState(0);
  const [cardList] = useState([
    "gordon_copy",
    "haaland_copy",
    "kaoru_copy",
    "odegaard_copy",
    "palmer_copy",
    "saka_copy",
    "saliba",
    "trafford_copy",
    "jude_copy",
    "messi_copy"
  ]);
  const [cardSet, setCardSet] = useState([]);
  const [board, setBoard] = useState([]);
  const rows = 4;
  const columns = 5;
  let card1Selected = null;
  let card2Selected = null;

  useEffect(() => {
    shuffleCards();
    startGame();
  }, []);

  function shuffleCards() {
    const shuffledCards = [...cardList, ...cardList].sort(() => Math.random() - 0.5);
    setCardSet(shuffledCards);
  }

  function startGame() {
    const newBoard = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < columns; c++) {
        const cardImg = cardSet.pop();
        row.push(cardImg);
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
    setTimeout(hideCards, 1000);
  }

  function selectCard(cardImg) {
    if (!card1Selected) {
      // First card selection
      card1Selected = cardImg;
    } else if (!card2Selected && cardImg !== card1Selected) {
      // Second card selection
      card2Selected = cardImg;
      update();
    }
  }

  function update() {
    if (card1Selected && card2Selected) {
      // Check if cards match
      if (card1Selected.src !== card2Selected.src) {
        // If cards don't match, flip them back after a short delay
        setTimeout(() => {
          setErrors(errors + 1);
          card1Selected = null;
          card2Selected = null;
        }, 1000);
      } else {
        // If cards match, keep them face up
        card1Selected = null;
        card2Selected = null;
      }
    }
  }

  function hideCards() {
    // Reset card selections
    card1Selected = null;
    card2Selected = null;

    // Reset all cards to face down after a short delay
    setTimeout(() => {
      // Implement logic to hide cards here
    }, 1000);
  }

  function restartGame() {
    setErrors(0);
    shuffleCards();
    startGame();
  }

  return (
    <div className="App">
      <div id="header">
        <h1>Soccer Cards Match</h1>
        <h2>Errors: <span id="errors">{errors}</span></h2>
      </div>
      <div id="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cardImg, columnIndex) => (
              <img
                key={columnIndex}
                src={`${cardImg}.jpg`}
                alt="card"
                className="card"
                onClick={() => selectCard(cardImg)}
              />
            ))}
          </div>
        ))}
      </div>
      <div id="footer">
        <button id="restartButton" onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  );
}

export default App;
