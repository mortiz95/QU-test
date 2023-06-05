import axios from 'axios';

export async function fetchData() {
  try {
    const response = await axios.get('https://swapi.dev/api/planets');
    return response.data.results; 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function getResidents(data){
  try {
      data.forEach(async (planet) => {
      let allDataPromises =  planet.residents.map(async (item) => {
        const itemReq = await axios.get(item);
        const itemResponse = await itemReq.data.name;
        return itemResponse
      });  
      planet['resident_names_from_api'] = (await Promise.all(allDataPromises)).toString();
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
 return data;
} 


 


