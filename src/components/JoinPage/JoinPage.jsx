import './index.css'
import { useNavigate } from "react-router-dom";
import {useState} from 'react';

const JoinPage = ({joinRoom}) => {
    const [userName, setUserName] = new useState("player2");
    const [roomCode, setRoomCode] = new useState("0000");

    const navigate = useNavigate();

    const navigateToCreate = () => {
        navigate("/create-page");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        joinRoom(userName, roomCode, "spectator");
    }

    return (
        <form className="join_page_form" onSubmit={handleSubmit}>
            <label>
                <a>Enter a name</a>
                <input className="name" placeholder="player 2" 
                onChange={(e) => { setUserName(e.target.value); }}/>
            </label>
            <label>
                <a>Enter a room code</a>
                <input className="room_code" placeholder="0000" 
                onChange={(e) => { setRoomCode(e.target.value); }}/>
            </label>
            <div className="change_form_container">
                <button type="submit">Join room</button>
                <a className="navigate_button" href='#' onClick={navigateToCreate}>or create game</a>
            </div>
        </form>
    );
}
export default JoinPage;