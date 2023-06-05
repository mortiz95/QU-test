<template>
    <h2>
       {{ tableTitle }}
    </h2>
  </template>
  
  <script>
  import { defineComponent,computed} from 'vue';
  
  export default defineComponent({
    name: "TableTitle",
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup(props) {
  
      const tableTitle = computed(() => {
        return props.title
      })
  
      return {
        tableTitle
      };
    },
  });
  </script>
