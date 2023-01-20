<template>
  <v-app>
    <div><TableList /></div>
    <br />
    <div><TableAPI /></div>
  </v-app>
</template>

<script>
import TableList from "./views/TableList.vue";
import TableAPI from "./views/TableAPI.vue";
export default {
  name: "App",
  components: {
    TableList,
    TableAPI,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.nam {
  width: 200px;
}
</style>
