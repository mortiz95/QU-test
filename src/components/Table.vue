<template>
  <div>
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border mt-5" role="status"></div>
    </div>
    <div v-else class="table-planets">
      <table class="table table-sm table-striped">
        <thead>
          <tr>
            <th @click="sort('name')">Name
              <span v-if="sortBy == 'name'" class="material-icons">{{ sortIndicator }}</span>
              <span v-else class="material-icons">sort</span>
            </th>
            <th @click="sort('climate')">Climate
              <span v-if="sortBy == 'climate'" class="material-icons">{{ sortIndicator }}</span>
              <span v-else class="material-icons">sort</span>
            </th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Created</th>
            <th>Orbital Period</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Terrain</th>
            <th>Edited</th>
            <th>Residents</th>
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
            <td>{{ item.rotation_period }}</td>
            <td>{{ item.surface_water }}</td>
            <td>{{ item.terrain }}</td>
            <td>{{ formatDate(item.edited) }}</td>
            <td>{{ item.resident_names_from_api }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { fetchData, getResidents } from '@/api/swapiService';

import formatDate from '@/composables/DateComposable';

export default defineComponent({
  name: "TablePlanet",
  setup() {

    const loading = ref(true); // Showing spinner
    const data = ref([]); // Holds the API data
    const sortBy = ref(null); // Holds the current sorting column
    const sortDesc = ref(false); // Determines whether to sort in descending order

    onMounted(async () => {
      try {
        const response = await fetchData();
        const rawData = response;
        const formattedWithResidentsFromAPI = await getResidents(rawData);
        data.value = formattedWithResidentsFromAPI;
      } catch (error) {
        console.error('Error:', error);
      } finally {
        loading.value = false;
      }
    });


    const sortedData = computed(() => {
      return data.value
    })

    const sortIndicator = computed(() => {
      if (sortBy.value === null || sortDesc.value) {
        return "arrow_drop_down";
      } else {
        return "arrow_drop_up";
      }
    });

    // Watch the sortBy and sortDesc refs for changes and sort the data accordingly
    watch([sortBy, sortDesc], () => {
      if (sortBy.value) {
        data.value.sort((a, b) => {
          const modifier = sortDesc.value ? -1 : 1;
          const valueA = a[sortBy.value];
          const valueB = b[sortBy.value];
          return modifier * valueA.localeCompare(valueB);
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

    return {
      data,
      sortBy,
      sortDesc,
      sortedData,
      sortIndicator,
      loading,
      formatDate,
      sort
    };
  },
});
</script>
<style>
.table-planets {
  padding: 1rem;
  border: solid var(--bs-border-color);
  border-width: 1px;
  border-radius: var(--bs-border-radius);
}

.material-icons {
  vertical-align: -6px;
}
</style>
