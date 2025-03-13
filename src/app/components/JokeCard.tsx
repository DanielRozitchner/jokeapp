'use client';

interface JokeCardProps {
  joke: string;
  onFetchNewJoke: () => void;
  onLikeJoke: () => void;
  isLoading: boolean;
}

const JokeCard = ({ joke, onFetchNewJoke, onLikeJoke, isLoading }: JokeCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-[42]">
      <h1 className="text-xl font-semibold mb-4">Random Joke</h1>
      {joke?.length && !isLoading ? 
      <p className="text-lg font-semibold text-gray-500 mb-4">{joke}</p>
       : <p className="text-lg mb-4">Loading...</p>}
      <div className="flex items-center justify-around space-x-4">
        <button
          onClick={onFetchNewJoke}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          Get Another Joke
        </button>
        <button
          onClick={onLikeJoke}
          className="w-full bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default JokeCard; 