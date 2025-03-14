'use client';

import { useState, useEffect } from 'react';
import { getRandomJoke } from './services/jokeService'
import JokeCard from './components/JokeCard';
import LikedJokesList from './components/LikedJokesList';
import SearchBar from './components/SearchBar';

const Home = () => {
  const [joke, setJoke] = useState<string>('');
  const [likedJokes, setLikedJokes] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
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

  const handleRemoveJoke = (jokeToRemove: string) => {
    const updatedJokes = likedJokes.filter((j) => j !== jokeToRemove);
    setLikedJokes(updatedJokes);
    localStorage.setItem('likedJokes', JSON.stringify(updatedJokes));
  };

  const handleLikeJoke = () => {
    if (!likedJokes.includes(joke)) {
      const updatedJokes = [...likedJokes, joke];
      setLikedJokes(updatedJokes);
      localStorage.setItem('likedJokes', JSON.stringify(updatedJokes));
    }
  };

  const filteredJokes = likedJokes.filter((joke) => 
    typeof joke === 'string' && joke.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => (sortAsc ? a.localeCompare(b) : b.localeCompare(a)));
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
          onSearchChange={setSearch}
          onSortToggle={() => setSortAsc(!sortAsc)}
        />
        <LikedJokesList
          jokes={filteredJokes}
          onRemoveJoke={handleRemoveJoke}
        />
      </div>
    </div>
  );
};

export default Home;
