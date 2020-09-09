<template>
  <base-card :header="cardHeader">
    <weather-icon class="condition-icon" :conditionId="forecast.condition" :size="100"></weather-icon>
    <span class="condition">{{ forecast.condition | weatherCondition }}</span>
    <span class="temperature">
      <span class="min-temperature">{{ forecast.minTemperature }}ºC</span>
      <span class="max-temperature">{{ forecast.maxTemperature }}ºC</span>
    </span>
  </base-card>
</template>
<script>
import { WeatherForecast } from "../models/weather-api-response";
import { formatDate, extendWeekday } from "../filters";

export default {
  name: "weather-forecast",
  props: {
    forecast: {
      type: WeatherForecast,
      required: true,
    },
  },
  computed: {
    cardHeader() {
      return `${formatDate(this.forecast.date)} - ${extendWeekday(
        this.forecast.weekday
      )}`;
    },
  },
};
</script>
<style scoped>
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
