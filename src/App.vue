<template>
  <weather-page></weather-page>
</template>
<script>
import WeatherPage from "./pages/WeatherPage";

export default {
  name: "app-home",
  components: { WeatherPage },
  provide() {
    return {
      applicationState: this.applicationState,
    };
  },
  data: () => ({
    applicationState: {
      isLoading: false,
      hasError: false,
    },
  }),
};
</script>
<style>
body {
  margin: 0;
  font-family: monospace;
  background: linear-gradient(
    90deg,
    rgba(63, 175, 247, 0.8) 0%,
    rgba(0, 131, 158, 0.6) 100%
  );
}

* {
  box-sizing: border-box;
}

.search-input {
  font-size: 24px;
  border: none;
  border-bottom: solid rgba(0, 0, 0, 0.3) 1px;
  text-align: center;
  transition: border-bottom-color 500ms;
}

.foreground-overlay {
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.screen-center {
  margin-left: 50vw;
  margin-top: 50vh;
  width: fit-content;
  height: fit-content;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 20px;
}
</style>
