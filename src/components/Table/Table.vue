  
<template >
  <div class="formAction">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th
              class="text-left"
              v-for="(item, index) in dataHeader"
              :key="index"
            >
              {{ item }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(phone, index) in getDataSortPrice" :key="phone.id">
            <td>
              {{ index + 1 }}
            </td>
            <td>
              {{ phone.smartphone }}
            </td>
            <td>
              {{ phone.price }}
            </td>
            <td>
              {{ phone.company }}
            </td>
            <td>
              <v-tooltip top color="rgba(0, 0, 0, 0.9)" nudge-bottom="6px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    fab
                    x-small
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="onEdit(phone)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>

              &ensp;
              <v-tooltip top color="rgba(0, 0, 0, 0.9)" nudge-bottom="6px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="error"
                    fab
                    x-small
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="onDelete(phone.id)"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Table",
  computed: {
    ...mapState({
      dataHeader: (state) => state.dataTable.dataHeader,
    }),

    //getters
    getDataSortPrice() {
      return this.$store.getters.dataSortPrice;
    },
  },
  methods: {
    onDelete(id) {
      this.$store.commit("handleDataDelete", id);
    },
    onEdit(phone) {
      this.$store.commit("handleEdit", phone);
    },
  },
};
</script>

<style scope>
</style>