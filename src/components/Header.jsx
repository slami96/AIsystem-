import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation();
  
  return (
    <header>
      <div className="header-container">
        <div className="logo-section">
          <span className="logo-icon">🎬</span>
          <h1>MovieMind</h1>
        </div>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/expert-system" className={location.pathname === '/expert-system' ? 'active' : ''}>
            Get Recommendations
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
