import { useState } from 'react'
import { ChatInput } from './ChatInput'
import { ChatHeader } from './ChatHeader'
import ChatMessages from './ChatMessages'
import { OptionsPanel } from './OptionsPanel'

export function ChatCv() {
    const [chatMessages, setChatMessages] = useState([]);

    return (
        <div className="app-container" role="main">
            <section className="chat-section" aria-label="Chat messages">
                <ChatHeader />
                <ChatMessages chatMessages={chatMessages} />
                <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
            </section>
            <OptionsPanel setChatMessages={setChatMessages} />
        </div>
    );
}