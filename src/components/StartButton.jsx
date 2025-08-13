import './StartButton.css';
import { useNavigate } from 'react-router-dom';

export function Startbutton() {
    const navigate = useNavigate();

    const avvia = () => {
        navigate('/chatcv');
    };

    return (
        <button className="start-button" onClick={avvia}>
            Start Chatting
        </button>
    );
}
