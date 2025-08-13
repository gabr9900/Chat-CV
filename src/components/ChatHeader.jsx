import ProfileImage from '../assets/chatbot.png';
import './ChatHeader.css'
export function ChatHeader() {
    return (
        <header className="chat-header" role="banner">
            <img
                className="chat-header-photo"
                src={ProfileImage}
                alt="Photo of Gabriele Varchetta"
                width="5 px"
                height="5 px"
            />
            <h1 className="chat-header-title">Chat CV - Gabriele Varchetta</h1>
        </header>
    );
}