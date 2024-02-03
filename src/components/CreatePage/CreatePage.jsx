import './index.css';
import { useState } from 'react';
import icon_image from '../../assets/icon.png'
import icon_image_reverse from '../../assets/icon_reverse.png'
import SwitchButton from '../SwitchButton/SwitchButton';
import { useNavigate } from "react-router-dom";


const CreatePage = ({ createRoom }) => {
    const [userName, setUserName] = new useState("player1");
    const [roomCode, setRoomCode] = new useState("0000");
    const [isWhite, setIsWhite] = new useState(true);

    const navigate = useNavigate();

    const changeSide = state => {
        setIsWhite(state);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createRoom(userName, roomCode, isWhite);
    }

    const navigateToJoin = () => {
        navigate("/join-page");
    }

    return (
        <form className="create_page_form" onSubmit={handleSubmit}>
            <label>
                <a>Enter a nickname</a>
                <input className="name" placeholder="Player 1"
                    onChange={(e) => { setUserName(e.target.value); }} />
            </label>
            <label>
                <a>Create a room code</a>
                <input className="room_code" placeholder="0000"
                    onChange={(e) => { setRoomCode(e.target.value); }} />
            </label>

            <SwitchButton
                toggled={true}
                onClick={changeSide}
            />

            <div className="change_form_container">
                <button type="submit">Create room</button>
                <a className="navigate_button" href='#' onClick={(navigateToJoin)}>or join game</a>
            </div>

        </form>
    )
}
export default CreatePage;