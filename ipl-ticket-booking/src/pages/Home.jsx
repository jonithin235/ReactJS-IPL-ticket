import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="home-hero-content">
                    <p className="home-tag">THE IPL EXPERIENCE</p>

                    <h1>Feel the roar.<br />Live the game.</h1>

                    <p>
                        Book your seats and get ready for unforgettable
                        cricket moments.
                    </p>

                    <Link to="/matches" className="home-link">
                        Explore Matches
                    </Link>
                </div>

                <img
                    src="/ipl-stadium.jpg"
                    alt="Cricket stadium during a match"
                    className="home-hero-image"
                />
            </section>

            <section className="home-featured">
                <div>
                    <p className="home-tag">YOUR NEXT MATCH</p>
                    <h2>Every match has a story.</h2>
                    <p>
                        Find your favourite teams, choose your match,
                        and book your tickets in a few simple steps.
                    </p>
                </div>

                <div className="home-featured-card">
                    <span>🏏</span>
                    <h3>Ready for match day?</h3>
                    <p>Check the schedule and find your next game.</p>
                    <Link to="/matches" className="home-text-link">
                        View all matches →
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;