<template>
  <div v-if="weather" class="content">
    <div class="main">
      <weather-details
        class="current-weather"
        :details="weather.dayDetails"
        @search="loadData($event)"
      ></weather-details>
      <daily-weather-forecast class="week-weather" :forecasts="weekForecasts"></daily-weather-forecast>
    </div>
    <div class="forecasts">
      <weather-forecast
        class="forecast"
        v-for="forecast of weather.forecast"
        :key="forecast.date"
        :forecast="forecast"
      ></weather-forecast>
    </div>
    <a href="https://www.freepik.com/vectors/snow">Icons created by bamdewanto - www.freepik.com</a>
  </div>
</template>
<script>
import WeatherDetails from "./WeatherDetails.vue";
import WeatherForecast from "./WeatherForecast.vue";
import DailyWeatherForecast from "./DailyWeatherForecast.vue";
import { getWeatherForecast } from "../services/weather";

export default {
  name: "weather-data",
  components: {
    WeatherDetails,
    WeatherForecast,
    DailyWeatherForecast,
  },
  data: () => ({
    weather: null,
    cityName: null,
  }),
  created() {
    this.cityName = localStorage.getItem("cidade-consulta") || "São Paulo,SP";
    this.loadData(this.cityName);
  },
  computed: {
    weekForecasts() {
      return [
        this.getForecastData(this.weather.dayDetails),
        ...this.weather.forecast.map(this.getForecastData),
      ];
    },
  },
  methods: {
    loadData(cityName) {
      if (cityName) {
        this.requestData({
          cityName: cityName,
        });
      } else {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => this.requestData(coords),
          () =>
            this.requestData({
              cityName: cityName,
            })
        );
      }
    },
    requestData(searchData) {
      getWeatherForecast(searchData).then((weather) => {
        this.weather = weather;
        this.cityName = weather.dayDetails.city;
        localStorage.setItem("cidade-consulta", this.cityName);
      });
    },
    getForecastData(weather) {
      return {
        date: weather.date,
        weekday: weather.weekday,
        min: weather.minTemperature,
        max: weather.maxTemperature,
        rain: weather.rain,
        humidity: weather.humidity,
      };
    },
  },
};
</script>
<style scoped>
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 5;
  margin: 12px;
  display: flex;
  flex-direction: row;
}
.current-weather {
  margin-right: 6px;
  min-width: 0;
  flex: 1;
}
.week-weather {
  margin-left: 6px;
  min-width: 0;
  flex: 1;
}
.forecasts {
  flex: 5;
  display: flex;
  flex-direction: row;
  margin: 0px 6px 12px 6px;
}
.forecasts .forecast {
  flex: 1;
  margin: 0 6px;
}
</style>
