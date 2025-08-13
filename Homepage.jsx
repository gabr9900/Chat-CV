import './Homepage.css';
import { motion } from 'framer-motion';
import { Startbutton } from './StartButton';
import { Welcome } from './Welcome';

function Homepage() {
    return (
        <div className="homepage">
            {/* Sfondo animato */}
            <div className="gradient-bg"></div>
            <div className="overlay"></div>

            {/* Contenuto animato */}
            <motion.div
                className="welcome-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <Welcome />
            </motion.div>

            {/* Bottone animato */}
            <motion.div
                className="start-btn-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            >
                <Startbutton />
            </motion.div>
        </div>
    );
}

export default Homepage;
