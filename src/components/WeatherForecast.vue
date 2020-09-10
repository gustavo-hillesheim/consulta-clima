<template>
  <div>
    <base-card>
      <template v-slot:header>
        <div class="forecast-header">
          <span class="date">{{ forecast.date | formatDate }}</span>
          <span class="weekday">{{ forecast.weekday | extendWeekday }}</span>
        </div>
      </template>
      <condition-info
        :conditionId="forecast.condition"
        style="margin-bottom: 12px; align-self: center"
      ></condition-info>
      <span class="temperature">
        <span class="min-temperature">{{ forecast.minTemperature }}ºC</span>
        <span class="max-temperature">{{ forecast.maxTemperature }}ºC</span>
      </span>
    </base-card>
  </div>
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
  width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 1281px) {
  .forecast-header {
    flex-direction: row;
  }
  .weekday::before {
    content: " - ";
  }
}
span {
  text-align: center;
}
.temperature {
  display: inline-block;
}
.max-temperature::before {
  content: " - ";
}
</style>
