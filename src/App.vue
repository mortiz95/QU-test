<template>
  <div>
    <table-planets />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TablePlanets from "@/components/Table.vue"

export default defineComponent({
  name: "App",
  components: {
    TablePlanets
  },
  setup() {

    return {
    };
  },
});
</script>
