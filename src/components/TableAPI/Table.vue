  
<template >
  <div class="formAction">
    <h3 class="label-tableapi">Table API</h3>
    <v-btn color="primary" class="ma-2 white--text" @click="callAPI">
      Upload API
      <v-icon right dark> mdi-cloud-upload </v-icon>
    </v-btn>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th
              v-for="(header, index) in listsTodoHeader"
              :key="index"
              class="text-left"
            >
              {{ header }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{ edit: editing === todo.id }"
            v-for="todo in listsTodo"
            :key="todo.id"
          >
            <td v-if="editing === todo.id">
              <v-text-field v-model="todo.id"></v-text-field>
            </td>
            <td v-else>{{ todo.id }}</td>

            <td v-if="editing === todo.id">
              <v-text-field v-model="todo.name"></v-text-field>
            </td>
            <td v-else>{{ todo.name }}</td>

            <td v-if="editing === todo.id">
              <v-text-field v-model="todo.email"></v-text-field>
            </td>
            <td v-else>{{ todo.email }}</td>

            <td v-if="editing === todo.id">
              <v-text-field v-model="todo.website"></v-text-field>
            </td>
            <td v-else>{{ todo.website }}</td>

            <td>
              <v-tooltip
                v-if="editing === todo.id"
                top
                color="rgba(0, 0, 0, 0.9)"
                nudge-bottom="6px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    fab
                    x-small
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="onEdit(todo)"
                  >
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </template>
                <span>Save</span>
              </v-tooltip>

              <v-tooltip
                v-else
                top
                color="rgba(0, 0, 0, 0.9)"
                nudge-bottom="6px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    fab
                    x-small
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="editMode(todo.id)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>

              &ensp;
              <v-tooltip
                v-if="editing === todo.id"
                top
                color="rgba(0, 0, 0, 0.9)"
                nudge-bottom="6px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="blue-grey"
                    fab
                    x-small
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="onCancel"
                  >
                    <v-icon>mdi-cancel</v-icon>
                  </v-btn>
                </template>
                <span>Cancel</span>
              </v-tooltip>
              <v-tooltip
                v-else
                top
                color="rgba(0, 0, 0, 0.9)"
                nudge-bottom="6px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="error"
                    fab
                    x-small
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="onDelete(todo.id)"
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
    <p class="nodata" v-if="getLengthListTodo <= 0">No data</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Table",
  computed: {
    ...mapState({
      listsTodoHeader: (state) => state.listsTodoHeader,
      listsTodo: (state) => state.listsTodo,
      editing: (state) => state.editing,
    }),
    getLengthListTodo() {
      return this.$store.getters.lengthListTodo;
    },
  },
  methods: {
    callAPI() {
      this.$store.dispatch("getList");
    },
    onDelete(id) {
      this.$store.dispatch("handleDeleteAPI", id);
    },
    editMode(id) {
      this.$store.commit("setEditModel", id);
    },
    onCancel() {
      this.$store.commit("handleCancel");
    },
    onEdit(todo) {
      if (todo.name === "" || todo.email === "" || todo.website === "") return;
      this.$store.dispatch("handleEditAPI", todo);
    },
  },
};
</script>

<style scoped>
.label-tableapi {
  display: flex;
  justify-content: center;
}
.formAction {
  width: 65%;
  margin: auto;
  margin-bottom: 40px;
}
.edit {
  background-color: #eee;
}
.nodata {
  color: #ff0000b3;
  font-style: italic;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>