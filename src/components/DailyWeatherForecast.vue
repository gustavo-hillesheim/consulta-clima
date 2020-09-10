<template>
  <base-card :header="cardHeader">
    <span class="spacer"></span>
    <base-select :options="chartTypeOptions" @select="chartType = $event"></base-select>
    <line-chart :key="chartConfig.id" :config="chartConfig"></line-chart>
  </base-card>
</template>
<script>
import { formatDate, shortWeekday } from "../filters";

export default {
  name: "daily-weather-forecast",
  props: {
    forecasts: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    chartTypeOptions: [
      {
        label: "Temperatura",
        value: "temperature",
        selected: true,
      },
      {
        label: "Chuva",
        value: "rain",
      },
      {
        label: "Humidade",
        value: "humidity",
      },
    ],
    typeTranslation: {
      temperature: "Temperatura",
      rain: "Chuva",
      humidity: "Humidade",
    },
    typeFormat: {
      temperature: (d) => d + "ºC",
      rain: (d) => d + "mm/h",
      humidity: (d) => d + "%",
    },
    chartType: "temperature",
  }),
  computed: {
    cardHeader() {
      const weekStart = this.forecasts[0].date;
      const weekEnd = this.forecasts[this.forecasts.length - 1].date;
      return `Clima na semana, ${formatDate(weekStart)} - ${formatDate(
        weekEnd
      )}`;
    },
    chartConfig() {
      return {
        id: "daily-forecast-" + new Date().getTime(),
        title: this.typeTranslation[this.chartType] + " ao longo da semana",
        height: 300,
        data: this.chartData,
        labels: this.chartLabels,
        colors: ["light-blue", "orange"],
        formatY: this.typeFormat[this.chartType],
      };
    },
    chartData() {
      switch (this.chartType) {
        case "rain":
          return [this.rainForecast];
        case "humidity":
          return [this.humidityForecast];
        case "temperature":
        default:
          return [this.minTemperatureForecast, this.maxTemperatureForecast];
      }
    },
    chartLabels() {
      return this.forecasts.map(
        (forecast) =>
          `${formatDate(forecast.date)}, ${shortWeekday(forecast.weekday)}`
      );
    },
    minTemperatureForecast() {
      return {
        label: "Mínima",
        data: this.forecasts.map((forecast) => forecast.min),
      };
    },
    maxTemperatureForecast() {
      return {
        label: "Máxima",
        data: this.forecasts.map((forecast) => forecast.max),
      };
    },
    rainForecast() {
      return {
        label: "Chuva",
        data: this.forecasts.map((forecast) => forecast.rain),
      };
    },
    humidityForecast() {
      return {
        label: "Humidade",
        data: this.forecasts.map((forecast) => forecast.humidity),
      };
    },
  },
};
</script>
<style scoped>
.spacer {
  margin-top: auto;
}
</style>
