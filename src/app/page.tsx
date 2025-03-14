'use client';

import { useState, useEffect } from 'react';
import { getRandomJoke } from './services/jokeService'
import JokeCard from './components/JokeCard';
import LikedJokesList from './components/LikedJokesList';
import SearchBar from './components/SearchBar';

interface JokeResponse {
  joke: string;
  id: string;
}

interface JokeItem {
  text: string;
  rating: number;
  id: string;
}

const Home = () => {
  const [joke, setJoke] = useState<JokeResponse | null>(null);
  const [likedJokes, setLikedJokes] = useState<JokeItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'text' | 'rating'>('text');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedJokes = localStorage.getItem('likedJokes');
    if (storedJokes) {
      debugger
      setLikedJokes(JSON.parse(storedJokes));
    }
    fetchNewJoke();
  }, []);

  const fetchNewJoke = async () => {
    setIsLoading(true);
    try {
      const response = await getRandomJoke();
      setJoke(response);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
    setIsLoading(false);
  };

  const handleRemoveJoke = (jokeText: string) => {
    const updatedJokes = likedJokes.filter((j) => j.text !== jokeText);
    setLikedJokes(updatedJokes);
    localStorage.setItem('likedJokes', JSON.stringify(updatedJokes));
  };

  const handleLikeJoke = () => {
    if (joke && !likedJokes.some(j => j.text === joke.joke)) {
      const updatedJokes = [...likedJokes, { text: joke.joke, rating: 1, id: joke.id }];
      setLikedJokes(updatedJokes);
      localStorage.setItem('likedJokes', JSON.stringify(updatedJokes));
      alert('Joke added to your liked list!');
    } else {
      alert('This joke is already in your liked list!');
    }
  };

  const handleRatingChange = (jokeText: string, newRating: number) => {
    const updatedJokes = likedJokes.map(j => 
      j.text === jokeText ? { ...j, rating: newRating } : j
    );
    setLikedJokes(updatedJokes);
    localStorage.setItem('likedJokes', JSON.stringify(updatedJokes));
  };

  const filteredJokes = likedJokes
    .filter((joke) => 
      typeof joke?.text === 'string' && joke.text.toLowerCase().includes(search?.toLowerCase() || '')
    )
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return sortAsc ? a.rating - b.rating : b.rating - a.rating;
      }
      return sortAsc ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text);
    });
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start gap-y-6 p-6">
      <JokeCard
        joke={joke?.joke || ''}
        onFetchNewJoke={fetchNewJoke}
        onLikeJoke={handleLikeJoke}
        isLoading={isLoading}
      />
      {likedJokes.length ?
        <div className= "mt-2 w-1/2 shadow-md p-6 bg-white">
          <h2 className="text-xl font-semibold py-2">Liked Jokes</h2>
          <SearchBar
            search={search}
            sortAsc={sortAsc}
            sortBy={sortBy}
            onSearchChange={setSearch}
            onSortToggle={() => setSortAsc(!sortAsc)}
            onSortByChange={setSortBy}
          />
          <LikedJokesList
            jokes={filteredJokes}
            onRemoveJoke={handleRemoveJoke}
            onRatingChange={handleRatingChange}
          />
        </div>
      : null}
    </div>
  );
};

export default Home;
