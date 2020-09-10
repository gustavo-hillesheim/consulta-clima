<template>
  <div class="layout">
    <div class="body">
      <weather-data :weather="weather" @search="loadWeatherData($event)"></weather-data>
    </div>
    <loading-spinner :isLoading="applicationState.isLoading"></loading-spinner>
    <error-overlay :hasError="applicationState.hasError" @search="loadWeatherData($event)"></error-overlay>
    <a href="https://www.freepik.com/vectors/snow">Icons created by bamdewanto - www.freepik.com</a>
  </div>
</template>
<script>
import { getWeatherForecast } from "../services/weather";
import WeatherData from "../components/WeatherData";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorOverlay from "../components/ErrorOverlay";

export default {
  name: "main-page",
  components: { WeatherData, LoadingSpinner, ErrorOverlay },
  inject: ["applicationState"],
  data: () => ({
    weather: null,
  }),
  created() {
    const searchPlace =
      localStorage.getItem("local-consulta") || "São Paulo,SP";
    this.loadWeatherData(searchPlace);
  },
  methods: {
    loadWeatherData(searchPlace) {
      this.applicationState.hasError = false;

      if (searchPlace) {
        this.requestWeatherData({ searchPlace });
      } else {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => this.requestWeatherData(coords),
          () => this.requestWeatherData({ searchPlace })
        );
      }
    },

    requestWeatherData(searchData) {
      this.applicationState.isLoading = true;
      getWeatherForecast(searchData)
        .then(this.setWeatherData.bind(this))
        .catch(this.handleWeatherRequestError.bind(this));
    },

    setWeatherData(weather) {
      this.weather = weather;
      const searchPlace = weather.dayDetails.city;

      localStorage.setItem("local-consulta", searchPlace);
      this.applicationState.isLoading = false;
    },

    handleWeatherRequestError(error) {
      console.error("Erro na chamada da API", error);
      this.applicationState.hasError = true;
      this.applicationState.isLoading = false;
    },
  },
};
</script>
<style>
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vh;
}
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
a {
  background-color: white;
}
</style>