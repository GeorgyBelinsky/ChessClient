import { useState, useEffect, useRef } from "react";

import './index.css';
const ShowMessages = ({ messages }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behaviour: 'smooth'
            });
        }
    }, [messages]);

    return <div className="show_messages">
        {messages.map((m, index) => 
            <div key={index} className="user_message">
                <div className="from_user">{m.user + " " + m.currentDate}</div>
                <div className="message">{m.message}</div>
            </div>
        )}
    </div>
}
export default ShowMessages;