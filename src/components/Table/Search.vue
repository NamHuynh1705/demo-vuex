<template>
  <div class="searchInput">
    <v-text-field
      type="text"
      @change="onSearch"
      solo
      label="Search Smartphone"
      prepend-inner-icon="mdi-card-search-outline"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "Search",
  computed: {},
  methods: {
    onSearch(e) {
      this.$store.commit("handleSearch", e);
    },
  },
};
</script>

<style scope>
.searchInput {
  margin-top: 20px;
  width: 350px;
  height: 60px;
}
</style>