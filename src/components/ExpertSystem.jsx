import { useState } from 'react'
import { genres, attributes, moods, rules, movieGoals } from '../utils/knowledgeBase'
import { forwardChaining } from '../utils/forwardChaining'
import { backwardChaining } from '../utils/backwardChaining'

function ExpertSystem() {
  const [selectedPreferences, setSelectedPreferences] = useState([])
  const [inferenceMethod, setInferenceMethod] = useState('forward')
  const [results, setResults] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState('')
  
  // Handle checkbox changes
  const handleCheckboxChange = (id) => {
    if (selectedPreferences.includes(id)) {
      setSelectedPreferences(selectedPreferences.filter(item => item !== id))
    } else {
      setSelectedPreferences([...selectedPreferences, id])
    }
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (inferenceMethod === 'forward') {
      // Run forward chaining with selected preferences
      const result = forwardChaining(selectedPreferences, rules)
      setResults({
        type: 'forward',
        data: result
      })
    } else {
      // For backward chaining, we need a specific movie goal
      if (!selectedMovie) {
        alert('Please select a movie for backward chaining')
        return
      }
      
      const result = backwardChaining(selectedMovie, selectedPreferences, rules)
      setResults({
        type: 'backward',
        data: result
      })
    }
  }
  
  // Get movie name from rule conclusion
  const getMovieNameFromConclusion = (conclusion) => {
    const rule = rules.find(r => r.conclusion === conclusion)
    return rule ? rule.message.split(' - ')[0] : conclusion
  }
  
  return (
    <div className="expert-system">
      <h2>Movie Recommendation System</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Inference Method Selection */}
        <div className="form-group">
          <h3>Select Inference Method</h3>
          <div>
            <label>
              <input
                type="radio"
                name="inferenceMethod"
                value="forward"
                checked={inferenceMethod === 'forward'}
                onChange={() => setInferenceMethod('forward')}
              />
              Forward Chaining (Preferences → Movies)
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="inferenceMethod"
                value="backward"
                checked={inferenceMethod === 'backward'}
                onChange={() => setInferenceMethod('backward')}
              />
              Backward Chaining (Movies → Required Preferences)
            </label>
          </div>
        </div>
        
        {/* Movie Selection (only for backward chaining) */}
        {inferenceMethod === 'backward' && (
          <div className="form-group">
            <h3>Select a Movie to Test</h3>
            <select 
              value={selectedMovie} 
              onChange={(e) => setSelectedMovie(e.target.value)}
              required
            >
              <option value="">-- Select a movie --</option>
              {movieGoals.map(goal => (
                <option key={goal} value={goal}>
                  {getMovieNameFromConclusion(goal)}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Genres Section */}
        <div className="form-group">
          <h3>Select Your Preferred Genres</h3>
          <div className="checkbox-group">
            {genres.map(genre => (
              <div key={genre.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={genre.id}
                  checked={selectedPreferences.includes(genre.id)}
                  onChange={() => handleCheckboxChange(genre.id)}
                />
                <label htmlFor={genre.id}>{genre.label}</label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Attributes Section */}
        <div className="form-group">
          <h3>Select Movie Attributes</h3>
          <div className="checkbox-group">
            {attributes.map(attribute => (
              <div key={attribute.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={attribute.id}
                  checked={selectedPreferences.includes(attribute.id)}
                  onChange={() => handleCheckboxChange(attribute.id)}
                />
                <label htmlFor={attribute.id}>{attribute.label}</label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mood Section */}
        <div className="form-group">
          <h3>What's Your Current Mood?</h3>
          <div className="checkbox-group">
            {moods.map(mood => (
              <div key={mood.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={mood.id}
                  checked={selectedPreferences.includes(mood.id)}
                  onChange={() => handleCheckboxChange(mood.id)}
                />
                <label htmlFor={mood.id}>{mood.label}</label>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit">Get Recommendations</button>
      </form>
      
      {/* Results Section */}
      {results && (
        <div className="result-box">
          <h3>Your Movie Recommendations</h3>
          
          {results.type === 'forward' && (
            <>
              {results.data.conclusions.length > 0 ? (
                <div>
                  <h4>Based on your preferences, we recommend:</h4>
                  <ul>
                    {results.data.conclusions.map((item, index) => (
                      <li key={index}>{item.message}</li>
                    ))}
                  </ul>
                  
                  <h4>Reasoning Process:</h4>
                  <p>The system applied these rules:</p>
                  <ul>
                    {results.data.explanations.map((exp, index) => (
                      <li key={index}>
                        Rule #{exp.appliedRule}: When {exp.conditions.join(' and ')} are selected, 
                        we recommend "{exp.message.split(' - ')[0]}"
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No recommendations found for your selected preferences. Try selecting different options.</p>
              )}
            </>
          )}
          
          {results.type === 'backward' && (
            <>
              <h4>
                Is "{getMovieNameFromConclusion(selectedMovie)}" a good match for you? 
                {results.data.isAchievable ? ' Yes!' : ' Not quite.'}
              </h4>
              
              {results.data.isAchievable ? (
                <div>
                  <p>This movie matches your preferences because:</p>
                  <ul>
                    {results.data.explanations
                      .filter(exp => exp.goal === selectedMovie)
                      .map((exp, index) => (
                        <li key={index}>
                          It requires {exp.satisfiedBy.join(' and ')}, which match your preferences.
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <p>To enjoy this movie, you might want to consider these additional preferences:</p>
                  <ul>
                    {results.data.explanations
                      .filter(exp => exp.missing && exp.missing.length > 0)
                      .map((exp, index) => (
                        <li key={index}>
                          Add {exp.missing.join(' and ')} to your preferences.
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ExpertSystem
