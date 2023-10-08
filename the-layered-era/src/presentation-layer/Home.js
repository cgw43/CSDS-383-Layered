import InsertEvent from './InsertEvent';
import InsertParticpant from './InsertParticipant';

export default function Home() {
    return (
        <div>
            Rocking Bussin Layered Architecture :)

            {/* Forms directly in the home page for now... maybe tabs or open on button click ? */}
            <InsertEvent />
            <InsertParticpant/>
        </div>
    );
}

