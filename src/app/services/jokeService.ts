import axios from 'axios';

export const getRandomJoke = async () => {
  try {
    const response = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data.joke;
  } catch (error) {
    console.error('Error fetching joke', error);
    return 'Joke not found';
  }
};
