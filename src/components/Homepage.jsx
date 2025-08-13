import '../Index.css'

import { Startbutton } from './StartButton';
import { Welcome } from './Welcome';

function Homepage() {
    return (
        <div className="homepage">
            <Welcome />
            <Startbutton />
        </div>
    );
}

export default Homepage;
