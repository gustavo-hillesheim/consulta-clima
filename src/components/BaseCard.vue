<template>
  <div class="card">
    <div class="header">
      <slot name="header" :header="header">
        <span v-if="!!header">{{ header }}</span>
      </slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "base-card",
  props: {
    header: String,
  },
};
</script>
<style scoped>
.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 8px;
  display: flex;
  flex-direction: column;
}

.card .header {
  font-size: 20px;
  margin: 12px 24px;
  text-align: start;
  height: fit-content;
}

.body {
  padding: 12px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
