import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import ExpertSystem from './components/ExpertSystem'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expert-system" element={<ExpertSystem />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
