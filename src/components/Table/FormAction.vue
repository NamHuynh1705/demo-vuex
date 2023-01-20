<template>
  <div class="formActions">
    <h2 class="lable-add-edit">{{ model }}</h2>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="form.smartphone"
        :counter="5"
        :rules="nameRules"
        label="Smartphone"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.price"
        :rules="priceRules"
        label="Price"
        required
      ></v-text-field>

      <v-select
        v-model="form.company"
        :items="items"
        :rules="[(v) => !!v || 'Company is required']"
        label="Company"
        required
      ></v-select>

      <div class="group-button">
        <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          @click="validate"
        >
          Save
        </v-btn>

        <v-btn color="blue-grey" class="mr-4" @click="reset" dark>
          Cancel
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FormAction",
  data: () => ({
    valid: true,
    nameRules: [
      (v) => !!v || "Smartphone is required",
      (v) => (v && v.length >= 5) || "Smartphone must be at least 5 characters",
    ],
    priceRules: [
      (v) => !!v || "Price is required",
      (v) => /$/.test(v) || "Price must be valid",
    ],
    items: ["Samsung", "Apple", "Nokia", "Xiaomi"],
  }),
  computed: {
    ...mapState({
      model: (state) => state.model,
      form: (state) => state.form,
    }),
  },

  methods: {
    validate() {
      this.$refs.form.validate();
      if (
        this.model === "Add" &&
        this.form.smartphone &&
        this.form.price &&
        this.form.company
      ) {
        this.$store.commit("addDataForm", this.form);
      }
      if (this.model === "Edit") {
        this.$store.commit("editDataForm", this.form);
      }
    },
    reset() {
      this.$refs.form.reset();
      this.$store.commit("setModelAdd", "Add");
    },
  },
};
</script>

<style>
.formActions {
  width: 65%;
  margin: 20px auto;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 5px #ccc;
  border-radius: 15px;
  padding: 20px 25px;
}
.lable-add-edit {
  font-style: italic;
  display: flex;
  justify-content: center;
}
.group-button {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>