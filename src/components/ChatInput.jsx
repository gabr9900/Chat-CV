import { useState } from 'react'
import Chatbot from './Chatbot.js';
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        const userMessage = { id: Date.now() + "-user", text: input.trim(), sender: "user" };
        setChatMessages([...chatMessages, userMessage]);

        setTimeout(() => {
            let botReply = Chatbot.getResponse(input.trim());
            if (!botReply) botReply = "Sorry, I don't understand. Try asking something else!";
            const botMessage = { id: Date.now() + "-bot", text: botReply, sender: "bot" };
            setChatMessages(current => [...current, botMessage]);
        }, 700);

        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <form
            className="chat-input-form"
            onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
            }}
        >
            <textarea
                className="chat-input-textarea"
                aria-label="Type your message"
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className="chat-input-button"
                type="submit"
                aria-label="Send message"
            >
                Send
            </button>
        </form>
    );
}
