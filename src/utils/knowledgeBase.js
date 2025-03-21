// Movie genres
export const genres = [
  { id: 'action', label: 'Action' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'comedy', label: 'Comedy' },
  { id: 'drama', label: 'Drama' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'horror', label: 'Horror' },
  { id: 'mystery', label: 'Mystery' },
  { id: 'romance', label: 'Romance' },
  { id: 'scifi', label: 'Sci-Fi' },
  { id: 'thriller', label: 'Thriller' }
];

// Movie attributes
export const attributes = [
  { id: 'newRelease', label: 'Recently Released' },
  { id: 'classic', label: 'Classic Movies' },
  { id: 'awardWinning', label: 'Award Winning' },
  { id: 'familyFriendly', label: 'Family Friendly' },
  { id: 'indie', label: 'Independent Films' },
  { id: 'foreign', label: 'Foreign Films' },
  { id: 'documentary', label: 'Documentaries' }
];

// Mood options
export const moods = [
  { id: 'happy', label: 'Happy/Uplifting' },
  { id: 'tense', label: 'Tense/Exciting' },
  { id: 'sad', label: 'Sad/Emotional' },
  { id: 'thoughtful', label: 'Thoughtful/Reflective' },
  { id: 'scared', label: 'Scared/Thrilled' },
  { id: 'relaxed', label: 'Relaxed/Casual' }
];

// Rules for movie recommendations
export const rules = [
  // Genre-based rules
  {
    id: 1,
    conditions: ['action', 'tense'],
    conclusion: 'recommendDieHard',
    message: 'Die Hard - The quintessential action film with tension and excitement.'
  },
  {
    id: 2,
    conditions: ['action', 'scifi'],
    conclusion: 'recommendMatrix',
    message: 'The Matrix - A perfect blend of action and sci-fi with groundbreaking special effects.'
  },
  {
    id: 3,
    conditions: ['comedy', 'happy'],
    conclusion: 'recommendSuperbad',
    message: 'Superbad - A hilarious comedy that will lift your spirits.'
  },
  {
    id: 4,
    conditions: ['comedy', 'familyFriendly'],
    conclusion: 'recommendToyStory',
    message: 'Toy Story - A family-friendly animated comedy loved by all ages.'
  },
  {
    id: 5,
    conditions: ['romance', 'classic'],
    conclusion: 'recommendCasablanca',
    message: 'Casablanca - A timeless romantic classic with unforgettable characters.'
  },
  {
    id: 6,
    conditions: ['drama', 'awardWinning'],
    conclusion: 'recommendGodfather',
    message: 'The Godfather - An award-winning drama masterpiece about family and power.'
  },
  {
    id: 7,
    conditions: ['horror', 'scared'],
    conclusion: 'recommendShining',
    message: 'The Shining - A psychological horror masterpiece that will terrify you.'
  },
  {
    id: 8,
    conditions: ['scifi', 'thoughtful'],
    conclusion: 'recommend2001SpaceOdyssey',
    message: '2001: A Space Odyssey - A thought-provoking sci-fi journey through space and time.'
  },
  {
    id: 9,
    conditions: ['adventure', 'fantasy'],
    conclusion: 'recommendLOTR',
    message: 'The Lord of the Rings - An epic fantasy adventure with breathtaking visuals.'
  },
  {
    id: 10,
    conditions: ['thriller', 'mystery'],
    conclusion: 'recommendSilenceOfTheLambs',
    message: 'The Silence of the Lambs - A thrilling mystery that keeps you on the edge of your seat.'
  },
  
  // Mood-based rules
  {
    id: 11,
    conditions: ['sad', 'drama'],
    conclusion: 'recommendSchindlersList',
    message: 'Schindler\'s List - A powerful and emotional drama about hope during the darkest times.'
  },
  {
    id: 12,
    conditions: ['relaxed', 'indie'],
    conclusion: 'recommendLittleMissSunshine',
    message: 'Little Miss Sunshine - A charming indie film perfect for a relaxed viewing experience.'
  },
  
  // Attribute-based rules
  {
    id: 13,
    conditions: ['foreign', 'thriller'],
    conclusion: 'recommendParasite',
    message: 'Parasite - An award-winning foreign thriller with unexpected twists.'
  },
  {
    id: 14,
    conditions: ['documentary', 'thoughtful'],
    conclusion: 'recommendMarchOfThePenguins',
    message: 'March of the Penguins - A thoughtful documentary about the journey of emperor penguins.'
  },
  
  // Fallback rules (applied when more specific rules don't match)
  {
    id: 15,
    conditions: ['action'],
    conclusion: 'recommendMadMax',
    message: 'Mad Max: Fury Road - An action-packed thrill ride in a post-apocalyptic world.'
  },
  {
    id: 16,
    conditions: ['comedy'],
    conclusion: 'recommendGroundhogDay',
    message: 'Groundhog Day - A comedy classic about a man living the same day over and over.'
  },
  {
    id: 17,
    conditions: ['drama'],
    conclusion: 'recommendShawshankRedemption',
    message: 'The Shawshank Redemption - A powerful drama about hope and perseverance.'
  }
];

// Movie database (for backward chaining goals)
export const movieGoals = [
  'recommendDieHard',
  'recommendMatrix',
  'recommendSuperbad',
  'recommendToyStory',
  'recommendCasablanca',
  'recommendGodfather',
  'recommendShining',
  'recommend2001SpaceOdyssey',
  'recommendLOTR',
  'recommendSilenceOfTheLambs',
  'recommendSchindlersList',
  'recommendLittleMissSunshine',
  'recommendParasite',
  'recommendMarchOfThePenguins',
  'recommendMadMax',
  'recommendGroundhogDay',
  'recommendShawshankRedemption'
];
