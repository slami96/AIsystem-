import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <h2>Welcome to the Movie Recommendation System</h2>
      <p>
        This expert system uses artificial intelligence techniques to recommend movies 
        based on your preferences and mood.
      </p>
      
      <h3>How it Works</h3>
      <p>
        Our system uses two different reasoning methods to suggest movies:
      </p>
      
      <div className="info-section">
        <h4>Forward Chaining</h4>
        <p>
          With forward chaining, the system starts with the information you provide and 
          follows a set of rules to determine which movies match your preferences.
        </p>
        
        <h4>Backward Chaining</h4>
        <p>
          Backward chaining works differently - it starts with potential movie recommendations 
          and works backward to see if they match your preferences.
        </p>
      </div>
      
      <div className="cta">
        <h3>Ready to find your next favorite movie?</h3>
        <Link to="/expert-system">
          <button>Get Movie Recommendations</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
