'use client';

interface JokeItem {
  text: string;
  rating: number;
  id: string;
}

interface LikedJokesListProps {
  jokes: JokeItem[];
  onRemoveJoke: (joke: string) => void;
  onRatingChange: (joke: string, rating: number) => void;
}

const LikedJokesList = ({ jokes, onRemoveJoke, onRatingChange }: LikedJokesListProps) => {
  return (
    <ul className="list-none">
      {jokes?.length ? jokes.map((joke) => (
        <li key={joke.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
          <p>{joke.text}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onRatingChange(joke.text, star)}
                  className={`text-2xl cursor-pointer ${
                    star <= joke.rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onRemoveJoke(joke.text)}
                className="bg-red-500 text-white px-4 py-1 rounded-md text-center cursor-pointer"
              >
                Remove
              </button>
              <a
                href={`https://icanhazdadjoke.com/j/${joke.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 px-4 py-1 rounded-md text-center text-white block"
              >
                Share
              </a>
            </div>
          </div>
        </li>
      )) : null}
    </ul>
  );
};

export default LikedJokesList; 