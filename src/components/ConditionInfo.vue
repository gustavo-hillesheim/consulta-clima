<template>
  <div class="condition-info" :title="conditionId | weatherCondition">
    <weather-icon class="icon" :conditionId="conditionId"></weather-icon>
    <span class="label">{{ conditionId | weatherCondition }}</span>
  </div>
</template>
<script>
export default {
  name: "condition-info",
  props: {
    conditionId: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style scoped>
.condition-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100px;
}
.icon {
  margin-bottom: 8px;
}
.label {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>