<template>
  <div class="text-center">
    <v-pagination v-model="page" :length="6"></v-pagination>
    <v-btn class="ma-2" color="primary" dark>
      Accept
      <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
    </v-btn>
    <v-btn class="ma-2" color="red" dark>
      Decline
      <v-icon dark right> mdi-cancel </v-icon>
    </v-btn>
    <br /><br />
    <p>{{ getState }}</p>
    <p>{{ result }}</p>
    <p>{{ value }}</p>
    <p>{{ getters }}</p>
    <p>{{ getTodoId }}</p>
    <p>{{ todosCount }}</p>
    <p>{{ doneTodosCount }}</p>
    <p>DoneCount: {{ newname }}</p>
    <p>UpdateState: {{ updateState }}</p>
    <p>UpdateStateAdd: {{ updateStateAdd }}</p>
    <p>Mutations Login: {{ getLogin }}</p>
    <v-btn depressed color="primary" @click="loginORlogout">
      MapMutations Login
    </v-btn>
    <br />
    <input
      v-for="todo in todos"
      :key="todo.id"
      type="checkbox"
      :checked="todo.done"
      @change="handle_todosDone(todo.id)"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "Home",

  components: {},
  data() {
    return {
      page: 1,
      doneCount: null,
    };
  },
  computed: {
    // get state
    getState() {
      return this.$store.state.getState;
    },
    getLogin() {
      return this.$store.state.login;
    },
    // dùng helper: mapState (chỉ lấy được, ko update được state)
    ...mapState({
      result: (state) => state.result,
      value: (state) => state.value,
      getState: (state) => state.getState,
      todos: (state) => state.todos,
    }),

    // Xử lý dữ liệu trong hàm (lấy ở store sang)
    getters() {
      return this.$store.getters.doneTodos;
    },
    getTodoId() {
      return this.$store.getters.getTodoId(2);
    },
    // Hàm trong cùng getters
    todosCount() {
      return `Leght getters: ${this.$store.getters.doneTodosCount}`;
    },
    // MapGetters (tương tự MapState)
    ...mapGetters(["doneTodosCount"]),
    // hoặc có thể sử dụng 1 tên khác:
    ...mapGetters({
      newname: "doneTodosCount",
    }),
  },
  methods: {
    //Mutations: thay đổi giá trị state
    updateState() {
      return this.$store.commit("increment");
    },
    // truyền vào 1 tham số
    updateStateAdd() {
      return this.$store.commit("incrementAdd", 10);
    },
    // MapMutations
    ...mapMutations({
      loginORlogout: "handleLogin",
    }),
    handle_todosDone(id) {
      this.$store.commit("change_todosDone", id);
    },
  },
};
</script>
