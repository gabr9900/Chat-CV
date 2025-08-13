import Chatbot from './chatbot.js';
import './OptionsPanel.css'

export function OptionsPanel({ setChatMessages }) {
    const options = [
        "Who are you?",
        "What skills do you have?",
        "Work experience",
        "Projects",
        "Certifications",
        "Languages",
        "How can I contact you?",
    ];

    const handleClick = (option) => {
        // add user message
        const userMessage = { id: Date.now() + "-user", text: option, sender: "user" };
        setChatMessages(prev => [...prev, userMessage]);

        // get bot reply
        setTimeout(() => {
            let botReply = Chatbot.getResponse(option);
            if (!botReply) botReply = "Sorry, I don't understand. Try asking something else!";
            const botMessage = { id: Date.now() + "-bot", text: botReply, sender: "bot" };
            setChatMessages(current => [...current, botMessage]);
        }, 700);
    };

    return (
        <aside className="options-section" role="complementary" aria-label="Suggested questions">
            {options.map((opt) => (
                <button
                    key={opt}
                    className="option-button"
                    onClick={() => handleClick(opt)}
                >
                    {opt}
                </button>
            ))}
        </aside>
    );
}