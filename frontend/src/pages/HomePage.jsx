import { Link } from 'react-router-dom';
import './HomePage.css';

const HERO_IMG = 'https://picsum.photos/seed/cityfix-street/1600/900';

function HomePage() {
  return (
    <div className="home">
      <section className="hero" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="hero-overlay">
          <span className="hero-eyebrow">Your neighborhood, your report</span>
          <h1>Fix what's<br />broken. <em>Together.</em></h1>
          <p>Report potholes, broken lights, and local issues in seconds - then watch your city act on them.</p>
          <Link to="/report" className="hero-cta">Report an Issue -&gt;</Link>
        </div>
      </section>

      <section className="how">
        <h2>How it works</h2>
        <div className="how-grid">
          <div className="how-card">
            <span className="how-num">01</span>
            <h3>Spot it</h3>
            <p>See something broken nearby - a pothole, a leak, a dark street.</p>
          </div>
          <div className="how-card">
            <span className="how-num">02</span>
            <h3>Report it</h3>
            <p>File a report in under a minute. No account needed.</p>
          </div>
          <div className="how-card">
            <span className="how-num">03</span>
            <h3>Track it</h3>
            <p>Upvote issues that matter and watch their status move to Resolved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;