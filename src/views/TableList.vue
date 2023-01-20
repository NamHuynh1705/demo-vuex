<template>
  <div>
    <div class="col-4 formactions">
      <FormAction />
    </div>
    <div class="col-8 table">
      <Search />
      <Table />
    </div>
  </div>
</template>

<script>
import FormAction from "../components/Table/FormAction.vue";
import Table from "../components/Table/Table.vue";
import Search from "../components/Table/Search.vue";
export default {
  name: "TableList",
  components: {
    FormAction,
    Table,
    Search,
  },
};
</script>

<style scope>
.table {
  float: right;
}
.formactions {
  float: left;
}
</style>