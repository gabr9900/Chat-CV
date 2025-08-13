import { useRef, useEffect } from 'react'
import './ChatMessages.css'

function ChatMessages({
    chatMessages }) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);


    return (
        <div className="chat-messages-container" aria-live="polite" aria-relevant="additions" ref={chatMessagesRef}>
            {chatMessages.map(({ id, text, sender }) => (
                <div key={id} className={"message " + (sender === "user" ? "user" : "bot")}>
                    {text}
                </div>
            ))}
        </div>
    );
}

export default ChatMessages;