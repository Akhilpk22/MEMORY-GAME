import { useEffect, useMemo, useState } from "react";
import "./App.css";



const GameIcons = ["🎉", "🌹", "🤳", "🎁", "🐱"];

function App() {
  const [Pieces, setPieces] = useState([]);

  

   const isGameCompleted = useMemo(()=>{
    if (Pieces.length > 0 && Pieces.every((piece) => piece.solved)) {
      return  true;
    }
    return false;
   },[Pieces])
  // console.log(GameIcons);

  const startgame = () => {
    const duplicateGameIcons = [...GameIcons, ...GameIcons];
    // console.log(duplicateGameIcons);

    const newGameIcons = [];

    while (newGameIcons.length < GameIcons.length * 2) {
      const randomIndex = Math.floor(Math.random() * duplicateGameIcons.length);

      newGameIcons.push({
        emoji: duplicateGameIcons[randomIndex],
        filped: false,
        solved: false,
        position: newGameIcons.length,
      });
      // delete the  duplicate icons
      duplicateGameIcons.splice(randomIndex, 1);
    }
       
    setPieces(newGameIcons);
  };

  useEffect(() => {
    startgame();
  }, []);

  const handleActive = (data) => {
    const filpedData = Pieces.filter((data) => data.filped && !data.solved);
    if (filpedData.length === 2) return;

    // filped code
    const newpieces = Pieces.map((piece) => {
      if (piece.position === data.position) {
        piece.filped = !piece.filped;
      }
      return piece;
    });
    setPieces(newpieces);
  };

  //  game logic or filped mathord
  const gameLogicForFilped = () => {
    const filpedData = Pieces.filter((data) => data.filped && !data.solved);

    if (filpedData.length === 2) {
      setTimeout(() => {
        if (filpedData[0].emoji === filpedData[1].emoji) {
          // success ini the section to find the ans
          setPieces(
            Pieces.map((piece) => {
              if (
                // to check the condition the  map method
                piece.position === filpedData[0].position ||
                piece.position === filpedData[1].position
              ) {
                piece.solved = true;
              }
              return piece;
            })
          );
          // fles caes in the section
        } else {
          setPieces(
            Pieces.map((piece) => {
              if (
                piece.position === filpedData[0].position ||
                piece.position === filpedData[1].position
              ) {
                piece.filped = false;
              }
              return piece;
            })
          );
        }
      }, 800);
    }
  };


  useEffect(() => {

    gameLogicForFilped();
    

  },[Pieces]);
  return (
    <>
      <div className="main  p-5 ">
        <h1 className="d-flex justify-content-center align-items-center pt-3">
          Memory Game
        </h1>
        <div className="main-content container mt-5  ">
          {Pieces.map((data, index) => (
            <div
              className={`flip-card ${
                data.filped || data.solved ? "active " : " "
              }`}
              key={index}
              onClick={() => handleActive(data)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front"></div>
                <div className="flip-card-back">{data.emoji}</div>
              </div>
            </div>
          ))}
        </div>
       
     {
      isGameCompleted &&(
      <div className="win">
          <h1>YOU WIN!!!</h1>
          
        </div>
     )}
    
      </div>
    </>
  )
}

export default App;
