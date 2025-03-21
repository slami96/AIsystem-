import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <div className="container">
        <h1>Movie Recommendation Expert System</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/expert-system">Get Recommendations</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
