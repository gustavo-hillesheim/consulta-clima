<template>
  <base-card>
    <template v-slot:header>
      <div class="forecast-header">
        <span class="date">{{ forecast.date | formatDate }}</span>
        <span class="weekday">{{ forecast.weekday | extendWeekday }}</span>
      </div>
    </template>
    <weather-icon class="condition-icon" :conditionId="forecast.condition"></weather-icon>
    <span class="condition">{{ forecast.condition | weatherCondition }}</span>
    <span class="temperature">
      <span class="min-temperature">{{ forecast.minTemperature }}ºC</span>
      <span class="max-temperature">{{ forecast.maxTemperature }}ºC</span>
    </span>
  </base-card>
</template>
<script>
import { WeatherForecast } from "../models/weather-api-response";

export default {
  name: "weather-forecast",
  props: {
    forecast: {
      type: WeatherForecast,
      required: true,
    },
  },
};
</script>
<style scoped>
.forecast-header {
  text-align: center;
  display: flex;
  flex-direction: column;
}
.card {
  text-align: center;
}
span {
  font-size: 20px;
}
.condition-icon {
  align-self: center;
  margin-bottom: 24px;
}
.temperature {
  display: inline-block;
}
.max-temperature::before {
  content: " - ";
}
</style>
