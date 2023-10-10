import InsertEvent from './InsertEvent';
import InsertParticpant from './InsertParticipant';

export default function Home() {
    return (
        <div>
            <h1 style={{marginTop: '4%'}}>Rocking Bussin Layered Architecture :)</h1>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '3rem'}}>
                {/* Forms directly in the home page for now... maybe tabs or open on button click ? */}
                <InsertEvent />
                <InsertParticpant/>
            </div>
        </div>
    );
}

