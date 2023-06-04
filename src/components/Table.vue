<template>
  <div class="p-4">
    <h3>Star Wars Planets</h3>
    <div class="table-planets">
      <table class="table table-sm table-striped">
        <thead>
          <tr>
            <th @click="sort('name')">Name
              <span v-if="sortBy == 'name'" class="material-icons">{{arrowIconName}}</span>
              <span v-else class="material-icons">sort</span>
            </th>
            <th @click="sort('climate')">Climate
              <span v-if="sortBy == 'climate'" class="material-icons">{{arrowIconName}}</span>
              <span v-else class="material-icons">sort</span>
            </th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Created</th>
            <th>Orbital Period</th>
            <th>Population</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Terrain</th>
            <th>Edited</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(item, index) in sortedData" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.climate }}</td>
            <td>{{ item.diameter }}</td>
            <td>{{ item.gravity }}</td>
            <td>{{ formatDate(item.created) }}</td>
            <td>{{ item.orbital_period }}</td>
            <td>{{ item.population }}</td>
            <td>{{ item.rotation_period }}</td>
            <td>{{ item.surface_water }}</td>
            <td>{{ item.terrain }}</td>
            <td>{{ formatDate(item.edited) }}</td>
          </tr>
        </tbody>
      </table>
    </div> 
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onBeforeMount } from 'vue';
import swapiPlanet from '@/api/swapiService';

import formatDate from '@/composables/DateComposable';

export default defineComponent({
  name: "TablePlanet",
  setup() {

    const data = ref([]); // Holds the API data
    const sortBy = ref(null); // Holds the current sorting column
    const sortDesc = ref(false); // Determines whether to sort in descending order
    const arrowIconName = ref("arrow_drop_up");
    const sortedData = computed(() => data.value)

    onBeforeMount(async () => {
      data.value = await swapiPlanet.fetchData()
    });

    // Watch the sortBy and sortDesc refs for changes and sort the data accordingly
    watch([sortBy, sortDesc], () => {
      if (sortBy.value) {
        data.value.sort((a, b) => {
          const modifier = sortDesc.value ? -1 : 1;
          modifier === 1 ?  arrowIconName.value = "arrow_drop_up" : arrowIconName.value = "arrow_drop_down" ;
          if (a[sortBy.value] < b[sortBy.value]) return -1 * modifier;
          if (a[sortBy.value] > b[sortBy.value]) return 1 * modifier;
          return 0;
        });
      }
    });

    const sort = (column) => {
      if (sortBy.value === column) {
        sortDesc.value = !sortDesc.value;
      } else {
        sortBy.value = column;
        sortDesc.value = false;
      }

    };

    // Return the reactive data and methods
    return {
      data,
      sortBy,
      sortDesc,
      sortedData,
      arrowIconName,
      formatDate,
      sort,
      
    };
  },
});
</script>
<style>

.table-planets{
    padding: 1rem;
    border: solid var(--bs-border-color);
    border-width: 1px;
    border-radius: var(--bs-border-radius);
}

.material-icons {
    vertical-align: -6px;
}

</style>
