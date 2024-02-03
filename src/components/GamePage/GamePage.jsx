import GameBoard from "../GameBoard/GameBoard";
import ShowMessages from "../ShowMessages/ShowMessages";
import SendMessage from "../SendMessage/SendMessage";
import Stats from "../Stats/Stats"
import UserList from "../UserList/UserList";
import { useState } from "react";

import './index.css';

export const GamePage = ({ userRole, sendMessage, closeConnection, messages, users ,
    synchronizeGameHistory, chessHistory,updatePosition, chessPosition}) => {
    return (
        <div className="game_page_container">
            <div className="leave_button_container">
                <a className="leave_button" href='#' onClick={closeConnection}>Close room</a>
            </div>
            <div className="show_messages_container">
                <ShowMessages messages={messages} />
            </div>
            <div className="send_message_container">
                <SendMessage sendMessage={sendMessage} />
            </div>
            <div className="game_board_container">
                <GameBoard userRole={userRole} sendMessage={sendMessage}
                    messages={messages} users={users}
                    synchronizeGameHistory={synchronizeGameHistory} updatePosition={updatePosition}
                    chessPosition={chessPosition}/>
            </div>
            <div className="stats_container">
                <Stats chessHistory={chessHistory}/>
            </div>
            <div className="user_list_container">
                <UserList users ={users}/>
            </div>
        </div>
    )
}
export default GamePage;