<template>
  <div class="layout">
    <div class="header"></div>
    <div class="body">
      <weather-data></weather-data>
    </div>
  </div>
</template>
<script>
import WeatherData from "./components/WeatherData.vue";

export default {
  name: "app-home",
  components: { WeatherData },
};
</script>
<style scoped>
.layout {
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
</style>
