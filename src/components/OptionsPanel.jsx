import Chatbot from './Chatbot.jsx';
import './OptionsPanel.css'
import { FaUser, FaTools, FaBriefcase, FaFolderOpen, FaCertificate, FaGlobe, FaEnvelope } from "react-icons/fa";

export function OptionsPanel({ setChatMessages }) {
    const group1 = [
        { label: "Who are you?", icon: <FaUser /> },
    ];

    const group2 = [
        { label: "What skills do you have?", icon: <FaTools /> },
        { label: "Languages", icon: <FaGlobe /> },
        { label: "Certifications", icon: <FaCertificate /> },
    ];

    const group3 = [
        { label: "Work experience", icon: <FaBriefcase /> },
        { label: "Projects", icon: <FaFolderOpen /> },
    ];

    const group4 = [
        { label: "How can I contact you?", icon: <FaEnvelope /> },
    ];

    const handleClick = (option) => {
        const userMessage = { id: Date.now() + "-user", text: option, sender: "user" };
        setChatMessages(prev => [...prev, userMessage]);

        setTimeout(() => {
            let botReply = Chatbot.getResponse(option);
            if (!botReply) botReply = "Sorry, I don't understand. Try asking something else!";
            const botMessage = { id: Date.now() + "-bot", text: botReply, sender: "bot" };
            setChatMessages(current => [...current, botMessage]);
        }, 700);
    };

    const groups = [group1, group2, group3, group4];

    return (
        <aside className="options-section" role="complementary" aria-label="Suggested questions">
            {groups.map((group, i) => (
                <div key={i} className="group">
                    {group.map(({ label, icon }) => (
                        <button
                            key={label}
                            className="option-button"
                            onClick={() => handleClick(label)}
                        >
                            {icon}
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            ))}
        </aside>

    );
}
