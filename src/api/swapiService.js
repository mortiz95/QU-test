import axios from 'axios';

export async function fetchData() {
  try {
    const response = await axios.get('https://swapi.dev/api/planets');
    return response.data.results; 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function getResidents(data) {
  try {
    await Promise.all(
      data.map(async (planet) => {
        const residentPromises = planet.residents.map(async (item) => {
          const response = await axios.get(item);
          return response.data.name;
        });
        const residentNames = await Promise.all(residentPromises);
        planet['resident_names_from_api'] = residentNames.join(', ');
      })
    );
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
  return data;
}

 


