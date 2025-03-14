import axios from 'axios';

interface JokeResponse {
  joke: string;
  id: string;
}

export const getRandomJoke = async (): Promise<JokeResponse> => {
  try {
    const response = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
   
    return {
      joke: response.data.joke,
      id: response.data.id
    };
    
  } catch (error) {
    console.error('Error fetching joke', error);
    return {
      joke: 'Error fetching joke',
      id: 'error'
    };
  }
};
