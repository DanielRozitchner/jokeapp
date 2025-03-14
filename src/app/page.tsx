'use client';

import { useState, useEffect } from 'react';
import { getRandomJoke } from './services/jokeService'
import JokeCard from './components/JokeCard';
import LikedJokesList from './components/LikedJokesList';
import SearchBar from './components/SearchBar';

interface JokeItem {
  text: string;
  rating: number;
}

const Home = () => {
  const [joke, setJoke] = useState<string>('');
  const [likedJokes, setLikedJokes] = useState<JokeItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'text' | 'rating'>('text');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedJokes = localStorage.getItem('likedJokes');
    if (storedJokes) {
      setLikedJokes(JSON.parse(storedJokes));
    }
    fetchNewJoke();
  }, []);

  const fetchNewJoke = async () => {
    try{
    setIsLoading(true)
    const newJoke = await getRandomJoke();
    if (newJoke?.length){
      setJoke(newJoke);
    } else {
      setJoke('Joke not founded')
    }
    setIsLoading(false)
    } catch (e){
      setIsLoading(false)
      console.log(e)
    }
  };

  const handleRemoveJoke = (jokeText: string) => {
    const updatedJokes = likedJokes.filter((j) => j.text !== jokeText);
    setLikedJokes(updatedJokes);
    localStorage.setItem('likedJokes', JSON.stringify(updatedJokes));
  };

  const handleLikeJoke = () => {
    if (!likedJokes.some(j => j.text === joke)) {
      const updatedJokes = [...likedJokes, { text: joke, rating: 1 }];
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
        joke={joke}
        onFetchNewJoke={fetchNewJoke}
        onLikeJoke={handleLikeJoke}
        isLoading={isLoading}
      />
      <div className="mt-2 w-1/2 shadow-md p-6 bg-white">
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
    </div>
  );
};

export default Home;
