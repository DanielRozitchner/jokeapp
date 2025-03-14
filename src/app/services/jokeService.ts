import axios from 'axios';

export const getRandomJoke = async () => {
  try {
    const response = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
    if(response?.data?.joke?.length){
        return response.data.joke;
    }{
        return 'Not joke founded'
    }
  } catch (error) {
    console.error('Error fetching joke', error);
    return 'Joke not found';
  }
};
