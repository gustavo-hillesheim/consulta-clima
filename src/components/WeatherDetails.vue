<template>
  <base-card>
    <template v-slot:header>
      <input
        class="search-input"
        v-model="cityName"
        @keyup.enter="$emit('search', cityName)"
        :size="cityName.length || 1"
      />
      <span class="date-details">{{ dateDetails }}</span>
    </template>
    <div class="content">
      <div class="main-data">
        <condition-info :conditionId="details.condition" style="margin: 0 24px"></condition-info>
        <span class="temperature">{{ details.temperature }}ºC</span>
      </div>
      <div class="complementary-data">
        <span class="min-temperature data-one">Mínima: {{ details.minTemperature }}ºC</span>
        <span class="max-temperature data-two">Máxima: {{ details.maxTemperature }}ºC</span>
        <span class="clouds data-three">Nuvens: {{ details.clouds }}%</span>
        <span class="wind-speed data-four">Ventos: {{ details.windSpeed }}km/h</span>
        <span class="humidity data-five">Humidade: {{ details.currentHumidity }}%</span>
        <span class="rain data-six">Chuva: {{ details.currentRain }}mm/h</span>
      </div>
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
.complementary-data {
  margin: auto 12px;
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 33%;
  grid-template-rows: auto;
}
.content {
  display: flex;
  flex-direction: row;
}
.date-details::before {
  content: " - ";
}
span:not(.date-details) {
  margin: 2px 0;
}
.main-data {
  margin: 12px;
  display: flex;
  flex-direction: row;
}
@media screen and (min-width: 1001px) {
  .content {
    flex-direction: column;
  }
  .complementary-data {
    margin-bottom: 12px;
  }
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
