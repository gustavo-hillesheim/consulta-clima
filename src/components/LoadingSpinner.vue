<template>
  <div class="foreground-overlay" v-if="isLoading">
    <div class="screen-center">
      <div class="loader-spinner"></div>Carregando...
    </div>
  </div>
</template>
<script>
export default {
  name: "loading-spinner",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.loader-spinner {
  margin: 12px auto;
  width: 100px;
  height: 100px;
  border: 12px solid lightgrey;
  border-top: 12px solid rgba(63, 175, 247);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>