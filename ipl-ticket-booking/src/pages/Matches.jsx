
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Matches() {

    const navigate = useNavigate();

    const [team, setTeam] = useState("");
    const [filter, setFilter] = useState("");

    const matches = [
        {
            no: 1,
            teams: "Sunrisers Hyderabad vs Royal Challengers Bengaluru",
            code: "SRH-RCB",
            date: "19 March 2027, 7:30pm",
            venue: "Rajiv Gandhi International Stadium Hyderabad",
            city: "Hyderabad",
            price: "Rs.750 - Rs.25000"
        },
        {
            no: 2,
            teams: "Chennai Super Kings vs Mumbai Indians",
            code: "CSK-MI",
            date: "20 March 2027, 7:30pm",
            venue: "Wankhede Stadium Mumbai",
            city: "Mumbai",
            price: "Rs.900 - Rs.50000"
        },
        {
            no: 3,
            teams: "Rajasthan Royals vs Punjab Kings",
            code: "RR-PBKS",
            date: "21 March 2027, 3:30pm",
            venue: "HPCA Stadium Dharamshala",
            city: "Dharamshala",
            price: "Rs.700 - Rs.30000"
        },
        {
            no: 4,
            teams: "Kolkata Knight Riders vs Delhi Capitals",
            code: "KKR-DC",
            date: "21 March 2027, 7:30pm",
            venue: "Eden Gardens, Kolkata",
            city: "Kolkata",
            price: "Rs.1000 - Rs.25000"
        },
        {
            no: 5,
            teams: "Gujarat Titans vs Lucknow Super Giants",
            code: "GT-LSG",
            date: "22 March 2027, 7:30pm",
            venue: "Narendra Modi Stadium, Ahmedabad",
            city: "Ahmedabad",
            price: "Rs.1000 - Rs.25000"
        }
    ];

    const filteredMatches = matches.filter((match) => {
        return filter === "" || match.code.split("-").includes(filter);
    });

    function handleBook(match) {
        navigate(
            `/booking?teams=${encodeURIComponent(match.code)}&date=${encodeURIComponent(match.date)}&venue=${encodeURIComponent(match.city)}`
        );
    }

    return (
        <div className="page">

            <header className="matches-header">
                <h1>🏏 IPL Match Schedule</h1>
                <p>Find Your Match and Book Your Ticket🎟</p>
            </header>

            <section className="card">
                <h2>Ticket Booking Information</h2>
                <ul>
                    <li>Select your favourite team</li>
                    <li>Check the match date, time and venue</li>
                    <li>Compare the available ticket price</li>
                    <li>Click Book to select your match</li>
                </ul>
            </section>

            <section className="card">
                <h2>Find a Match</h2>

                <label>Filter by team: </label>

                <select
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                >
                    <option value="">All Teams</option>
                    <option value="CSK">Chennai Super Kings</option>
                    <option value="DC">Delhi Capitals</option>
                    <option value="GT">Gujarat Titans</option>
                    <option value="KKR">Kolkata Knight Riders</option>
                    <option value="LSG">Lucknow Super Giants</option>
                    <option value="MI">Mumbai Indians</option>
                    <option value="PBKS">Punjab Kings</option>
                    <option value="RR">Rajasthan Royals</option>
                    <option value="RCB">Royal Challengers Bengaluru</option>
                    <option value="SRH">Sunrisers Hyderabad</option>
                </select>

                <button onClick={() => setFilter(team)}>
                    Apply Filter
                </button>

                <button onClick={() => {
                    setTeam("");
                    setFilter("");
                }}>
                    Show All
                </button>

                <h3>Upcoming Sample Matches</h3>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Match No.</th>
                                <th>Teams</th>
                                <th>Date/Time</th>
                                <th>Venue</th>
                                <th>Prices (Rs.)</th>
                                <th>Booking</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredMatches.map((match) => (
                                <tr key={match.no}>
                                    <td>{match.no}</td>
                                    <td>{match.teams}</td>
                                    <td>{match.date}</td>
                                    <td>{match.venue}</td>
                                    <td>{match.price}</td>
                                    <td>
                                        <button onClick={() => handleBook(match)}>
                                            Book
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    );
}

export default Matches;
