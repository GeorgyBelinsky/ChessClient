import './index.css';

const Stats = ({ chessHistory }) => {


    const filterMovesByPlayer = (moves, playerColor) => {
        //console.log(playerColor, moves.filter((move) => move.history[0].color === playerColor));
        return moves.filter((move) => move.history[0].color === playerColor);
    };

    return (
        <div className="stats" >
            <div className="user_moves">White:
                {filterMovesByPlayer(chessHistory, 'w').map((moves, index) =>
                    <div className="move" key={index} >{moves.history[0].from + "->" + moves.history[0].to + moves.history[0].piece}</div>
                )}
            </div>
            <div className="user_moves">Black:
                {filterMovesByPlayer(chessHistory, 'b').map((moves, index) =>
                    <div className="move" key={index} >{moves.history[0].from + "->" + moves.history[0].to + moves.history[0].piece}</div>
                )}
            </div>
        </div>
    )
}
export default Stats;