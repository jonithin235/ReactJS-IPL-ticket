 

function MatchCard(props) {
    return (
        <div>
            <h2>{props.team1} vs {props.team2}</h2>
            <p>Venue: {props.venue}</p>
            <p>Date: {props.date}</p>
        </div>
    );
}

export default MatchCard;