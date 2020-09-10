<template>
  <div class="layout">
    <div class="header"></div>
    <div class="body">
      <weather-data></weather-data>
    </div>
    <div class="loader-container" v-if="applicationState.isLoading">
      <div class="loader">
        <div class="loader-spinner"></div>Carregando...
      </div>
    </div>
  </div>
</template>
<script>
import WeatherData from "./components/WeatherData.vue";

export default {
  name: "app-home",
  components: { WeatherData },
  provide() {
    return {
      applicationState: this.applicationState,
    };
  },
  data: () => ({
    applicationState: {
      isLoading: false,
    },
  }),
};
</script>
<style scoped>
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vh;
  background: linear-gradient(
    90deg,
    rgba(63, 175, 247, 0.8) 0%,
    rgba(0, 131, 158, 0.6) 100%
  );
}

.header {
  max-height: 50px;
  display: flex;
  flex-direction: row;
  background-color: transparent;
}

.header .title {
  color: white;
  font-size: 28px;
  margin: auto 24px;
}

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.loader-container {
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.loader {
  margin-left: 50vw;
  margin-top: 50vh;
  width: fit-content;
  height: fit-content;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 20px;
}

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
