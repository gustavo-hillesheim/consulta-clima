<template>
  <base-card>
    <template v-slot:header>
      <input
        class="city-search-input"
        v-model="cityName"
        @keyup.enter="$emit('search', cityName)"
        :size="cityName.length || 1"
      />
      <span class="date-details">{{ dateDetails }}</span>
    </template>
    <span class="main-data">
      <div class="condition-info">
        <weather-icon class="condition-icon" :conditionId="details.condition"></weather-icon>
        <span
          class="condition-label"
          :title="details.condition | weatherCondition"
        >{{ details.condition | weatherCondition }}</span>
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
    cityName: {
      get() {
        return this.details.city;
      },
      set(value) {
        this.details.city = value;
      },
    },
    dateDetails() {
      return `${extendDate(this.details.date)}, ${extendWeekday(
        this.details.weekday
      )}`;
    },
  },
};
</script>
<style scoped>
.city-search-input {
  font-size: 24px;
  border: none;
  border-bottom: solid rgba(0, 0, 0, 0.3) 1px;
  text-align: center;
  transition: border-bottom-color 500ms;
}
.city-search-input:hover {
  border-bottom-color: black;
}
.complementary-data {
  display: grid;
  grid-template-columns: 33%;
  grid-template-rows: auto;
}
.date-details::before {
  content: " - ";
}
span:not(.date-details) {
  font-size: 18px;
  margin: 4px 0;
}
.condition-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 24px;
  width: 100px;
}
.condition-label {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.main-data {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
}
.temperature {
  font-weight: 200;
  font-size: 40px !important;
  align-self: center;
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
