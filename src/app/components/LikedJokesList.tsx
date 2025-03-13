'use client';

interface LikedJokesListProps {
  jokes: string[];
  onRemoveJoke: (joke: string) => void;
}

const LikedJokesList = ({ jokes, onRemoveJoke }: LikedJokesListProps) => {
  return (
    <ul className="list-none">
      {jokes?.length ? jokes.map((joke, index) => (
        <li key={index} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
          <p>{joke}</p>
          <div className="flex items-center justify-around mt-4 space-x-4">
            <button
                onClick={() => onRemoveJoke(joke)}
                className="bg-red-500 text-white w-full px-4 py-1 rounded-md text-center cursor-pointer"
            >
                Remove
            </button>
            <a
                href={`https://icanhazdadjoke.com/j/${index}`}
                target="_blank"
                className="bg-blue-500 px-4 py-1 rounded-md text-center text-white block w-full"
            >
                Share
            </a>
          </div>
        </li>
      )) : null}
    </ul>
  );
};

export default LikedJokesList; 