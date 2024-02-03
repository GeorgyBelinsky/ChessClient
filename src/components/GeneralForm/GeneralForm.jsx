import "./index.css"
import CreatePage from "../CreatePage/CreatePage";
import JoinPage from "../JoinPage/JoinPage";
import GamePage from "../GamePage/GamePage";

import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

const GeneralForm = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = new useState("");

    const [connection, setConnection] = new useState();

    const [messages, setMessages] = useState([]);

    const [chessHistory, setChessHistory] = useState([]);
    const [users, setUsers] = useState([]);

    const [chessPosition, setChessPosition] = useState();

    const createRoom = (userName, roomCode, isWhite) => {
        joinRoom(userName, roomCode, isWhite ? "white" : "black");
    };

    const joinRoom = async (userName, roomCode, userRole) => {
        try {
            const connection = new HubConnectionBuilder().
                withUrl("https://localhost:44370/game-page").
                configureLogging(LogLevel.Information).build();

            connection.on("UsersInRoom", (users) => {
                setUsers(users);
            });

            connection.on("RecieveMessage", (user, message) => {
                const currentDate = new Date().toLocaleTimeString();
                setMessages(messages => [...messages, { user, message, currentDate }]);
            });

            connection.on("GetGameHistory", (history) => {
                setChessHistory(chessHistory => [...chessHistory, {history}]);
            },);

            connection.on("OperationFailed", (title, body) => {
                alert(title + "\n" + body);
            });

            connection.on("GetSynchronyzedFigures",(chessPosition)=>{
                setChessPosition(chessPosition);
            });

           /*  connection.on("SynchronyzeWithLastUser",()=>{
                console.log(chessPosition), updatePosition(chessPosition)}); */

            connection.on("GetUserRole",(userRole)=>{
                setUserRole(userRole);
            });

            connection.onclose(e => {
                setConnection();
                setMessages([]);
                setUsers([]);
                setChessHistory([]);
                setChessPosition("");
            });

            await connection.start();
            //users.length===0 ? 

            await connection.invoke("JoinRoom", { userName, roomCode, userRole });
            setConnection(connection);
            navigate("/game-page");

        } catch (e) {
            alert(e);
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
            navigate("/create-page");
        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    const synchronizeGameHistory = async (history) => {
        try {
            await connection.invoke("SynchronizeGameHistory", history);
        } catch (e) {
            console.log(e);
        }
    }

    const updatePosition = async (position)=>{
        try{
            await connection.invoke("SynchronyzeFigures", position);
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div className="general_form">
            <Routes>
                <Route exact path="/" element={<Navigate to="/create-page" />} />
                <Route path="/create-page" element={<CreatePage createRoom={createRoom} />} />
                <Route path="/join-page" element={<JoinPage joinRoom={joinRoom} />} />
                <Route path="/game-page" element={
                    <GamePage userRole={userRole} sendMessage={sendMessage} closeConnection={closeConnection}
                        messages={messages} users={users}
                        synchronizeGameHistory={synchronizeGameHistory} chessHistory={chessHistory}
                        updatePosition={updatePosition} chessPosition={chessPosition}/>
                } />
            </Routes>
        </div>
    )
};

export default GeneralForm;