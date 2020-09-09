<template>
  <select @input="setValue($event)">
    <option
      v-for="option of options"
      :key="option.value"
      :value="option.value"
      :selected="option.selected"
    >{{ option.label }}</option>
  </select>
</template>
<script>
export default {
  name: "base-select",
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    setValue(event) {
      this.$emit("select", event.target.value);
    },
  },
};
</script>
<style scoped>
select {
  width: fit-content;
}
</style>