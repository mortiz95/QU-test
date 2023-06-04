import axios from 'axios';

export default {
    async fetchData() {
      try {
        const response = await axios.get('https://swapi.dev/api/planets');
        return response.data.results; // Update the data ref with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
};


