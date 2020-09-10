<template>
  <div v-if="weather" class="content">
    <div class="main">
      <weather-details
        class="current-weather"
        :details="weather.dayDetails"
        @search="$emit('search', $event)"
      ></weather-details>
      <daily-weather-forecast class="week-weather" :forecasts="weekForecasts"></daily-weather-forecast>
    </div>
    <div class="forecasts">
      <div class="container">
        <weather-forecast
          class="forecast"
          v-for="forecast of weather.forecast"
          :key="forecast.date"
          :forecast="forecast"
        ></weather-forecast>
      </div>
    </div>
  </div>
</template>
<script>
import WeatherDetails from "./WeatherDetails.vue";
import WeatherForecast from "./WeatherForecast.vue";
import DailyWeatherForecast from "./DailyWeatherForecast.vue";
import { WeatherApiResponse } from "../models/weather-api-response";

export default {
  name: "weather-data",
  components: {
    WeatherDetails,
    WeatherForecast,
    DailyWeatherForecast,
  },
  inject: ["applicationState"],
  props: {
    weather: WeatherApiResponse,
  },
  computed: {
    weekForecasts() {
      return [
        this.mapForecastData(this.weather.dayDetails),
        ...this.weather.forecast.map(this.mapForecastData),
      ];
    },
  },
  methods: {
    mapForecastData(weather) {
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
  flex-direction: column;
}
.current-weather {
  margin-bottom: 12px;
  min-width: 0;
  flex: 1;
}
.week-weather {
  min-width: 0;
  flex: 1;
}
.forecasts {
  flex: 5;
  overflow-x: auto;
  margin: 0px 6px 12px 6px;
}
.forecasts .container {
  display: flex;
  flex-direction: row;
  width: fit-content;
}
.forecasts .forecast {
  width: 200px;
  margin: 0 6px;
}
@media screen and (min-width: 1001px) {
  .main {
    flex-direction: row;
  }
  .current-weather {
    margin-right: 12px;
    margin-bottom: 0;
  }
  .forecasts .container {
    display: flex;
    flex-direction: row;
    width: unset;
  }
  .forecasts .forecast {
    flex: 1;
    margin: 0 6px;
  }
}
</style>
