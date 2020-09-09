<template>
  <base-card :header="cardHeader">
    <span class="main-data">
      <div class="condition-info">
        <weather-icon class="condition-icon" :conditionId="details.condition"></weather-icon>
        <span class="condition-label">{{ details.condition | weatherCondition }}</span>
      </div>
      <span class="temperature">{{ details.temperature }}ºC</span>
    </span>
    <div class="complementary-data">
      <span class="min-temperature data-one">Mínima: {{ details.minTemperature }}ºC</span>
      <span class="max-temperature data-two">Máxima: {{ details.maxTemperature }}ºC</span>
      <span class="clouds data-three">Nuvens: {{ details.clouds }}%</span>
      <span class="wind-speed data-four">Ventos: {{ details.windSpeed }}km/h</span>
      <span class="humidity data-five">Humidade: {{ details.currentHumidity }}%</span>
      <span class="rain data-six">Chuva: {{ details.currentRain }}mm/h</span>
    </div>
    <hourly-weather-forecast :hourlyForecasts="details.hourlyForecast"></hourly-weather-forecast>
  </base-card>
</template>
<script>
import HourlyWeatherForecast from "./HourlyWeatherForecast.vue";
import { WeatherDetails } from "../models/weather-api-response.js";
import { extendDate, extendWeekday } from "../filters";

export default {
  name: "weather-details",
  components: { HourlyWeatherForecast },
  props: {
    details: {
      type: WeatherDetails,
      required: true,
    },
  },
  computed: {
    cardHeader() {
      return `${this.details.city} - ${extendDate(
        this.details.date
      )}, ${extendWeekday(this.details.weekday)}`;
    },
  },
};
</script>
<style scoped>
.complementary-data {
  display: grid;
  grid-template-columns: 33%;
  grid-template-rows: auto;
}
span {
  font-size: 18px;
  margin: 4px 0;
}
.temperature {
  font-weight: 200;
  font-size: 40px;
  align-self: center;
}
.condition-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 24px;
  font-size: 24;
}
.main-data {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
}
.data-one {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
}
.data-two {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 2;
}
.data-three {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
}
.data-four {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
}
.data-five {
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
}
.data-six {
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
}
</style>
