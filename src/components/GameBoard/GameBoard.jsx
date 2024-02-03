import { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'


import './index.css';
const GameBoard = ({ userRole, users, synchronizeGameHistory, updatePosition, chessPosition }) => {

  const [boardWidth, setBoardWidth] = useState(window.innerHeight);
  const [game, setGame] = useState(new Chess());
  const [userColor] = useState(userRole[0]);

  if (!chessPosition && game.Length != 0) {
    chessPosition = game.fen();
  }

/*    useEffect(()=>{
    if(!(users.some(user => user.userRole === 'white') && users.some(user => user.userRole === 'black'))){
      setAllowMove(false);
    }else{
      setAllowMove(true);
    }
  }, [users]) */


  useEffect(() => {
    if (chessPosition != "") {
      game.load(chessPosition);
    }
  }, [chessPosition]);

  useEffect(() => {
    const handleResize = () => {
      setBoardWidth(boardWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /*const handleSquareClick = (sourceSquare) => {
    const selectedPiece = game.get(sourceSquare);
    // Check if the square contains a piece of the desired type (e.g., 'b' for bishop)
    if (selectedPiece.color !== userColor) {
      console.log(selectedPiece);
     return;
    }
  };
  */

  const makeAMove = (move) => {
    const gameCopy = game;
    const result = gameCopy.move(move);
    setGame(gameCopy);
    //console.log(game.history({ verbose: true }));
    return result; // null if the move was illegal, the move object if the move was legal
  }

  const handleDragStart = ({piece}) => {
      if (piece[0].toLowerCase() === userColor) {
        return true;
      }
    return false;
  };

  const handlePieceDrop = (sourceSquare, targetSquare, promotion) => {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: promotion[1].toLowerCase(),
    });

    if (move === null) return false;

    updatePosition(game.fen());
    synchronizeGameHistory(game.history({ verbose: true }));

    game.load(chessPosition);

    if (game.in_checkmate) {
      console.log('Checkmate!');
    } else if (move && game.in_check) {
      console.log('Check!');
    }
    return true;
  }

  return (
    <Chessboard id="BasicBoard" position={chessPosition} boardWidth={boardWidth} isDraggablePiece={handleDragStart}
      onPieceDrop={handlePieceDrop} boardOrientation={userRole === "black" ? "black" : "white"} promotionDialogVariant='modal' />
  );
}
export default GameBoard;