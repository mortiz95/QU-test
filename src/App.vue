<template>
  <div class="p-4">
    <table-title title="Star Wars Planets"/>
    <table-planets />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TablePlanets from "@/components/Table.vue"
import TableTitle from "@/components/Title.vue"

export default defineComponent({
  name: "App",
  components: {
    TablePlanets,
    TableTitle
  },
  setup() {

    return {
    };
  },
});
</script>
