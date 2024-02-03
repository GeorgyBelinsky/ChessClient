import './index.css';
import { useState } from 'react';

const SendMessage = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    return (
        <div className="send_message">
            <form className="send_message_form" onSubmit={handleSubmit}>
                <textarea className="message_text_space" placeholder="message..." onKeyDown={handleKeyDown}
                onChange={e => setMessage(e.target.value)} value={message} />
                <button className="message_send_button" variant="primary" type="submit" disabled={!message}>Send</button>
            </form>
        </div>
    );
}

export default SendMessage;