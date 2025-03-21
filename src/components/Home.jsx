import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h2>Welcome to the Movie Recommendation System</h2>
      <p>
        Discover your next favorite movie with our AI-powered recommendation engine.
        This expert system analyzes your preferences and mood to suggest movies you'll love.
      </p>
      
      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">🎯</span>
          <h3>Personalized Recommendations</h3>
          <p>Get movie suggestions tailored to your unique preferences and current mood.</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">🧠</span>
          <h3>Intelligent Analysis</h3>
          <p>Our system uses advanced AI techniques to understand what films you'll enjoy.</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Transparent Reasoning</h3>
          <p>See exactly why each movie was recommended for you.</p>
        </div>
      </div>
      
      <h3>How it Works</h3>
      <p>
        Our expert system uses two different reasoning methods to find the perfect movies for you:
      </p>
      
      <div className="info-section">
        <div className="info-card">
          <h4>Forward Chaining</h4>
          <p>
            With forward chaining, the system starts with your selected preferences and 
            applies a series of logical rules to determine which movies are the best match.
          </p>
          <p>
            <strong>Perfect for:</strong> Discovering new movies based on what you know you like.
          </p>
        </div>
        
        <div className="info-card">
          <h4>Backward Chaining</h4>
          <p>
            Backward chaining starts with potential movies and works backwards to see if your 
            preferences align with what makes that movie enjoyable.
          </p>
          <p>
            <strong>Perfect for:</strong> Checking if a specific movie matches your taste.
          </p>
        </div>
      </div>
      
      <div className="cta">
        <h3>Ready to find your next favorite movie?</h3>
        <p>Answer a few questions about your preferences and discover films you'll love.</p>
        <Link to="/expert-system">
          <button>Get Your Recommendations</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
